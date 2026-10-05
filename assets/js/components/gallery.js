/* =============================================================
   CONÓCENOS — galería del centro
   -------------------------------------------------------------
   Retícula de fotografías reales + visor ampliado.

   Accesibilidad:
   - Cada fotografía es un <button> real, alcanzable con teclado.
   - El visor es un diálogo modal (role="dialog" + aria-modal), con
     el foco atrapado dentro, cierre con Escape y devolución del
     foco a la fotografía desde la que se abrió.
   - Flechas izquierda/derecha para pasar, y deslizamiento en
     pantallas táctiles.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.initGallery = function initGallery() {
  'use strict';

  var dom = window.ELE.dom;
  var photos = window.ELE.gallery || [];
  var grid = dom.qs('[data-gallery]');

  if (!grid || !photos.length) return;

  dom.clear(grid);

  var triggers = [];
  var current = 0;
  var lastFocused = null;

  /* ---------------------------------------------------------
     1. Retícula
     --------------------------------------------------------- */
  photos.forEach(function (photo, index) {
    var trigger = dom.el(
      'button',
      {
        type: 'button',
        class: 'gallery__trigger',
        'aria-label': 'Ampliar fotografía: ' + photo.caption
      },
      [
        dom.el('span', { class: 'gallery__frame media media--3x4 media--zoom media--color' }, [
          dom.el('img', {
            src: photo.src,
            alt: photo.alt,
            width: String(photo.width),
            height: String(photo.height),
            loading: 'lazy',
            decoding: 'async'
          })
        ]),
        dom.el('span', { class: 'gallery__caption' }, [
          dom.el('span', { text: photo.caption }),
          dom.el('span', { class: 'gallery__caption-icon', 'aria-hidden': 'true', text: '↗' })
        ])
      ]
    );

    trigger.addEventListener('click', function () {
      open(index);
    });

    triggers.push(trigger);

    grid.appendChild(
      dom.el(
        'li',
        {
          class: 'gallery__item',
          'data-reveal': '',
          // Escalonado por columnas, para que la aparición no sea un bloque
          'data-reveal-delay': String((index % 3) * 90)
        },
        [trigger]
      )
    );
  });

  /* ---------------------------------------------------------
     2. Visor ampliado
     --------------------------------------------------------- */
  var viewerImg = dom.el('img', { alt: '', class: 'lightbox__img' });
  var viewerCaption = dom.el('p', { class: 'lightbox__caption' });
  var viewerCounter = dom.el('p', { class: 'lightbox__counter' });

  var btnClose = dom.el(
    'button',
    { type: 'button', class: 'lightbox__close', 'aria-label': 'Cerrar la galería' },
    [dom.el('span', { 'aria-hidden': 'true', text: '✕' })]
  );
  var btnPrev = dom.el(
    'button',
    { type: 'button', class: 'lightbox__nav lightbox__nav--prev', 'aria-label': 'Fotografía anterior' },
    [dom.el('span', { 'aria-hidden': 'true', text: '←' })]
  );
  var btnNext = dom.el(
    'button',
    { type: 'button', class: 'lightbox__nav lightbox__nav--next', 'aria-label': 'Fotografía siguiente' },
    [dom.el('span', { 'aria-hidden': 'true', text: '→' })]
  );

  var dialog = dom.el(
    'div',
    {
      class: 'lightbox__dialog',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': 'Fotografías del centro'
    },
    [
      btnClose,
      btnPrev,
      dom.el('figure', { class: 'lightbox__figure' }, [
        viewerImg,
        dom.el('figcaption', { class: 'lightbox__meta' }, [viewerCaption, viewerCounter])
      ]),
      btnNext
    ]
  );

  var backdrop = dom.el('div', { class: 'lightbox__backdrop' });
  var viewer = dom.el('div', { class: 'lightbox', hidden: true }, [backdrop, dialog]);
  document.body.appendChild(viewer);

  function preload(index) {
    var photo = photos[index];
    if (!photo) return;
    var pre = new Image();
    pre.src = photo.src;
  }

  function render() {
    var photo = photos[current];
    viewerImg.src = photo.src;
    viewerImg.alt = photo.alt;
    viewerImg.width = photo.width;
    viewerImg.height = photo.height;
    viewerCaption.textContent = photo.caption;
    viewerCounter.textContent = current + 1 + ' / ' + photos.length;

    // Con una sola fotografía no tendría sentido navegar
    var single = photos.length < 2;
    btnPrev.hidden = single;
    btnNext.hidden = single;
  }

  function open(index) {
    current = index;
    lastFocused = document.activeElement;
    render();
    viewer.hidden = false;
    document.body.classList.add('is-locked');
    // Un frame para que la transición de entrada llegue a ejecutarse
    window.requestAnimationFrame(function () {
      viewer.classList.add('is-open');
      btnClose.focus();
    });
    preload(current + 1);
    preload(current - 1);
  }

  function close() {
    if (viewer.hidden) return;
    viewer.classList.remove('is-open');
    document.body.classList.remove('is-locked');

    var finish = function () {
      viewer.hidden = true;
      // Devuelve el foco a la fotografía desde la que se abrió
      var back = triggers[current] || lastFocused;
      if (back && back.focus) back.focus();
    };

    if (dom.prefersReducedMotion()) finish();
    else window.setTimeout(finish, 280);
  }

  function go(step) {
    // Circular: de la última se pasa a la primera
    current = (current + step + photos.length) % photos.length;
    render();
    preload(current + step);
  }

  btnClose.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  btnPrev.addEventListener('click', function () {
    go(-1);
  });
  btnNext.addEventListener('click', function () {
    go(1);
  });

  document.addEventListener('keydown', function (event) {
    if (viewer.hidden) return;

    if (event.key === 'Escape') {
      close();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'Tab') {
      var focusables = dom.qsa('button:not([hidden])', dialog);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------------------------------------------------------
     3. Deslizamiento en pantallas táctiles
     --------------------------------------------------------- */
  var touchX = null;

  dialog.addEventListener(
    'touchstart',
    function (event) {
      touchX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  dialog.addEventListener(
    'touchend',
    function (event) {
      if (touchX === null) return;
      var delta = event.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
    },
    { passive: true }
  );
};
