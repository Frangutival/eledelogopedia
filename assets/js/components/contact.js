/* =============================================================
   CONTACTO Y FOOTER
   -------------------------------------------------------------
   Todo se construye desde assets/js/data/site.js, que es la unica
   fuente de los datos de contacto.

   Reglas aplicadas:
   - La direccion abre Google Maps. Si aun no hay enlace oficial de
     la ficha, se usa una busqueda de Maps con la direccion exacta
     (nunca coordenadas inventadas).
   - El telefono usa tel: y el email mailto:.
   - WhatsApp solo aparece si esta confirmado en la configuracion.
   - Los enlaces legales pendientes se muestran como texto inerte.
   ============================================================= */

window.ELE = window.ELE || {};

window.ELE.initContact = function initContact() {
  'use strict';

  var dom = window.ELE.dom;
  var site = window.ELE.site;
  var contact = site.contact;

  /* ---------- Enlaces derivados ---------- */
  var place = contact.place || {};

  var mapsUrl =
    contact.mapsUrl ||
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(contact.addressFlat);

  /* "Como llegar" abre directamente la navegacion, no la ficha.
     Se construye con la API publica de URLs de Google Maps:
     el destino va por coordenadas exactas y, ademas, con el Place ID,
     que es lo que garantiza que Maps identifique el local y no una
     direccion aproximada del poligono. */
  var directionsUrl = place.lat && place.lng
    ? 'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent(place.lat + ',' + place.lng) +
      (place.placeId ? '&destination_place_id=' + encodeURIComponent(place.placeId) : '')
    : 'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent(contact.addressFlat);

  var mailto = 'mailto:' + contact.email;

  var whatsappUrl =
    contact.whatsapp && contact.whatsapp.enabled && contact.whatsapp.number
      ? 'https://wa.me/' +
        contact.whatsapp.number +
        (contact.whatsapp.message ? '?text=' + encodeURIComponent(contact.whatsapp.message) : '')
      : null;

  function externalLink(attrs, children) {
    attrs.target = '_blank';
    attrs.rel = 'noopener noreferrer';
    return dom.el('a', attrs, children);
  }

  function row(label, valueNode, modifier) {
    return dom.el('div', { class: 'contact__row' }, [
      dom.el('p', { class: 'contact__label', text: label }),
      dom.el('div', { class: 'contact__value' + (modifier ? ' ' + modifier : '') }, [valueNode])
    ]);
  }

  /* ---------- Bloque de datos ---------- */
  var details = dom.qs('[data-contact-details]');

  if (details) {
    dom.clear(details);

    // Direccion
    var addressLink = externalLink(
      {
        class: 'link',
        href: mapsUrl,
        'aria-label': 'Ver la ubicación en Google Maps: ' + contact.addressFlat
      },
      contact.addressLines.map(function (line, index) {
        return dom.el('span', { style: 'display:block' }, [
          line + (index < contact.addressLines.length - 1 ? ',' : '')
        ]);
      })
    );

    details.appendChild(
      row('Dirección', dom.el('address', {}, [addressLink]), 'contact__value--sm')
    );

    // Telefono
    details.appendChild(
      row(
        'Teléfono',
        dom.el('a', { class: 'link', href: contact.phoneHref, text: contact.phoneDisplay })
      )
    );

    // Email
    details.appendChild(
      row('Email', dom.el('a', { class: 'link', href: mailto, text: contact.email }))
    );

    // Horario
    details.appendChild(
      row(
        'Horario',
        dom.el('div', {}, [
          dom.el('span', { style: 'display:block', text: contact.schedule.days }),
          dom.el('span', {
            style: 'display:block',
            text: contact.schedule.slots.join('  ·  ')
          })
        ]),
        'contact__value--sm'
      )
    );

    // Redes sociales
    details.appendChild(
      row(
        'Redes',
        dom.el(
          'div',
          { class: 'contact__socials' },
          site.social.map(function (network) {
            return externalLink({ class: 'link', href: network.url }, [
              network.label + ' ',
              dom.el('span', { style: 'color:var(--c-grey-600)', text: network.handle })
            ]);
          })
        ),
        'contact__value--sm'
      )
    );
  }

  /* ---------- Botones de accion ---------- */
  var actions = dom.qs('[data-contact-actions]');

  if (actions) {
    dom.clear(actions);

    if (whatsappUrl) {
      actions.appendChild(
        externalLink({ class: 'btn btn--primary', href: whatsappUrl }, [
          'Escribir por WhatsApp',
          dom.el('span', { class: 'btn__arrow', 'aria-hidden': 'true', text: '→' })
        ])
      );
      actions.appendChild(
        dom.el('a', { class: 'btn btn--outline', href: contact.phoneHref }, ['Llamar'])
      );
    } else {
      actions.appendChild(
        dom.el('a', { class: 'btn btn--primary', href: contact.phoneHref }, [
          'Llamar al ' + contact.phoneDisplay,
          dom.el('span', { class: 'btn__arrow', 'aria-hidden': 'true', text: '→' })
        ])
      );
      actions.appendChild(
        dom.el('a', { class: 'btn btn--outline', href: mailto }, ['Escribir un email'])
      );
    }

    actions.appendChild(
      externalLink({ class: 'btn btn--outline', href: directionsUrl }, [
        'Cómo llegar',
        dom.el('span', { class: 'visually-hidden', text: '(se abre en una pestaña nueva)' })
      ])
    );
  }

  /* ---------- Footer: contacto ---------- */
  var footerContact = dom.qs('[data-footer-contact]');

  if (footerContact) {
    dom.clear(footerContact);
    footerContact.appendChild(
      dom.el('li', {}, [
        dom.el('a', { class: 'link', href: contact.phoneHref, text: contact.phoneDisplay })
      ])
    );
    footerContact.appendChild(
      dom.el('li', {}, [dom.el('a', { class: 'link', href: mailto, text: contact.email })])
    );
    footerContact.appendChild(
      dom.el('li', {}, [
        externalLink({ class: 'link', href: mapsUrl }, ['El Esparragal, Murcia'])
      ])
    );
  }

  /* ---------- Footer: redes ---------- */
  var footerSocial = dom.qs('[data-footer-social]');

  if (footerSocial) {
    dom.clear(footerSocial);
    site.social.forEach(function (network) {
      footerSocial.appendChild(
        dom.el('li', {}, [
          externalLink({ class: 'link', href: network.url }, [network.label])
        ])
      );
    });
  }

  /* ---------- Footer: textos legales ----------
     Los documentos son PDF. Se abren en pestaña nueva y el enlace
     anuncia el formato y el peso, tanto en pantalla como para lectores
     de pantalla: abrir un PDF sin avisar es una mala práctica de
     accesibilidad, y más aún desde el móvil con datos.

     Lo que aún no tiene documento publicable sigue siendo texto
     inerte, nunca un enlace roto. */
  var footerLegal = dom.qs('[data-footer-legal]');

  if (footerLegal) {
    dom.clear(footerLegal);
    site.legal.forEach(function (item) {
      if (!item.href) {
        footerLegal.appendChild(
          dom.el('span', {
            class: 'is-pending',
            title: 'Disponible próximamente',
            text: item.label
          })
        );
        return;
      }

      var children = [item.label];

      if (item.type) {
        children.push(
          dom.el('span', {
            class: 'link__meta',
            'aria-hidden': 'true',
            text: ' (' + item.type + (item.size ? ', ' + item.size : '') + ')'
          })
        );
        children.push(
          dom.el('span', {
            class: 'visually-hidden',
            text:
              ' (documento ' +
              item.type +
              (item.size ? ' de ' + item.size : '') +
              ', se abre en una pestaña nueva)'
          })
        );
      }

      // Solo los documentos descargables se abren aparte. Las páginas
      // legales son del propio sitio y deben navegarse con normalidad,
      // para que el botón "atrás" funcione como el visitante espera.
      var attrs = { class: 'link', href: item.href };

      if (item.type) {
        attrs.target = '_blank';
        attrs.rel = 'noopener noreferrer';
      }

      footerLegal.appendChild(dom.el('a', attrs, children));
    });
  }

  /* ---------- Año en curso ---------- */
  var year = dom.qs('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
};
