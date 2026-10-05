# ELE DE LOGOPEDIA — sitio web

> Donde cada voz encuentra su camino

Sitio estático de una sola página para el gabinete ELE DE LOGOPEDIA
(El Esparragal, Murcia).

## Cómo abrirlo

No necesita instalación, compilación ni dependencias: **abre `index.html`
con un doble clic**. Todo el JavaScript son scripts clásicos, así que
funciona igual desde el sistema de archivos que desde un servidor.

## Cómo publicarlo en GitHub y Vercel

Todo el proceso se hace **desde el navegador**. No hace falta instalar
`git`, ni Node, ni la línea de comandos de Vercel.

### ⚠️ Antes de empezar: qué NO se sube

El proyecto ya trae un `.gitignore` que **excluye automáticamente**:

| Qué                           | Por qué                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `img/`                        | Fotos originales sin procesar. La web usa las de `assets/`.  |
| `assets/legal/`               | PDF de la asesoría con el teléfono y el correo particulares. |
| PDF y `.docx` de la raíz      | Los mismos documentos, con datos personales.                 |

Esto **importa de verdad**: todo lo que cuelga de `assets/` se sirve en
abierto. Si esos PDF subieran, quedarían descargables en
`tudominio.com/assets/legal/aviso-legal.pdf`, con el teléfono y el correo
privados que se quitaron a propósito del sitio.

Si al subir los archivos a mano el `.gitignore` no se aplicase (pasa al
arrastrar carpetas en la web de GitHub), **hay que excluir esas tres
cosas manualmente**. Conviene comprobarlo antes de dar a desplegar.

### 1. GitHub

1. Entrar en [github.com/new](https://github.com/new).
2. Nombre del repositorio: `ele-de-logopedia` (o el que se prefiera).
3. Marcar **Private**. No hay motivo para que sea público, y es la red
   de seguridad frente a lo del apartado anterior.
4. Crear el repositorio y pulsar **uploading an existing file**.
5. Arrastrar el contenido de la carpeta del proyecto, **sin** `img/`,
   `assets/legal/` ni los PDF y el `.docx` de la raíz.
6. **Commit changes.**

### 2. Vercel

1. Entrar en [vercel.com/new](https://vercel.com/new) y conectar la
   cuenta de GitHub.
2. Importar el repositorio recién creado.
3. **No tocar nada de la configuración.** Framework: *Other*. Sin
   comando de compilación. El `vercel.json` del proyecto ya lleva lo
   necesario.
4. **Deploy.** En menos de un minuto habrá una URL
   `…​.vercel.app` funcionando.

### 3. Dominio propio

En el panel de Vercel, *Settings → Domains*, añadir el dominio y seguir
las instrucciones de DNS que indique. El certificado HTTPS lo emite
Vercel solo.

### 4. Lo que hay que hacer justo después

- Completar en el `<head>` de `index.html` las tres etiquetas que hoy
  están comentadas: `canonical`, `og:url` y `og:image`. Sin ellas, al
  compartir el enlace por WhatsApp no sale miniatura.
- Descomentar la línea `Sitemap:` de `robots.txt`.
- Si se quieren las reseñas de Google en vivo, añadir la variable de
  entorno `GOOGLE_PLACES_API_KEY` en *Settings → Environment Variables*
  y poner `endpoint: '/api/google-reviews'` en
  `assets/js/data/reviews.js`. Ver `PENDIENTE.md`, apartado 5.

### Qué hace `vercel.json`

- **URLs limpias**: la web se sirve en `/aviso-legal` en vez de
  `/aviso-legal.html`. Los enlaces internos conservan el `.html` para que
  el sitio siga funcionando con doble clic en local; Vercel redirige.
- **Cabeceras de seguridad** en todas las páginas.
- **Caché**: las imágenes se guardan un día; **el CSS y el JavaScript,
  nada**. Es deliberado: los archivos no llevan versión en el nombre, así
  que si se cachearan, un cambio de estilo tardaría semanas en verse.

## Estructura

```
index.html                  Marcado semántico y datos estructurados (SEO)
api/
  google-reviews.js         Función de servidor: reseñas de Google en vivo
                            (opcional, ver PENDIENTE.md § 5)
assets/
  brand/                    Logotipo, monograma y favicon
  img/                      Fotografías
  css/
    tokens.css              Color, tipografía, espaciado, motion
    base.css                Reset, tipografía base, foco, reduced-motion
    layout.css              Contenedores, secciones, rejilla, animación de scroll
    components.css          Botones, navbar, menú móvil, servicios, carrusel
    sections.css            Composición de cada sección
  js/
    data/                   ← CONTENIDO EDITABLE
      site.js               Contacto, redes, enlaces, textos legales
      services.js           Los 8 servicios
      team.js               Profesionales y biografías
      gallery.js            Fotografías del centro ("Conócenos")
      process.js            Forma de trabajar
      reviews.js            Reseñas de Google
    utils/dom.js            Helper para construir nodos
    components/             Un archivo por componente
    main.js                 Inicialización
```

## Dónde se edita cada cosa

| Quiero cambiar…                    | Archivo                            |
| ---------------------------------- | ---------------------------------- |
| Teléfono, email, dirección, horario | `assets/js/data/site.js`           |
| Ficha y ubicación de Google         | `assets/js/data/site.js` → `place`  |
| Activar WhatsApp                    | `assets/js/data/site.js` → `whatsapp` |
| Textos de los servicios             | `assets/js/data/services.js`       |
| Biografías del equipo               | `assets/js/data/team.js`           |
| Fotos de "Conócenos" y su orden     | `assets/js/data/gallery.js`        |
| Reseñas de Google                   | `assets/js/data/reviews.js`        |
| Colores, tamaños, espaciado         | `assets/css/tokens.css`            |
| Fotografías                         | Sustituir archivos en `assets/img/` |
| Logotipo                            | Sustituir archivos en `assets/brand/` |

### Dos duplicados que hay que mantener sincronizados

1. **Datos de contacto**: además de `site.js`, aparecen en el bloque
   `application/ld+json` de `index.html` (datos estructurados para Google)
   y en el bloque `<noscript>` de la sección de contacto.
2. **Textos de servicios**: además de `services.js`, hay una copia en el
   `<noscript>` de la sección de servicios, para navegadores sin JavaScript.

Ambos sitios están marcados con un comentario en el propio archivo.

## Decisiones de diseño

- **Paleta**: blanco dominante, negro para marca y jerarquía, grises solo
  de apoyo. Sin color de acento.
- **Tipografía**: Fraunces (serif con carácter y peso real) + Inter
  (sans-serif). Solo dos familias. La serif no se limita a los titulares:
  es la **voz de marca** y ocupa también navegación, botones, antetítulos
  y etiquetas, para que la interfaz no se sienta genérica. La sans queda
  para texto corrido, donde manda la legibilidad y conviene que no
  compita. Para cambiar la serif: `--f-serif` en `tokens.css` y la URL de
  Google Fonts en `index.html`.
- **Hero a sangre**: fotografía a pantalla completa con la cabecera
  transparente encima. La legibilidad se apoya en un doble degradado
  (vertical + lateral), no en un velo plano, para que aguante también con
  una fotografía clara.
- **Servicios como accordion** en lugar de modal: los textos son breves,
  no interrumpe la lectura, no provoca saltos de layout y en móvil se
  maneja con un solo toque.
- **Fotografía en blanco y negro** por CSS (`filter: grayscale`), con dos
  excepciones deliberadas, marcadas con la clase `media--color`: los
  retratos del equipo y toda la galería de "Conócenos". Ahí interesa ver
  a las personas y el centro tal y como son.
- **"Conócenos" es la única sección a color.** Retícula uniforme de 3:4
  con visor ampliado (teclado, deslizamiento táctil y foco atrapado).
- **Opiniones conectadas a Google, no copiadas**: la sección pinta lo que
  devuelva `reviews.endpoint`, con respaldo en `reviews.items` y caché en
  el navegador. Los botones de la ficha real (leer todas / escribir una)
  se muestran siempre, haya o no reseñas cargadas.
- **Sin formulario de contacto**: un formulario sin servidor no enviaría
  nada. El contacto se resuelve con teléfono, email y Maps. Se puede
  añadir en la segunda fase si se quiere.

## Accesibilidad

HTML semántico, un solo `h1`, jerarquía correcta de encabezados, `alt` en
todas las imágenes (vacío en las decorativas), navegación por teclado
completa, foco visible, accordions con `aria-expanded` / `aria-controls`,
menú móvil con foco atrapado y cierre con `Escape`, y respeto de
`prefers-reduced-motion`.

## Pendiente

Ver [`PENDIENTE.md`](PENDIENTE.md).
