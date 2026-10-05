/* =============================================================
   ELE DE LOGOPEDIA — Opiniones de Google
   -------------------------------------------------------------
   Aqui NO hay ninguna reseña de ejemplo, ni nombres ni textos
   ficticios: las opiniones son de personas reales y solo pueden
   salir de Google.

   La seccion funciona en tres niveles, de mas a menos automatico:

     1. `endpoint`  -> reseñas en vivo, se actualizan solas.
     2. `items`     -> reseñas copiadas a mano (texto y nombre literales).
     3. ninguno     -> aviso de seccion preparada.

   En los tres casos se muestran siempre los botones reales de la
   ficha de Google (leer todas / escribir una), porque esos enlaces
   si existen y estan verificados.

   -------------------------------------------------------------
   POR QUE NO SE PUEDEN "LEER" LAS RESEÑAS SIN MAS
   -------------------------------------------------------------
   Google no permite copiar las reseñas de Maps por programa: la
   ficha se dibuja con JavaScript y esta detras de un muro de
   consentimiento, y rascarla incumple sus condiciones de uso.

   La unica via autorizada es la Places API. Devuelve como maximo
   las 5 reseñas que Google considera mas relevantes, exige una
   clave, y esa clave NO puede viajar en el navegador: cualquiera
   la veria en el codigo fuente y podria gastar la cuota. Por eso
   hace falta un intermediario en el servidor.

   -------------------------------------------------------------
   COMO ACTIVAR LA ACTUALIZACION AUTOMATICA
   -------------------------------------------------------------
   1. Crear un proyecto en Google Cloud y activar "Places API (New)".
   2. Generar una clave de API y restringirla al dominio del gabinete.
   3. Publicar la web en Netlify o Vercel y subir la funcion que ya
      esta escrita en `api/google-reviews.js`, guardando la clave
      como variable de entorno GOOGLE_PLACES_API_KEY (nunca en el
      codigo).
   4. Apuntar `endpoint` aqui abajo a esa funcion:

        endpoint: '/api/google-reviews'

   A partir de ahi la web pide las reseñas a esa funcion, las
   guarda en cache unas horas y cada nueva opinion publicada en
   Google aparece sola, sin tocar el codigo.

   Alternativa sin servidor: existen servicios que hacen de
   intermediario gratuito y devuelven las reseñas en JSON. El
   componente los admite igual, basta con poner su URL en
   `endpoint`. Es comodo, pero mete un tercero entre la web y
   Google; conviene decidirlo con la clienta.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.reviews = {
  /* ---------- Ficha real de Google ----------
     Derivados del enlace oficial facilitado por la clienta.
     Ver la explicacion completa en assets/js/data/site.js -> contact.place */
  googleUrl: 'https://www.google.com/maps?cid=9035724548006069221',

  // Lista completa de opiniones de la ficha.
  reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJf8TTsXaDYw0R5cMtZJpXZX0',

  // Formulario de Google para publicar una reseña nueva. Es el enlace que
  // el propio Google recomienda repartir entre los pacientes.
  writeUrl: 'https://search.google.com/local/writereview?placeid=ChIJf8TTsXaDYw0R5cMtZJpXZX0',

  /* ---------- Reseñas en vivo ----------
     URL de la funcion que devuelve las reseñas ya normalizadas.
     Mientras sea null, no se hace ninguna peticion. */
  endpoint: null,

  // Horas que se conserva la respuesta en el navegador antes de volver
  // a preguntar. Google desaconseja pedir las reseñas en cada visita.
  cacheHours: 12,

  /* ---------- Reseñas copiadas a mano ----------
     Respaldo mientras no haya `endpoint`, y tambien si la peticion
     falla. Copiar SIEMPRE el texto y el nombre literales de Google:

       {
         rating: 5,                        // estrellas reales (1-5)
         text: 'Texto literal de la reseña.',
         author: 'Nombre tal y como aparece en Google',
         date: '2025-06-14'                // opcional (AAAA-MM-DD)
       }

     NO añadir reseñas de ejemplo. */
  items: [],

  /* ---------- Valoracion media ----------
     { rating: 4.9, count: 37 } cuando se conozca el dato real.
     Con `endpoint` activo se rellena solo desde Google.
     Mientras sea null no se muestra ninguna cifra. */
  summary: null
};
