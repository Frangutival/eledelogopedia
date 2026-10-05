/* =============================================================
   ELE DE LOGOPEDIA — Conócenos (galería del centro)
   -------------------------------------------------------------
   Fotografías reales del gabinete. Se muestran EN COLOR, con sus
   tonos originales: es la sección donde se ve el sitio tal y como
   es, así que aquí no se aplica el blanco y negro del resto.

   El orden es intencionado: recorre el centro de fuera hacia
   dentro (fachada, escaparate, recepción, pasillo) y termina en
   las sesiones. Cambiar el orden del array cambia el de la
   galería y el del visor ampliado.

   `caption` es el pie que aparece al pasar el ratón y en el visor.
   `alt` describe la imagen para lectores de pantalla y buscadores.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.gallery = [
  {
    src: 'assets/img/centro/fachada.jpg',
    width: 1080,
    height: 1440,
    caption: 'La entrada',
    alt: 'Fachada del gabinete ELE DE LOGOPEDIA, en el local 14 del CC Montepinar, El Esparragal (Murcia)'
  },
  {
    src: 'assets/img/centro/escaparate.jpg',
    width: 1080,
    height: 1485,
    caption: 'El escaparate',
    alt: 'Escaparate del gabinete con el rótulo de ELE DE LOGOPEDIA sobre el vidrio'
  },
  {
    src: 'assets/img/centro/recepcion.jpg',
    width: 1080,
    height: 1440,
    caption: 'Recepción',
    alt: 'Zona de recepción del gabinete, con mesa de madera, plantas y luz natural'
  },
  {
    src: 'assets/img/centro/pasillo.jpg',
    width: 1080,
    height: 1440,
    caption: 'El pasillo',
    alt: 'Pasillo interior del gabinete, con lámparas de mimbre y la sala de espera al fondo'
  },
  {
    src: 'assets/img/centro/entrada.jpg',
    width: 1080,
    height: 1440,
    caption: 'Al atardecer',
    alt: 'Entrada del gabinete vista desde el interior, al atardecer'
  },
  {
    src: 'assets/img/centro/sesion-infantil.jpg',
    width: 1060,
    height: 1600,
    caption: 'Sesión infantil',
    alt: 'Sesión de logopedia infantil con material de juego sobre la mesa'
  },
  {
    src: 'assets/img/centro/sala-consulta.jpg',
    width: 1080,
    height: 1440,
    caption: 'En consulta',
    alt: 'Sala de consulta del gabinete durante una explicación con apoyo visual'
  },
  {
    src: 'assets/img/centro/terapia-miofuncional.jpg',
    width: 1080,
    height: 1428,
    caption: 'Frente al espejo',
    alt: 'Sesión de terapia miofuncional realizada frente al espejo'
  },
  {
    src: 'assets/img/centro/sesion-adultos.jpg',
    width: 1080,
    height: 1440,
    caption: 'Logopedia en adultos',
    alt: 'Sesión de logopedia con una paciente adulta en una de las salas del gabinete'
  }
];
