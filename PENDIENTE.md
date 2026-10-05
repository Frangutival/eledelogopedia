# Pendiente de la clienta

Todo lo que falta está marcado en el código con un placeholder visible o
un comentario `PENDIENTE`. **No se ha inventado ningún dato**: ni reseñas,
ni testimonios, ni titulaciones, ni precios, ni enlaces.

## 1. Logotipo oficial

Los archivos de `assets/brand/` son **placeholders**. Sustituir por el
logotipo real conservando los mismos nombres de archivo:

- `logo-horizontal.svg` — versión negra, para fondos claros (navbar)
- `logo-horizontal-blanco.svg` — versión blanca, para el footer
- `monograma-ld.svg` — solo el monograma LD (marca de agua de Filosofía)
- `favicon.svg` — icono de pestaña

Si el logo llega en otro formato (`.png`, `.webp`), cambiar también la
extensión en `index.html` (tres apariciones: navbar, footer y favicon).

## 2. Fotografías

Las fotografías reales del gabinete ya están montadas:

| Archivo               | Origen                     | Tamaño      | Uso                  |
| --------------------- | -------------------------- | ----------- | -------------------- |
| `hero.jpg`            | `foto portada ppal.jpeg`   | 1000 × 1600 | Imagen principal     |
| `filosofia.jpg`       | `foto 2.jpeg`              | 1200 × 1600 | Sección Filosofía    |
| `sesion-juego.jpg`    | `foto añadir.jpeg`         | 1200 × 1600 | Forma de trabajar    |
| `lourdes-pujante.jpg` | `foto lourdes.jpeg`        | 1242 × 1600 | Retrato de Lourdes   |
| `lydia-marin.jpg`     | `foto lydia.jpeg`          | 969 × 1624  | Retrato de Lydia     |

Todas se muestran en blanco y negro mediante CSS (`filter: grayscale`),
aunque los archivos originales estén en color. Para verlas en color, quitar
ese filtro en `components.css` (`.media img`) y en `sections.css`
(`.hero__bg img`).

### El hero es el único encuadre delicado

La fotografía es **vertical** y el hero es una franja **apaisada** a
pantalla completa, así que en escritorio solo se ve una banda horizontal
de la imagen (en torno a un tercio de su altura).

Para resolverlo se hicieron dos cosas:

- Se recortó por la derecha (de 1348 a 1000 px de ancho), quitando el
  dispensador y el jarrón y, sobre todo, desplazando a Lourdes del centro
  al 68 % del ancho para dejar libre la pared de la izquierda, que es
  donde cae el titular.
- El encuadre vertical se controla con `object-position` en `sections.css`,
  mediante la variable `--hero-focus` (67 % por defecto). **Subir el valor
  baja el encuadre**; es el único número que hay que tocar si la foto se
  ve mal centrada.

Si en algún momento se consigue una **fotografía apaisada** del gabinete,
el hero ganaría bastante: se vería la composición completa en lugar de una
banda recortada.

### Galería "Conócenos" — ✅ montada

Las nueve fotografías restantes de `img/` están en
`assets/img/centro/`, redimensionadas a 1080 px de ancho y
recomprimidas (1,5 MB en total, con carga diferida). Se muestran **en
color**, con sus tonos originales.

El orden y los pies de foto se editan en `assets/js/data/gallery.js`.

### Consentimiento de imagen — ✅ confirmado por la clienta

La clienta confirma que **todos los padres y tutores legales han dado su
consentimiento** para el uso de las imágenes de los menores.

Queda una única tarea relacionada, que no es de la web sino de
documentación: el tratamiento "publicación de imágenes con fines de
difusión" debería aparecer recogido en la política de privacidad, que
hoy no lo menciona (ver apartado 8.4).

Fotografías afectadas, por si hiciera falta localizarlas:

- `assets/img/filosofia.jpg` (sección Filosofía) — una niña.
- `assets/img/sesion-juego.jpg` (Forma de trabajar) — una niña, de frente
  y perfectamente reconocible.
- `assets/img/centro/sesion-infantil.jpg` — un niño de frente.
- `assets/img/centro/entrada.jpg` — un niño de espaldas.
- `assets/img/centro/terapia-miofuncional.jpg` y
  `assets/img/centro/sesion-adultos.jpg` — pacientes adultas.

Cómo retirar una, si en algún momento se revoca un consentimiento:

- Galería: borrar su entrada de `assets/js/data/gallery.js`. La retícula
  se recompone sola.
- Filosofía o Forma de trabajar: quitar el `<figure>` correspondiente de
  `index.html`. En Forma de trabajar, además, devolver a
  `.process__closing` el `grid-column: 1 / -1` para que la frase final
  recupere todo el ancho.

### Al sustituir cualquier fotografía

Actualizar la ruta en `index.html` (hero y filosofía) o en
`assets/js/data/team.js` (retratos, con su `width` y `height` reales).
Guardarlas siempre en `.jpg` o `.webp` comprimido, nunca en `.png`.

Dirección artística: luz natural, tonos neutros, aspecto editorial,
naturalidad. El sitio ya las convierte a blanco y negro por CSS.

## 3. Biografía de Lydia Marín — ✅ incorporada

Ya está en `assets/js/data/team.js`.

El componente sigue preparado para futuras incorporaciones: si se añade
otra profesional con `bio: null`, en su bloque aparecerá un aviso de
contenido pendiente en lugar de un texto inventado.

Nota sobre el equipo: las dos profesionales se presentan **exactamente
igual**, por decisión expresa. Misma anchura de fotografía, misma
proporción (4:5), misma escala tipográfica y **misma orientación**:
retrato a la izquierda y texto a la derecha en los dos bloques.

Se probó alternar el lado del retrato de un bloque a otro y se descartó.
Cualquier diferencia de tamaño o de composición entre ellas se lee como
jerarquía, y no es lo que el gabinete quiere transmitir. Si en el futuro
se incorpora otra profesional, su bloque debe seguir la misma plantilla.

Las fotografías **nunca se estiran** para cuadrar la altura de los
bloques: se probó igualar las filas y los retratos quedaban alargados. En
su lugar, fotografía y texto se alinean por arriba (`align-items: start`),
de modo que el borde superior del retrato y el nombre arrancan en la misma
línea. Cada bloque toma después la altura que le pida su texto.

## 4. Ubicación de Google Maps — ✅ sincronizada

Resuelta a partir del enlace oficial de la ficha. En
`assets/js/data/site.js` → `contact.place` están ahora los datos reales:

| Dato       | Valor                                  |
| ---------- | -------------------------------------- |
| Coordenadas | 38.0420587, −1.100604                 |
| CID        | 9035724548006069221                    |
| Place ID   | `ChIJf8TTsXaDYw0R5cMtZJpXZX0`          |

**Por qué el enlace anterior no caía bien.** Un enlace de Maps lleva dos
pares de coordenadas: las del prefijo `@`, que son las de la *cámara*
(están desplazadas, porque Google encuadra el mapa, no el local), y las de
los parámetros `!3d` / `!4d`, que son las del punto marcado. Antes se
buscaba por texto de la dirección, que en un centro comercial es
ambigua. Ahora se usan las segundas más el Place ID.

Cambios concretos:

- La dirección y el pie enlazan a `https://www.google.com/maps?cid=…`,
  la forma canónica y estable de la ficha.
- El botón **Cómo llegar** abre directamente la navegación
  (`/maps/dir/?api=1&…`) con coordenadas **y** Place ID, que es lo que
  garantiza que Maps identifique el local exacto.
- Los datos estructurados de `index.html` incluyen ya `geo` y `hasMap`.

Queda una comprobación de un clic: abrir la web, pulsar **Cómo llegar** y
confirmar que cae sobre el local. El Place ID está derivado del
identificador de la ficha con el formato público de Google (el algoritmo
se validó reproduciendo el Place ID de ejemplo que Google documenta), pero
no ha podido comprobarse en vivo desde aquí.

## 5. Reseñas de Google

### Lo que ya está hecho

- Enlaces **reales** a la ficha, siempre visibles al pie de la sección:
  **Ver todas las reseñas en Google** y **Escribir una reseña** (este
  último es el formulario que el propio Google recomienda repartir entre
  los pacientes).
- El componente admite valoración media, fecha de cada reseña y despliegue
  de las opiniones largas.
- La función de servidor que trae las reseñas está escrita:
  `api/google-reviews.js`.

### Lo que falta

**Las reseñas en sí.** No se pueden copiar de Google por programa: la
ficha se dibuja con JavaScript, está detrás de un muro de consentimiento
y rascarla incumple sus condiciones de uso. Hay dos caminos:

**Opción A — a mano, disponible hoy mismo.** Pasar el texto y el nombre
literales de cada reseña y añadirlos a `items` en
`assets/js/data/reviews.js`. Se ven al instante. No se actualizan solas.

**Opción B — automática, la que pidió la clienta.** Requiere tres cosas
que hoy no existen: dominio contratado, hosting con funciones (Vercel o
Netlify, plan gratuito) y una clave de la Places API de Google. Con eso:

1. Google Cloud → nuevo proyecto → activar **Places API (New)**.
2. Crear clave de API y restringirla al dominio del gabinete.
3. Subir la web; guardar la clave como variable de entorno
   `GOOGLE_PLACES_API_KEY`.
4. En `assets/js/data/reviews.js`, poner `endpoint: '/api/google-reviews'`.

A partir de ahí, cada reseña nueva aparece sola. La web las guarda en
caché 12 horas para no llamar a Google en cada visita.

**Límite que impone Google:** la Places API devuelve **como máximo cinco
reseñas**, las que su algoritmo considera más relevantes, y no deja
elegir cuáles. No es una limitación de la web. Por eso la sección enlaza
siempre a la ficha completa.

Hasta que se resuelva una de las dos vías, la sección muestra un aviso
honesto y los botones a Google. **No se añaden reseñas de ejemplo.**

## 6. WhatsApp

**Sin confirmar** que el 623 223 788 tenga WhatsApp, así que el botón no
se muestra y en ningún sitio se afirma que esté disponible.

Cuando se confirme, en `assets/js/data/site.js`:

```js
whatsapp: { enabled: true, number: '34623223788', message: '...' }
```

El CTA principal de contacto pasará automáticamente a WhatsApp y la
llamada quedará como acción secundaria.

## 7. Publicación y dominio

El proyecto ya está preparado para desplegarse: trae `.gitignore`,
`.vercelignore`, `vercel.json` y `robots.txt`. **Las instrucciones paso
a paso están en `README.md`**, en "Cómo publicarlo en GitHub y Vercel".
Se hace entero desde el navegador, sin instalar nada.

### ⚠️ Lo único delicado del despliegue

`assets/legal/` contiene los PDF de la asesoría, y esos PDF llevan el
**teléfono y el correo particulares** de la clienta, que se quitaron a
propósito del sitio publicado. Todo lo que cuelga de `assets/` se sirve
en abierto, así que si llegaran a subirse quedarían descargables desde
cualquier navegador.

El `.gitignore` los excluye, igual que `img/` y los documentos de la
raíz. Pero al arrastrar carpetas en la web de GitHub el `.gitignore` no
siempre se aplica: **hay que comprobarlo antes de desplegar**. Y por eso
el repositorio debe crearse **privado**.

### Al contratar el dominio

- Descomentar y completar en el `<head>` de `index.html`: `canonical`,
  `og:url` y `og:image` (URL absoluta, imagen `.jpg`/`.png` de
  1200×630). Sin `og:image` no sale miniatura al compartir por WhatsApp.
- Descomentar la línea `Sitemap:` de `robots.txt` y crear el
  `sitemap.xml` (cuatro URLs: portada y las tres páginas legales).
- Dar de alta el sitio en Google Search Console.

## 8. Textos legales

Estado actual:

| Documento              | Estado      | Formato                       |
| ---------------------- | ----------- | ----------------------------- |
| Aviso legal            | ✅ completo | `aviso-legal.html`            |
| Política de privacidad | ✅ completa | `politica-de-privacidad.html` |
| Política de cookies    | ✅ completa | `politica-de-cookies.html`    |

Los tres se han rehecho como **páginas HTML propias**, con todos los
datos reales facilitados por la clienta. Se leen mejor en móvil, son
accesibles y Google las indexa, cosa que con un PDF no ocurre igual.

**En lo que depende de la web, no queda nada pendiente para publicar.**
Lo único que sigue abierto (apartado 8.4) es la documentación interna del
gabinete, que es un asunto de la asesoría y no bloquea la puesta en
línea.

Son páginas **sin JavaScript** a propósito: un documento legal debe
poder leerse siempre, también con el script bloqueado. Cargan
`assets/css/legal.css` **en lugar de** `sections.css`.

Los PDF originales de la asesoría se conservan en `assets/legal/` como
referencia de lo que se entregó, pero **ya no se enlazan**: estaban
incompletos (ver 8.3 y 8.4).

### 8.0. Datos facilitados por la clienta — ✅ incorporados

Todos están en `aviso-legal.html`, y el número de registro sanitario
también en el pie de todas las páginas y en los datos estructurados de
`index.html`:

| Dato                  | Valor                                                    |
| --------------------- | -------------------------------------------------------- |
| Titular               | Lourdes Pujante Sánchez                                  |
| NIF                   | 49595216V                                                |
| Forma jurídica        | Persona física (autónoma)                                |
| Domicilio profesional | Avda. Picos de Europa, 28, Urb. Montepinar, 30163 Murcia  |
| Establecimiento       | Avda. Castillo de Monteagudo, CC Montepinar, local 14     |
| Registro sanitario    | RES nº 40004753                                          |
| Titulación            | Graduada en Logopedia, Universidad de Murcia (España)     |
| Colegio               | Colegio Profesional de Logopedas de la Región de Murcia   |
| Nº de colegiada       | 30/1253                                                  |

### 8.0.1. Las dos dudas de la clienta, resueltas

**"Normas profesionales y dónde consultarlas."** Es un requisito del
art. 10.1.d) de la LSSI para profesiones reguladas: hay que decir qué
normas rigen el ejercicio de la profesión y dar un medio —incluido uno
electrónico— para consultarlas. No hay que redactar nada: basta con
citarlas y enlazarlas. En el aviso legal se citan tres, con enlace
verificado:

- Ley 44/2003, de ordenación de las profesiones sanitarias → texto
  consolidado en el BOE.
- Ley 6/2001, de creación del Colegio Profesional de Logopedas de la
  Región de Murcia → texto consolidado.
- Estatutos y código deontológico del colegio → a través de
  `logopedasmurcia.es`.

No se ha enlazado el código deontológico directamente porque no se pudo
localizar su URL exacta en la web del colegio. Si la clienta la tiene, se
añade en un minuto; mientras tanto se remite a la web del colegio, que sí
está verificada.

**"Autorización administrativa."** Sí la tiene, solo que no se llama
así en la práctica: es la **autorización sanitaria de funcionamiento**
que concede la Consejería de Salud, y su huella es precisamente el
número del RES (40004753). Es decir, la pregunta ya estaba contestada
con el dato del registro. No hace falta nada más.

Conviene, eso sí, **confirmar el nombre exacto del órgano competente**
en el documento de la autorización. El aviso legal dice hoy "Consejería
de Salud de la Región de Murcia", que es correcto pero genérico; las
direcciones generales cambian de nombre con cada legislatura y no se ha
querido inventar una.

### 8.1. Qué usa realmente esta web (auditoría)

Comprobado sobre el código, no sobre suposiciones:

- **No pone ninguna cookie.** Ni propia ni de terceros.
- **No hay analítica** (ni Google Analytics, ni Tag Manager, ni píxeles).
- **No hay iframes ni contenido incrustado** de terceros.
- **Único almacenamiento local:** `localStorage`, usado por
  `assets/js/components/reviews.js` para guardar 12 horas la respuesta de
  las reseñas de Google. Hoy **ni siquiera se activa**, porque
  `reviews.endpoint` es `null`. No guarda datos personales.
- **Única petición a un tercero:** las tipografías, que se cargan desde
  `fonts.googleapis.com`. No instalan cookies, pero sí transmiten la IP
  del visitante a Google. Se elimina descargando las dos fuentes y
  sirviéndolas desde el propio dominio; es un cambio de media hora y
  quita de en medio la única transferencia a un tercero que hay.

**Consecuencia práctica:** tal y como está hoy, la web **no necesita
banner de cookies**. Le corresponde la versión corta de la política (la
de "cookies exceptuadas del deber de información y consentimiento").
Esto cambia en el momento en que se añada analítica, un mapa incrustado
o un formulario.

### 8.2. Política de cookies — ✅ redactada

El archivo que entregó la asesoría (`POLITICA DE COOKIES 2024.docx`)
**no era una política: era la plantilla en blanco**, con instrucciones al
redactor, dos textos alternativos a elegir, las tablas de cookies vacías,
restos de maquetación de Word (`right133350`, `left14605`) y enlaces a
Internet Explorer y Opera 12.

Se ha rellenado en `politica-de-cookies.html` partiendo de ese mismo
texto base, con estas decisiones:

- **Se eligió la versión corta** de la primera capa, la de cookies
  exceptuadas, porque es la que corresponde según la auditoría de 8.1.
  Y como no hay cookies sujetas a consentimiento, **no se ha puesto
  banner**: mostrarlo sin necesidad es un estorbo, no una garantía.
- **La tabla está rellena** con el único elemento real: el
  almacenamiento local `ele:reviews`, declarado como técnico y exceptuado,
  con su finalidad y su duración.
- **Se declara Google Fonts** aunque no sea una cookie: transmite la IP
  del visitante y es mejor decirlo.
- Se quitaron los enlaces de navegador obsoletos. No se han sustituido
  por otros porque, no habiendo cookies, la sección es informativa y no
  merecía arriesgar cuatro enlaces que se rompen cada dos años. Si la
  asesoría los quiere, se añaden.

Lo que quedó del documento original y **no** se ha usado: el texto largo
de primera capa (el de cookies con consentimiento). Si algún día se añade
analítica, se recupera de ahí.

Para referencia, esto es lo que contenía la plantilla sin rellenar:

- Instrucciones dirigidas al redactor, no al visitante ("Esta capa debe
  ser facilitada al usuario en el primer acceso…", "Texto para
  incluir:", "Ha de consistir en un documento específico e
  independiente…").
- **Dos textos alternativos** para la primera capa, entre los que hay que
  elegir uno según se usen o no cookies sujetas a consentimiento.
- **Las dos tablas de cookies vacías**: solo los encabezados (Nombre,
  Tipo, Finalidad, Excluida/no excluida) sin una sola fila.
- Restos de maquetación de los cuadros de texto de Word (`right133350`,
  `left14605`, `00`).
- Enlaces de navegador obsoletos: Internet Explorer y Opera 12.

### 8.3. Aviso legal — ✅ rehecho

El PDF de la asesoría tenía seis problemas. Cinco están resueltos con los
datos que facilitó la clienta; el sexto es una decisión suya:

| Problema del PDF                                        | Estado                                                     |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| Hueco sin rellenar: *"pertenecientes a: \_\_\_\_\_\_"*  | ✅ completado con el titular y el nombre comercial          |
| Teléfono y correo distintos a los de la web             | ✅ unificados con los públicos (623 223 788 / correo del gabinete) |
| No aparecía el nombre comercial                         | ✅ ELE DE LOGOPEDIA figura como nombre comercial            |
| Faltaban los datos de profesión regulada                | ✅ titulación, universidad, colegio, nº de colegiada y normas |
| No constaba la inscripción registral                    | ✅ RES nº 40004753 y órgano competente                      |
| Datos en campos de formulario editables                 | ➖ deja de importar: la página HTML no es editable          |

Detalle de la unificación de contacto: el **domicilio profesional**
(Avda. Picos de Europa, 28) y el **establecimiento abierto al público**
(CC Montepinar, local 14) aparecen ahora como **dos campos distintos**,
que es lo correcto: el primero identifica a la titular como persona
física y el segundo es donde se presta el servicio. Ya no hay
contradicción, porque ya no compiten por el mismo hueco.

El correo personal `lourdespujant@gmail.com` **no aparece** en la web: el
único de contacto es el del gabinete.

**Lo único que se reprodujo tal cual del PDF** son las cláusulas de
condiciones de uso (apartado 4 de la página). Se copiaron fielmente y
solo se completó el hueco del titular. Conviene que la asesoría les dé un
último repaso, sobre todo porque mencionan servicios que esta web no
tiene: chats, foros, grupos de noticias, registro con contraseña y
compras. No estorba legalmente —el texto dice expresamente que la
enumeración es "enunciativa pero no limitativa"— pero desentona, y
recortarlo es decisión de quien lo redactó, no nuestra.

### 8.4. Política de privacidad — ✅ redactada

El PDF de la asesoría **no era la política de privacidad de una web**:
era el documento general de cumplimiento RGPD del negocio. Enumera
ficheros y tratamientos internos (contabilidad, gestión laboral,
selección de personal, envío de paquetería, campañas publicitarias) y no
dice absolutamente nada de la web: ni contacto, ni cookies, ni imágenes.

Se ha escrito `politica-de-privacidad.html`, específica para esta web.

**La distinción que resolvió el problema.** Son dos documentos distintos
y se estaban confundiendo:

| Documento                                | Cubre                                        | Dónde vive                    |
| ---------------------------------------- | -------------------------------------------- | ----------------------------- |
| Política de privacidad **de la web**     | Contacto, imágenes, almacenamiento técnico   | `politica-de-privacidad.html` |
| Información al paciente **del gabinete** | Datos de salud, historia clínica             | En consulta, firmada al inicio |

La web **no recoge ni un solo dato de salud**: no hay formulario, ni
reserva de cita, ni ningún campo. Por eso la política de la web no tiene
que regular el tratamiento clínico. Lo que sí hace —y es lo correcto— es
**declarar que ese tratamiento existe**, decir que se informa aparte al
inicio del tratamiento, y citar su base jurídica (art. 9.2.h del RGPD y
Ley 41/2002). Así el visitante no se queda con la impresión de que los
datos de salud no están contemplados en ningún sitio.

Qué cubre la política nueva:

1. **Responsable**, con todos los datos reales y el nº de RES.
2. **Solicitudes de información y cita** por teléfono o correo: qué datos,
   para qué, base jurídica y plazo. Con una recomendación práctica: no
   mandar información de salud en un primer correo.
3. **Publicación de fotografías**, con el consentimiento como base
   (art. 6.1.a RGPD, art. 7 LOPDGDD y art. 3 de la LO 1/1982), la
   aclaración de que **las imágenes no llevan nombres ni diagnósticos**, y
   sobre todo **la vía concreta para retirar el consentimiento**: un
   correo, y la foto se quita. Esto último es el punto que de verdad
   protege, más que cualquier cláusula.
4. **Opiniones de Google**: se explica que las publica su autor en la
   plataforma, no la web.
5. **Datos de salud**: apartado propio, según lo explicado arriba.
6. **Terceros**: alojamiento, correo y Google Fonts, este último con la
   transferencia de IP declarada abiertamente.
7. **Derechos** y reclamación ante la AEPD, con el enlace correcto
   (`aepd.es`, no `agpd.es`).
8. **Seguridad y menores**, incluida la declaración de representación
   legal al facilitar datos de un tercero.

### 8.5. Lo que queda, y no bloquea la publicación

**La web puede publicarse.** Lo que sigue abierto es documentación
interna del gabinete, competencia de la asesoría:

1. **El documento general de RGPD del gabinete no recoge los datos de
   salud.** No es un problema de la web —la web no los trata— pero sí del
   cumplimiento del centro: un gabinete de logopedia trata datos de
   categoría especial y su documentación debería reflejarlo. Vale la pena
   comentárselo a la asesoría, porque parece un olvido de plantilla.
2. **Conviene que exista, firmada, la información al paciente** que la
   política de la web dice que se entrega al inicio del tratamiento. Si ya
   existe, perfecto; si no, hay que crearla, y es el asesor quien debe
   hacerlo.
3. **Las cláusulas de condiciones de uso del aviso legal** (apartado 8.3)
   merecen un repaso para quitar las menciones a chats, foros y compras.
   Cosmético.
4. **Confirmar el nombre exacto del órgano** que concedió la autorización
   sanitaria (apartado 8.0.1).

Nada de esto impide poner la web en línea, y los cuatro puntos se
resuelven sin tocar código salvo el 4, que es cambiar una línea.

**Importante:** los tres documentos los he redactado yo a partir del
material de la asesoría y de los datos de la clienta. No soy asesor
jurídico. Conviene que quien lleva el cumplimiento del gabinete les dé un
visto bueno antes de publicar, o inmediatamente después. Para eso están
en HTML: corregir una frase es editar el archivo, no pedir un PDF nuevo.

### 8.6. Cómo se montaron estas páginas

- Las tres páginas legales están en la **raíz**, junto a `index.html`, de
  modo que las rutas `assets/...` funcionan igual que en la portada.
- Cargan `tokens` → `base` → `layout` → `components` → **`legal.css`**.
  `legal.css` sustituye a `sections.css`: estas páginas no tienen hero ni
  servicios ni equipo.
- **No cargan ningún JavaScript.** Por eso su cabecera y su pie son
  estáticos, y por eso los enlaces legales aparecen escritos a mano en
  ellas en lugar de generarse desde `site.js`. Es un duplicado
  consciente: si se cambia un enlace legal, hay que tocarlo en `site.js`
  **y** en las dos páginas.
- Los enlaces del pie de la portada salen de
  `assets/js/data/site.js` → `legal`. Los tres son páginas del propio
  sitio y se navegan con normalidad, para que el botón "atrás" funcione.
  El componente sigue admitiendo documentos descargables: si una entrada
  lleva `type: 'PDF'`, el enlace se abre en pestaña nueva y anuncia el
  formato y el peso.
- El número del RES aparece en el pie de las tres páginas y en el bloque
  `identifier` de los datos estructurados de `index.html`.
