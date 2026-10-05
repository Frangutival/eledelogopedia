/* =============================================================
   ELE DE LOGOPEDIA — Equipo
   -------------------------------------------------------------
   `bio` es un array de parrafos con el texto EXACTO facilitado.
   Si `bio` es null, el componente muestra un placeholder claramente
   identificable en lugar de inventar una biografia.

   IMPORTANTE: todas las profesionales se muestran al MISMO tamaño y con
   la misma escala tipografica, por decision expresa del cliente: una
   fotografia mas grande que otra sugeriria superioridad entre ellas.
   El cargo de cada una ya queda claro en su campo `role`.
   El orden de este array solo decide a que lado cae la fotografia.

   Los retratos se muestran EN COLOR (el resto de fotografias del sitio
   van en blanco y negro).
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.team = [
  {
    id: 'lourdes-pujante',
    name: 'Lourdes Pujante',
    role: 'Logopeda, fundadora y directora de ELE DE LOGOPEDIA',
    photo: {
      src: 'assets/img/lourdes-pujante.jpg',
      alt: 'Retrato de Lourdes Pujante, logopeda, fundadora y directora de ELE DE LOGOPEDIA',
      width: 1242,
      height: 1600
    },
    bio: [
      'Soy Lourdes Pujante, logopeda, fundadora y directora de Ele De Logopedia.',
      'Ele De Logopedia no nació para ser simplemente un gabinete de logopedia. Nació de mi manera de entender esta profesión y de las ganas de crear un espacio en el que cada persona pudiera sentirse escuchada, comprendida, acompañada y segura.',
      'Un lugar donde hacer logopedia no sea simplemente venir a una sesión. Para mí, esta profesión va mucho más allá de una intervención, y así la ejerzo.',
      'He visto como ha cambiado la vida de mis pacientes en muchos ámbitos y no existe motivación más potente que esa.'
    ]
  },
  {
    id: 'lydia-marin',
    name: 'Lydia Marín',
    role: 'Logopeda',
    photo: {
      src: 'assets/img/lydia-marin.jpg',
      alt: 'Retrato de Lydia Marín, logopeda en ELE DE LOGOPEDIA',
      width: 969,
      height: 1624
    },
    bio: [
      'Mi vocación por la logopedia fue creciendo con cada etapa de aprendizaje y cada nueva experiencia. Ahí descubrí el valor de acompañar a cada persona en su evolución y el impacto real que esto tiene en su día a día.',
      'Me apasionan las distintas áreas que componen esta disciplina, manteniendo siempre las ganas de seguir formándome en cada una de ellas.',
      'Mi objetivo en consulta es construir un espacio de confianza donde cada avance, por pequeño que parezca, cuente.'
    ]
  }
];
