/* =============================================================
   UTILIDADES DE DOM
   Pequeño helper para construir nodos sin usar innerHTML.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.dom = (function () {
  'use strict';

  /**
   * Crea un elemento.
   * @param {string} tag
   * @param {Object} [attrs]  class | text | href | aria-* | data-* | style...
   * @param {Array<Node|string>} [children]
   */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);

    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === null || value === undefined || value === false) return;

        if (key === 'class') {
          node.className = value;
        } else if (key === 'text') {
          node.textContent = value;
        } else if (key === 'dataset') {
          Object.keys(value).forEach(function (dataKey) {
            node.dataset[dataKey] = value[dataKey];
          });
        } else {
          node.setAttribute(key, value === true ? '' : value);
        }
      });
    }

    (children || []).forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });

    return node;
  }

  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  /** Vacia un contenedor conservando la referencia. */
  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /** Bloque de aviso para contenido pendiente de la clienta. */
  function placeholder(label, text) {
    return el('div', { class: 'placeholder-note', role: 'note' }, [
      el('p', { class: 'placeholder-note__label', text: label }),
      el('p', { class: 'placeholder-note__text', text: text })
    ]);
  }

  return {
    el: el,
    qs: qs,
    qsa: qsa,
    clear: clear,
    prefersReducedMotion: prefersReducedMotion,
    placeholder: placeholder
  };
})();
