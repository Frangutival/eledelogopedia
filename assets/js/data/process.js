/* =============================================================
   ELE DE LOGOPEDIA — Forma de trabajar
   -------------------------------------------------------------
   Estos cuatro conceptos funcionan como ESTRUCTURA VISUAL de la
   idea de intervencion personalizada.

   `description` esta deliberadamente a null: no se añade ninguna
   explicacion clinica que la clienta no haya proporcionado.
   Cuando facilite un texto para cada paso, basta con escribirlo
   aqui y el componente lo renderiza automaticamente.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.process = [
  { number: '01', title: 'Escuchar', description: null },
  { number: '02', title: 'Comprender', description: null },
  { number: '03', title: 'Personalizar', description: null },
  { number: '04', title: 'Acompañar', description: null }
];
