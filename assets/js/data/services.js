/* =============================================================
   ELE DE LOGOPEDIA — Servicios
   -------------------------------------------------------------
   `description` contiene el texto EXACTO facilitado por la clienta.
   No debe ampliarse con afirmaciones clinicas no proporcionadas.

   `keywords` no es texto nuevo: son terminos tomados literalmente
   de la propia `description`, usados como resumen visual para que
   la tarjeta sea escaneable estando plegada.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.services = [
  {
    id: 'habla',
    title: 'Habla',
    keywords: ['Articulación', 'Inteligibilidad', 'Fluidez'],
    description:
      'Articulación y pronunciación, dificultades en los sonidos del habla, inteligibilidad, fluidez, ritmo y velocidad del habla, apraxia y disartria.'
  },
  {
    id: 'lenguaje-y-comunicacion',
    title: 'Lenguaje y comunicación',
    keywords: ['Comprensión y expresión', 'Vocabulario', 'Pragmática'],
    description:
      'Comprensión y expresión del lenguaje, vocabulario, construcción de frases, narración, comunicación social y pragmática.'
  },
  {
    id: 'lectura-y-escritura',
    title: 'Lectura y escritura',
    keywords: ['Conciencia fonológica', 'Dislexia', 'Expresión escrita'],
    description:
      'Conciencia fonológica, adquisición de la lectoescritura, dislexia, disgrafía, disortografía, fluidez y comprensión lectora y expresión escrita.'
  },
  {
    id: 'voz',
    title: 'Voz',
    keywords: ['Disfonías', 'Fatiga vocal', 'Higiene vocal'],
    description:
      'Disfonías, fatiga vocal, alteraciones de la calidad vocal, lesiones, higiene vocal y reeducación de la voz.'
  },
  {
    id: 'motricidad-orofacial',
    title: 'Motricidad orofacial y terapia miofuncional',
    keywords: ['Respiración', 'Deglución', 'Hábitos orales'],
    description:
      'Respiración, postura y movilidad lingual, musculatura orofacial, masticación, deglución, hábitos orales y otras funciones relacionadas con el sistema orofacial.'
  },
  {
    id: 'desarrollo-y-neurodesarrollo',
    title: 'Desarrollo y neurodesarrollo',
    keywords: ['Adquisición del lenguaje', 'Trastornos del desarrollo', 'TEA'],
    description:
      'Dificultades en la adquisición del lenguaje y la comunicación, trastornos del desarrollo, TEA y otras condiciones del neurodesarrollo.'
  },
  {
    id: 'cognicion',
    title: 'Cognición',
    keywords: ['Atención', 'Memoria', 'Funciones ejecutivas'],
    description:
      'Atención, memoria, funciones ejecutivas, comprensión, razonamiento y otras capacidades que pueden afectar a la comunicación.'
  },
  {
    id: 'alteraciones-asociadas',
    title: 'Alteraciones asociadas a cirugía y otras condiciones médicas',
    keywords: ['Rehabilitación de la comunicación', 'Deglución', 'Laringectomías'],
    description:
      'Rehabilitación de la comunicación, voz, deglución y funciones orofaciales tras determinadas cirugías, tratamientos médicos, traqueostomías y laringectomías.'
  }
];
