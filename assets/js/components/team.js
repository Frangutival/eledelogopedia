/* =============================================================
   EQUIPO
   Composicion editorial. Todas las profesionales se presentan
   EXACTAMENTE IGUAL: mismo tamaño de fotografia, misma proporcion,
   misma escala tipografica y misma orientacion (retrato a la
   izquierda, texto a la derecha).

   No se alterna el lado ni se destaca a ninguna: cualquier
   diferencia de tamaño o de composicion se lee como jerarquia
   entre ellas, y no es lo que el gabinete quiere transmitir.

   Si una biografia aun no existe, se muestra un placeholder
   claramente identificable en lugar de texto inventado.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.initTeam = function initTeam() {
  'use strict';

  var dom = window.ELE.dom;
  var team = window.ELE.team || [];
  var container = dom.qs('[data-team]');

  if (!container || !team.length) return;

  dom.clear(container);

  team.forEach(function (member) {
    var figure = dom.el(
      'figure',
      {
        // `media--color` desactiva el blanco y negro: los retratos del
        // equipo se muestran en color.
        class: 'member__media media media--4x5 media--zoom media--color',
        'data-reveal': ''
      },
      [
        dom.el('img', {
          src: member.photo.src,
          alt: member.photo.alt,
          // Dimensiones reales de cada archivo (ver data/team.js). El recorte
          // a 4:5 lo hace el CSS con aspect-ratio + object-fit: cover.
          width: String(member.photo.width || 800),
          height: String(member.photo.height || 1000),
          loading: 'lazy',
          decoding: 'async'
        })
      ]
    );

    var content = [
      dom.el('h3', { class: 'member__name', text: member.name }),
      dom.el('p', { class: 'member__role', text: member.role })
    ];

    if (member.bio && member.bio.length) {
      content.push(
        dom.el(
          'div',
          { class: 'member__bio' },
          member.bio.map(function (paragraph) {
            return dom.el('p', { text: paragraph });
          })
        )
      );
    } else {
      var note = dom.placeholder(
        'Contenido pendiente',
        'Texto de presentación pendiente de incorporar. Se publicará cuando ' +
          member.name +
          ' facilite su biografía.'
      );
      note.classList.add('member__bio-placeholder');
      content.push(note);
    }

    var block = dom.el(
      'div',
      { class: 'member__content', 'data-reveal': '', 'data-reveal-delay': '120' },
      content
    );

    container.appendChild(
      dom.el(
        'article',
        {
          // Misma clase para todas, sin variantes: misma estructura, mismo
          // tamaño y misma orientación en todos los bloques.
          class: 'member'
        },
        [figure, block]
      )
    );
  });
};
