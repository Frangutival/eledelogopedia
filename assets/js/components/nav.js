/* =============================================================
   NAVEGACION — navbar sticky, menu movil y seccion activa
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.initNav = function initNav() {
  'use strict';

  var dom = window.ELE.dom;
  var site = window.ELE.site;

  var header = dom.qs('.header');
  var burger = dom.qs('.burger');
  var menu = dom.qs('.mobile-menu');
  var navLinks = dom.qsa('.nav__link');

  if (!header) return;

  /* ---------------------------------------------------------
     1. Estado de la cabecera

     Sobre el hero (fotografía a sangre) la cabecera va transparente y
     en blanco. Al dejarlo atrás pasa a fondo blanco translúcido, texto
     negro y altura reducida.

     El punto de cambio se mide con el borde inferior del hero contra
     una altura FIJA, no contra la altura real de la cabecera: si se
     midiera contra ella, cambiar de estado alteraría la medida y el
     estado oscilaría en el límite.
     --------------------------------------------------------- */
  var hero = dom.qs('.hero');
  var FLIP_AT = 72; // px, aprox. la altura de la cabecera reducida
  var ticking = false;

  function updateHeader() {
    var solid = hero
      ? hero.getBoundingClientRect().bottom <= FLIP_AT
      : window.scrollY > 24;
    header.classList.toggle('is-solid', solid);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateHeader();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateHeader();

  /* ---------------------------------------------------------
     2. Menu movil — construido a partir de la navegacion existente
     --------------------------------------------------------- */
  if (menu && burger) {
    var list = dom.el('ul', { class: 'mobile-menu__list' });

    navLinks.forEach(function (link, index) {
      var item = dom.el('li', { class: 'mobile-menu__item', style: '--i:' + index }, [
        dom.el('a', {
          class: 'mobile-menu__link',
          href: link.getAttribute('href'),
          text: link.textContent.trim()
        })
      ]);
      list.appendChild(item);
    });

    var foot = dom.el('div', { class: 'mobile-menu__foot' }, [
      dom.el('a', {
        class: 'btn btn--primary',
        href: '#contacto'
      }, ['Solicitar información']),
      dom.el('p', { class: 'mobile-menu__meta' }, [
        dom.el('a', {
          class: 'link',
          href: site.contact.phoneHref,
          text: site.contact.phoneDisplay
        })
      ])
    ]);

    menu.appendChild(list);
    menu.appendChild(foot);

    var lastFocused = null;

    function openMenu() {
      lastFocused = document.activeElement;
      menu.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('is-locked');
      // El panel es blanco: la cabecera vuelve a tinta aunque siga sobre el hero
      header.classList.add('is-menu-open');

      var firstLink = dom.qs('.mobile-menu__link', menu);
      if (firstLink) {
        window.setTimeout(function () {
          firstLink.focus();
        }, 220);
      }
    }

    function closeMenu(restoreFocus) {
      if (!menu.classList.contains('is-open')) return;
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menú');
      document.body.classList.remove('is-locked');
      header.classList.remove('is-menu-open');
      if (restoreFocus && lastFocused && lastFocused.focus) lastFocused.focus();
    }

    burger.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) closeMenu(true);
      else openMenu();
    });

    // Al elegir un destino, el menu se cierra y deja ver el scroll
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu(true);
    });

    // Mantiene el foco dentro del menu mientras esta abierto
    menu.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab' || !menu.classList.contains('is-open')) return;

      var focusables = dom.qsa('a[href], button:not(:disabled)', menu);
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
    });

    // Si se pasa a desktop con el menu abierto, se cierra.
    // Debe coincidir con el punto de corte de components.css (1120 px).
    var desktop = window.matchMedia('(min-width: 1121px)');
    var onBreakpoint = function (event) {
      if (event.matches) closeMenu(false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  /* ---------------------------------------------------------
     3. Seccion activa en la navegacion
     --------------------------------------------------------- */
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    var sections = [];

    navLinks.forEach(function (link) {
      var id = (link.getAttribute('href') || '').replace('#', '');
      var section = id && document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var setActive = function (id) {
      navLinks.forEach(function (link) {
        link.removeAttribute('aria-current');
      });
      if (byId[id]) byId[id].setAttribute('aria-current', 'true');
    };

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
};
