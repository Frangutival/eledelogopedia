/* =============================================================
   OPINIONES — reseñas reales de Google
   -------------------------------------------------------------
   Este componente NO inventa ni genera reseñas. Solo pinta lo que
   recibe, por este orden:

     1. Lo que devuelva `reviews.endpoint` (reseñas en vivo).
     2. Lo que haya en `reviews.items` (copiadas a mano).
     3. Si no hay nada, un aviso de seccion preparada.

   Los botones de la ficha de Google se muestran siempre, haya o no
   reseñas cargadas: son enlaces reales y son la forma de que un
   paciente pueda leerlas todas o publicar la suya.

   Punto de entrada manual, por si en el futuro las reseñas llegan
   desde otro sitio:
     window.ELE.renderReviews(arrayDeReseñas, { rating: 4.9, count: 37 })
   ============================================================= */

window.ELE = window.ELE || {};

(function () {
  'use strict';

  var STARS_MAX = 5;
  var CACHE_KEY = 'ele:reviews';
  var CLAMP_AT = 300; // caracteres a partir de los cuales se recorta la tarjeta

  /* -------------------------------------------------------------
     Cache en el navegador
     Google desaconseja pedir las reseñas en cada visita. Se guarda
     la ultima respuesta y solo se vuelve a preguntar pasadas las
     horas indicadas en la configuracion.

     Todo va dentro de try/catch: en navegacion privada o con las
     cookies bloqueadas, localStorage lanza excepcion al leerlo.
     ------------------------------------------------------------- */
  function readCache(maxHours) {
    try {
      var raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      if (!saved || !saved.time) return null;
      if (Date.now() - saved.time > maxHours * 3600 * 1000) return null;
      return saved.data;
    } catch (error) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data: data }));
    } catch (error) {
      /* sin cache, pero la seccion sigue funcionando */
    }
  }

  /* -------------------------------------------------------------
     Normalizacion
     Admite tanto la forma de la Places API (New) de Google como una
     respuesta ya simplificada por la funcion del servidor, para que
     cambiar de proveedor no obligue a tocar el render.
     ------------------------------------------------------------- */
  function normalizeOne(raw) {
    if (!raw) return null;

    var author =
      (raw.authorAttribution && raw.authorAttribution.displayName) ||
      raw.author ||
      raw.author_name ||
      raw.name;

    var text =
      (raw.originalText && raw.originalText.text) ||
      (raw.text && typeof raw.text === 'object' ? raw.text.text : raw.text) ||
      '';

    text = String(text).trim();
    if (!text || !author) return null; // sin texto o sin firma no se publica

    return {
      rating: Number(raw.rating) || 0,
      text: text,
      author: String(author).trim(),
      date: raw.publishTime || raw.date || null,
      relative: raw.relativePublishTimeDescription || raw.relative || null
    };
  }

  function normalize(payload) {
    if (!payload) return { items: [], summary: null };

    var list = payload.reviews || payload.items || (payload.length ? payload : []);
    var items = [];

    (list || []).forEach(function (raw) {
      var review = normalizeOne(raw);
      if (review) items.push(review);
    });

    var rating = payload.rating;
    var count = payload.userRatingCount || payload.count || payload.user_ratings_total;

    return {
      items: items,
      summary: rating ? { rating: Number(rating), count: Number(count) || 0 } : null
    };
  }

  /* -------------------------------------------------------------
     Piezas de la interfaz
     ------------------------------------------------------------- */
  function buildStars(rating, dom, label) {
    var value = Math.max(0, Math.min(STARS_MAX, Math.round(Number(rating) || 0)));

    return dom.el(
      'p',
      {
        class: 'review__stars',
        role: 'img',
        'aria-label': label || value + ' de ' + STARS_MAX + ' estrellas'
      },
      [
        dom.el('span', {
          'aria-hidden': 'true',
          text: '★'.repeat(value) + '☆'.repeat(STARS_MAX - value)
        })
      ]
    );
  }

  function formatDate(review) {
    if (review.relative) return review.relative;
    if (!review.date) return null;

    var parsed = new Date(review.date);
    if (isNaN(parsed.getTime())) return null;

    try {
      return parsed.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    } catch (error) {
      return null;
    }
  }

  function buildCard(review, dom) {
    var quote = dom.el('blockquote', { class: 'review__text' }, [
      dom.el('p', { text: '“' + review.text + '”' })
    ]);

    var body = [buildStars(review.rating, dom), quote];

    /* Las reseñas de Google pueden ser muy largas y descuadrarian la
       tarjeta. Se recortan y se dejan desplegar, en lugar de cortar el
       texto sin mas: la opinion se lee entera. */
    if (review.text.length > CLAMP_AT) {
      quote.classList.add('is-clamped');

      var toggle = dom.el('button', {
        type: 'button',
        class: 'review__more',
        'aria-expanded': 'false',
        text: 'Leer completa'
      });

      toggle.addEventListener('click', function () {
        var open = quote.classList.toggle('is-clamped') === false;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.textContent = open ? 'Mostrar menos' : 'Leer completa';
      });

      body.push(toggle);
    }

    var date = formatDate(review);

    body.push(
      dom.el('footer', { class: 'review__meta' }, [
        dom.el('p', { class: 'review__author', text: review.author }),
        dom.el('p', { class: 'review__source' }, [
          'Google',
          date ? dom.el('span', { class: 'review__date', text: ' · ' + date }) : null
        ])
      ])
    );

    return dom.el('article', { class: 'review' }, body);
  }

  function buildSummary(summary, config, dom) {
    if (!summary || !summary.rating) return null;

    var rating = summary.rating.toFixed(1).replace('.', ',');
    var label = 'Valoración media de ' + rating + ' sobre ' + STARS_MAX + ' en Google';

    return dom.el('div', { class: 'reviews__summary' }, [
      dom.el('p', { class: 'reviews__score', text: rating }),
      dom.el('div', { class: 'reviews__score-meta' }, [
        buildStars(Math.round(summary.rating), dom, label),
        dom.el('p', {
          class: 'reviews__count',
          text: summary.count
            ? summary.count + (summary.count === 1 ? ' reseña en Google' : ' reseñas en Google')
            : 'Valoración en Google'
        })
      ])
    ]);
  }

  function externalLink(dom, className, href, label) {
    return dom.el(
      'a',
      { class: className, href: href, target: '_blank', rel: 'noopener noreferrer' },
      [
        label,
        dom.el('span', { class: 'btn__arrow', 'aria-hidden': 'true', text: '↗' }),
        dom.el('span', { class: 'visually-hidden', text: '(se abre en una pestaña nueva)' })
      ]
    );
  }

  /* -------------------------------------------------------------
     Render
     ------------------------------------------------------------- */
  window.ELE.renderReviews = function renderReviews(items, summary) {
    var dom = window.ELE.dom;
    var config = window.ELE.reviews || {};
    var container = dom.qs('[data-reviews]');
    var controls = dom.qs('[data-reviews-controls]');
    var footer = dom.qs('[data-reviews-foot]');

    if (!container) return;

    var reviews = items || config.items || [];
    var score = summary || config.summary || null;

    dom.clear(container);
    if (controls) {
      dom.clear(controls);
      controls.hidden = true;
    }
    if (footer) dom.clear(footer);

    /* ---------- Valoracion media ---------- */
    var summaryNode = buildSummary(score, config, dom);
    if (summaryNode) container.appendChild(summaryNode);

    if (!reviews.length) {
      /* ---------- Sin reseñas cargadas todavia ----------
         No se inventa ningun testimonio: se explica el estado y se
         enlaza a la ficha real, donde si estan. */
      container.appendChild(
        dom.placeholder(
          'Opiniones en Google',
          'Las opiniones del gabinete están publicadas en su ficha de Google. ' +
            'Este espacio las mostrará aquí mismo en cuanto se conecte la sincronización; ' +
            'mientras tanto, puedes leerlas todas en Google desde el botón de abajo. ' +
            'No se incluye ningún testimonio de ejemplo.'
        )
      );
    } else {
      /* ---------- Carrusel ---------- */
      var viewport = dom.el('div', {
        class: 'reviews__viewport',
        role: 'region',
        'aria-label': 'Opiniones de pacientes publicadas en Google',
        tabindex: '0'
      });

      reviews.forEach(function (review) {
        viewport.appendChild(buildCard(review, dom));
      });

      container.appendChild(viewport);

      /* ---------- Controles ---------- */
      if (controls) {
        var prev = dom.el(
          'button',
          { type: 'button', class: 'carousel-btn', 'aria-label': 'Opinión anterior' },
          [dom.el('span', { 'aria-hidden': 'true', text: '←' })]
        );
        var next = dom.el(
          'button',
          { type: 'button', class: 'carousel-btn', 'aria-label': 'Opinión siguiente' },
          [dom.el('span', { 'aria-hidden': 'true', text: '→' })]
        );

        var step = function () {
          var card = viewport.querySelector('.review');
          if (!card) return viewport.clientWidth;
          var styles = window.getComputedStyle(viewport);
          return card.getBoundingClientRect().width + (parseFloat(styles.columnGap) || 0);
        };

        var sync = function () {
          var maxScroll = viewport.scrollWidth - viewport.clientWidth;
          prev.disabled = viewport.scrollLeft <= 2;
          next.disabled = viewport.scrollLeft >= maxScroll - 2;
          controls.hidden = maxScroll <= 2;
        };

        prev.addEventListener('click', function () {
          viewport.scrollBy({ left: -step(), behavior: 'smooth' });
        });
        next.addEventListener('click', function () {
          viewport.scrollBy({ left: step(), behavior: 'smooth' });
        });

        viewport.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);

        controls.appendChild(prev);
        controls.appendChild(next);
        sync();
      }
    }

    /* ---------- Acciones sobre la ficha de Google ----------
       Enlaces reales y verificados: leer todas las opiniones y
       publicar una nueva. El segundo es el que Google recomienda
       compartir con los pacientes. */
    if (footer) {
      var all = config.reviewsUrl || config.googleUrl;

      if (all) {
        footer.appendChild(
          externalLink(dom, 'btn btn--outline', all, 'Ver todas las reseñas en Google')
        );
      }

      if (config.writeUrl) {
        footer.appendChild(
          externalLink(dom, 'btn btn--primary', config.writeUrl, 'Escribir una reseña')
        );
      }
    }
  };

  /* -------------------------------------------------------------
     Arranque
     Pinta de inmediato con lo que haya (cache o copia manual) y, si
     hay endpoint configurado y la cache esta caducada, pide las
     reseñas al servidor y vuelve a pintar cuando llegan. La seccion
     nunca se queda en blanco esperando la red.
     ------------------------------------------------------------- */
  window.ELE.initReviews = function initReviews() {
    var config = window.ELE.reviews || {};
    var hours = Number(config.cacheHours) || 12;

    var cached = config.endpoint ? readCache(hours) : null;
    var first = cached ? normalize(cached) : { items: null, summary: null };

    window.ELE.renderReviews(first.items, first.summary);

    if (!config.endpoint || cached || !window.fetch) return;

    window
      .fetch(config.endpoint, { headers: { Accept: 'application/json' } })
      .then(function (response) {
        if (!response.ok) throw new Error('Respuesta ' + response.status);
        return response.json();
      })
      .then(function (payload) {
        var data = normalize(payload);
        if (!data.items.length && !data.summary) return;
        writeCache(payload);
        window.ELE.renderReviews(data.items, data.summary);
      })
      .catch(function () {
        /* Si la peticion falla, se queda lo ya pintado (copia manual o
           aviso). Nunca se muestra un error al visitante. */
      });
  };
})();
