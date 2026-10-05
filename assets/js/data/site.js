/* =============================================================
   ELE DE LOGOPEDIA — Datos centralizados del sitio
   -------------------------------------------------------------
   Este es el UNICO archivo que hay que tocar para cambiar datos
   de contacto, redes sociales, imagenes o enlaces externos.

   Los campos con valor `null` estan PENDIENTES de que la clienta
   los proporcione. Mientras valgan `null`, la interfaz se adapta
   sola (oculta el boton, muestra un aviso, etc.) y NUNCA inventa
   un dato ni deja un enlace roto.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.site = {
  /* ---------- Marca ---------- */
  brand: {
    name: 'ELE DE LOGOPEDIA',
    slogan: 'Donde cada voz encuentra su camino',
    statement:
      'Cada persona necesita su propio tiempo, sus propias herramientas y su propio camino. Por eso, en ELE DE LOGOPEDIA, hacemos intervención personalizada.',
    firstConsultation: 'Primera consulta gratuita'
  },

  /* ---------- Contacto ---------- */
  contact: {
    // Direccion tal y como debe leerse en pantalla (una linea por elemento).
    addressLines: [
      'Avda. Castillo de Monteagudo, CC Montepinar, local 14',
      'Urb. Montepinar',
      '30163, El Esparragal, Murcia'
    ],
    // Version plana, usada para construir la busqueda en Google Maps.
    addressFlat:
      'Avda. Castillo de Monteagudo, CC Montepinar, local 14, Urb. Montepinar, 30163, El Esparragal, Murcia',

    /* ---------- Ficha real de Google ----------
       Identificadores EXTRAIDOS del enlace oficial de Google Maps que
       facilito la clienta. No hay nada inventado aqui:

         .../@38.0420629,-1.1031789,691m/data=...
         !1s0xd638376b1d3c47f:0x7d65579a642dc3e5!8m2!3d38.0420587!4d-1.100604

       - lat / lng   -> los parametros !3d y !4d, que son las coordenadas
                        exactas del punto marcado en la ficha (no las de la
                        camara, que son las del prefijo @ y estan desplazadas:
                        por eso el enlace anterior no caia sobre el local).
       - cid         -> 0x7d65579a642dc3e5 pasado a decimal.
       - placeId     -> derivado del identificador de ficha
                        0xd638376b1d3c47f:0x7d65579a642dc3e5 segun el formato
                        publico de los Place ID. El algoritmo se comprobo
                        reproduciendo el Place ID de ejemplo que Google
                        documenta para su oficina de Sidney.

       El Place ID es lo que permite enlazar a "escribir una reseña" y a la
       lista completa de opiniones. */
    place: {
      name: 'Ele De Logopedia',
      cid: '9035724548006069221',
      placeId: 'ChIJf8TTsXaDYw0R5cMtZJpXZX0',
      lat: 38.0420587,
      lng: -1.100604
    },

    // Enlace canonico a la ficha. Es la forma mas corta y estable que ofrece
    // Google: no caduca ni arrastra parametros de sesion.
    mapsUrl: 'https://www.google.com/maps?cid=9035724548006069221',

    phoneDisplay: '623 223 788',
    phoneHref: 'tel:+34623223788',

    email: 'eledelogopedia.gabinete@gmail.com',

    schedule: {
      days: 'Lunes a viernes',
      slots: ['10:00 – 13:00', '16:15 – 20:20']
    },

    // PENDIENTE DE CONFIRMAR: no se afirma que el telefono tenga WhatsApp.
    // Para activarlo: enabled: true y number en formato internacional sin signos.
    whatsapp: {
      enabled: false,
      number: null, // p. ej. '34623223788'
      message: 'Hola, me gustaría solicitar información sobre vuestros servicios.'
    }
  },

  /* ---------- Redes sociales ---------- */
  social: [
    {
      label: 'Instagram',
      handle: '@elede.logopedia',
      url: 'https://www.instagram.com/elede.logopedia/'
    },
    {
      label: 'TikTok',
      handle: '@eledelogopedia',
      url: 'https://www.tiktok.com/@eledelogopedia'
    }
  ],

  /* ---------- Imagenes y logotipo ----------
     No se configuran aqui a proposito: el hero, la imagen de filosofia
     y el logotipo estan en index.html como <img> estaticos para que la
     imagen principal cargue cuanto antes (mejor LCP) y para que la web
     siga viendose sin JavaScript.
     Rutas de los retratos del equipo: assets/js/data/team.js -> photo   */

  /* ---------- Textos legales ----------
     Con href null se muestran como texto inerte, no como enlace roto.
     `type` y `size` se anuncian en el enlace: quien usa lector de
     pantalla, o quien navega con datos moviles, debe saber que va a
     abrir un PDF y cuanto pesa antes de pulsar.

     Los tres documentos son paginas HTML propias: se leen mejor en
     movil, son accesibles y Google las indexa.

     Los PDF originales de la asesoria se conservan en assets/legal/
     como referencia de lo que se entrego, pero NO se enlazan: estaban
     incompletos. Ver PENDIENTE.md, apartado 8. */
  legal: [
    { label: 'Aviso legal', href: 'aviso-legal.html' },
    { label: 'Política de privacidad', href: 'politica-de-privacidad.html' },
    { label: 'Política de cookies', href: 'politica-de-cookies.html' }
  ]
};
