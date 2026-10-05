/* =============================================================
   REVEAL — aparicion progresiva al entrar en viewport
   Sutil y una sola vez por elemento. Si el usuario ha desactivado
   las animaciones, el contenido se muestra directamente.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.initReveal = function initReveal(scope) {
  'use strict';

  var dom = window.ELE.dom;
  var targets = dom.qsa('[data-reveal]', scope || document);
  if (!targets.length) return;

  var showAll = dom.prefersReducedMotion() || !('IntersectionObserver' in window);

  if (showAll) {
    targets.forEach(function (node) {
      node.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var node = entry.target;
        var delay = parseInt(node.getAttribute('data-reveal-delay') || '0', 10);
        node.style.setProperty('--reveal-delay', delay + 'ms');
        node.classList.add('is-visible');
        observer.unobserve(node);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  targets.forEach(function (node) {
    observer.observe(node);
  });
};
