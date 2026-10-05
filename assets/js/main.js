/* =============================================================
   MAIN — orquesta la inicializacion de los componentes
   Se carga el ultimo (todos los scripts usan `defer`, por lo que
   se ejecutan en orden y con el DOM ya disponible).
   ============================================================= */

(function () {
  'use strict';

  var ELE = window.ELE || {};

  function run(name, fn) {
    if (typeof fn !== 'function') return;
    try {
      fn();
    } catch (error) {
      // Un fallo en un bloque no debe dejar el resto de la pagina sin inicializar
      if (window.console && console.error) {
        console.error('[ELE DE LOGOPEDIA] Error inicializando "' + name + '":', error);
      }
    }
  }

  function init() {
    // 1. Contenido generado a partir de los datos
    run('servicios', ELE.initServices);
    run('forma de trabajar', ELE.initProcess);
    run('equipo', ELE.initTeam);
    run('conócenos', ELE.initGallery);
    run('opiniones', ELE.initReviews);
    run('contacto', ELE.initContact);

    // 2. Comportamiento
    run('navegacion', ELE.initNav);

    // 3. Animaciones de scroll — al final, para observar tambien
    //    los elementos que se acaban de generar
    run('reveal', ELE.initReveal);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
