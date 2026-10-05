/* =============================================================
   ELE DE LOGOPEDIA — Reseñas de Google en vivo
   -------------------------------------------------------------
   Funcion intermedia entre la web y la Places API de Google.

   POR QUE HACE FALTA
   ------------------
   La clave de la Places API no puede ir en el navegador: quedaria
   a la vista en el codigo fuente de la web y cualquiera podria
   gastar la cuota de la cuenta. Esta funcion se ejecuta en el
   servidor, guarda la clave fuera del alcance del visitante y
   devuelve solo las reseñas ya limpias.

   COMO SE PONE EN MARCHA
   ----------------------
   1. Google Cloud -> crear proyecto -> activar "Places API (New)".
   2. Credenciales -> crear clave de API -> restringirla al dominio
      del gabinete y a esa unica API.
   3. Subir la web a Vercel o a Netlify (las dos tienen plan gratuito
      suficiente para esto).
   4. En el panel del hosting, guardar la clave como variable de
      entorno con el nombre GOOGLE_PLACES_API_KEY. Nunca escribirla
      en este archivo.
   5. En assets/js/data/reviews.js poner:

        endpoint: '/api/google-reviews'

   Con eso, cada reseña nueva que se publique en Google aparece sola
   en la web, sin tocar el codigo.

   LIMITE QUE PONE GOOGLE
   ----------------------
   La Places API devuelve como maximo CINCO reseñas, las que Google
   considera mas relevantes, y no deja elegir cuales. No es una
   limitacion de esta funcion: es asi para todo el mundo. Por eso la
   seccion enlaza tambien a la ficha completa.

   ESTE ARCHIVO ESTA ESCRITO PARA VERCEL (carpeta /api).
   Para Netlify, moverlo a netlify/functions/google-reviews.js y
   cambiar unicamente la ultima parte, la de `module.exports`, por:

     exports.handler = async () => {
       const data = await obtenerReseñas();
       return {
         statusCode: 200,
         headers: { 'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=0, s-maxage=21600' },
         body: JSON.stringify(data)
       };
     };
   ============================================================= */

'use strict';

// Ficha real del gabinete. Ver assets/js/data/site.js -> contact.place
const PLACE_ID = 'ChIJf8TTsXaDYw0R5cMtZJpXZX0';

// Campos que se piden. Cuantos menos, mas barata es la llamada.
const FIELD_MASK = 'rating,userRatingCount,reviews';

async function obtenerReseñas() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error('Falta la variable de entorno GOOGLE_PLACES_API_KEY');

  const url =
    'https://places.googleapis.com/v1/places/' +
    PLACE_ID +
    '?languageCode=es&regionCode=ES';

  const respuesta = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': FIELD_MASK
    }
  });

  if (!respuesta.ok) {
    throw new Error('Google respondio ' + respuesta.status);
  }

  const datos = await respuesta.json();

  /* Se normaliza aqui, en el servidor, para que el navegador reciba
     lo justo: ni fotos de perfil, ni enlaces de autor, ni campos que
     la web no usa. */
  const reviews = (datos.reviews || [])
    .map((r) => ({
      rating: r.rating || 0,
      // originalText es el texto tal y como lo escribio la persona;
      // `text` puede venir traducido por Google.
      text: ((r.originalText && r.originalText.text) || (r.text && r.text.text) || '').trim(),
      author: (r.authorAttribution && r.authorAttribution.displayName) || '',
      date: r.publishTime || null,
      relative: r.relativePublishTimeDescription || null
    }))
    // Sin texto o sin firma no se publica: no se muestran reseñas anonimas
    // ni valoraciones sueltas sin comentario.
    .filter((r) => r.text && r.author);

  return {
    rating: datos.rating || null,
    count: datos.userRatingCount || 0,
    updatedAt: new Date().toISOString(),
    reviews
  };
}

module.exports = async (req, res) => {
  try {
    const data = await obtenerReseñas();

    /* El CDN del hosting guarda la respuesta 6 horas y puede seguir
       sirviendo la anterior otras 24 mientras refresca por detras.
       Asi Google recibe muy pocas llamadas y la web nunca espera. */
    res.setHeader(
      'Cache-Control',
      'public, max-age=0, s-maxage=21600, stale-while-revalidate=86400'
    );
    res.status(200).json(data);
  } catch (error) {
    // La web ya sabe ignorar un error: se queda con lo ultimo que tenia.
    res.status(502).json({ error: 'No se han podido obtener las reseñas' });
  }
};

module.exports.obtenerReseñas = obtenerReseñas;
