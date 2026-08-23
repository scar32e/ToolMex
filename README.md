# ToolMex

Plataforma de herramientas gratuitas online (calculadoras, conversores y utilidades). HTML, CSS y JavaScript vanilla — sin backend, sin dependencias de build.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `toolmex`).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio (o a la rama `main`).
3. En GitHub: **Settings → Pages → Source → Deploy from a branch**, elige la rama `main` y la carpeta `/ (root)`.
4. Tu sitio quedará publicado en `https://tu-usuario.github.io/toolmex/`.

## Antes de publicar

- Reemplaza `https://toolmex.example.com` por tu dominio real (o la URL de GitHub Pages) en:
  - `sitemap.xml`
  - `robots.txt`
  - Las etiquetas `<link rel="canonical">` y `og:url` dentro de `build.py` (variable `SITE`), y vuelve a ejecutar `python3 build.py` para regenerar todas las páginas.
- Los espacios con la clase `.ad-slot` están listos para insertar tus anuncios (por ejemplo, Google AdSense). Solo reemplaza el contenido del `<div class="ad-slot">...</div>` por tu código de anuncio.
- El conversor de monedas usa tasas de cambio de referencia editables manualmente (no consulta ninguna API externa), para mantener el sitio 100% estático y sin backend.
- El generador de QR usa el servicio público `api.qrserver.com` para renderizar la imagen (a través de una simple etiqueta `<img>`), sin backend propio.

## Estructura del proyecto

```
/index.html            → Página principal (buscador, categorías, grid de herramientas)
/faq.html               → Preguntas frecuentes generales
/robots.txt
/sitemap.xml
/css/style.css          → Estilos globales (tema negro/dorado)
/js/tools-data.js       → Catálogo de herramientas (usado por buscador e índice)
/js/main.js             → Lógica compartida (búsqueda, menú, FAQ, tarjetas)
/tools/*.html           → 16 páginas individuales, una por herramienta
/build.py                → Script Python que genera todas las páginas (opcional, solo si editas contenido)
```

## Regenerar el sitio tras editar `build.py`

```bash
python3 build.py
```

Esto regenera `index.html`, `faq.html` y las 16 páginas de `/tools/`.

## Herramientas incluidas

Calculadora · Porcentajes · Regla de tres · Promedio escolar · Descuentos e IVA · Conversor Kg/Lb · Conversor °C/°F · Conversor Metros/Pies · Conversor de Monedas · Contador de palabras · Generador de contraseñas · Calculadora de edad · Días entre fechas · Generador de QR · Cronómetro · Temporizador
