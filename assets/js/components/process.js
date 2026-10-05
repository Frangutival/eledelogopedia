/* =============================================================
   FORMA DE TRABAJAR
   Cuatro conceptos como estructura visual. La descripcion solo se
   pinta si existe en los datos: no se inventa ningun texto clinico.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.initProcess = function initProcess() {
  'use strict';

  var dom = window.ELE.dom;
  var steps = window.ELE.process || [];
  var container = dom.qs('[data-process]');

  if (!container || !steps.length) return;

  dom.clear(container);

  steps.forEach(function (step, index) {
    var children = [
      dom.el('p', { class: 'process__number', text: step.number }),
      dom.el('h3', { class: 'process__title', text: step.title })
    ];

    if (step.description) {
      children.push(dom.el('p', { class: 'process__text', text: step.description }));
    }

    container.appendChild(
      dom.el(
        'div',
        {
          class: 'process__item',
          'data-reveal': '',
          'data-reveal-delay': String(index * 90)
        },
        children
      )
    );
  });
};
