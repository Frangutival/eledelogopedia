/* =============================================================
   SERVICIOS — lista desplegable accesible
   -------------------------------------------------------------
   Se ha elegido ACCORDION (expansion inline) frente a modal:
   los textos son breves, evita interrumpir la lectura, no provoca
   saltos de layout y en movil se maneja con un solo toque.

   Accesibilidad: cada disparador es un <button> real dentro de un
   encabezado, con aria-expanded y aria-controls; el panel es una
   region etiquetada y se retira del arbol de accesibilidad cuando
   esta plegado.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.initServices = function initServices() {
  'use strict';

  var dom = window.ELE.dom;
  var services = window.ELE.services || [];
  var container = dom.qs('[data-services]');

  if (!container || !services.length) return;

  dom.clear(container);
  var reduced = dom.prefersReducedMotion();

  services.forEach(function (service, index) {
    var number = String(index + 1).padStart(2, '0');
    var triggerId = 'servicio-' + service.id + '-trigger';
    var panelId = 'servicio-' + service.id + '-panel';

    var keywords = dom.el(
      'span',
      { class: 'service__keywords' },
      (service.keywords || []).map(function (word) {
        return dom.el('span', { class: 'service__keyword', text: word });
      })
    );

    var trigger = dom.el(
      'button',
      {
        type: 'button',
        class: 'service__trigger',
        id: triggerId,
        'aria-expanded': 'false',
        'aria-controls': panelId
      },
      [
        dom.el('span', { class: 'service__number', text: number }),
        dom.el('span', { class: 'service__heading' }, [
          dom.el('span', { class: 'service__title', text: service.title }),
          keywords
        ]),
        dom.el('span', { class: 'service__toggle', 'aria-hidden': 'true' })
      ]
    );

    var panel = dom.el(
      'div',
      {
        class: 'service__panel',
        id: panelId,
        role: 'region',
        'aria-labelledby': triggerId,
        hidden: true
      },
      [
        dom.el('div', { class: 'service__panel-inner' }, [
          dom.el('div', { class: 'service__body' }, [
            dom.el('p', { class: 'service__text', text: service.description })
          ])
        ])
      ]
    );

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
        if (reduced) {
          panel.hidden = true;
        } else {
          window.setTimeout(function () {
            if (!panel.classList.contains('is-open')) panel.hidden = true;
          }, 450);
        }
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        if (reduced) {
          panel.classList.add('is-open');
        } else {
          // Un frame para que la transicion de altura arranque desde 0fr
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              panel.classList.add('is-open');
            });
          });
        }
      }
    });

    var item = dom.el(
      'article',
      {
        class: 'service',
        'data-reveal': '',
        'data-reveal-delay': String(Math.min(index, 5) * 60)
      },
      [dom.el('h3', { class: 'service__h' }, [trigger]), panel]
    );

    container.appendChild(item);
  });
};
