# ProDev Labs — Landing Page

Landing page profesional para **ProDev Labs**, empresa de desarrollo de software.
Incluye frontend estático (HTML5 + TailwindCSS + JavaScript vanilla) y un backend
en Python (FastAPI) para procesar el formulario de contacto.

## Estructura del proyecto

```
Code_ProDevLabs/
├── index.html              # Página principal (todas las secciones)
├── css/
│   └── styles.css          # Estilos personalizados que complementan Tailwind
├── js/
│   └── main.js              # Navbar, menú móvil, contador animado, AOS, formulario
├── backend/
│   ├── app.py               # API FastAPI — endpoint POST /api/contacto
│   ├── requirements.txt     # Dependencias Python
│   └── .env.example         # Plantilla de variables de entorno
├── assets/
│   ├── logo-full.png         # Logo a color (ícono + wordmark) — navbar
│   ├── logo-full-white.png   # Logo en blanco — sección Contacto y footer
│   ├── logo-icon.png         # Solo el ícono (aspas), recortado cuadrado
│   ├── favicon.png           # Ícono para la pestaña del navegador
│   ├── og-image.jpg          # Imagen de vista previa para redes sociales
│   ├── *.pdf                 # Archivos fuente de marca (logo, brand guide, portafolio)
│   └── historia_prodevlabs.docx  # Texto fuente de la sección "Nuestra historia"
└── README.md
```

## 1. Ejecutar el frontend

El frontend es estático (no requiere compilación). Basta con servirlo con
cualquier servidor local, por ejemplo:

```bash
# Opción A: servidor embebido de Python
cd Code_ProDevLabs
python -m http.server 5500

# Luego abre: http://localhost:5500
```

También puedes usar la extensión **Live Server** de VS Code, o abrir
`index.html` directamente en el navegador (aunque para que el formulario
pueda llamar a la API es recomendable usar un servidor local en vez de
`file://`).

> TailwindCSS, Google Fonts y AOS.js se cargan desde CDN, así que no
> necesitas instalar Node.js ni ejecutar ningún build.

## 2. Ejecutar el backend (API del formulario de contacto)

Requiere **Python 3.10+**.

```bash
cd Code_ProDevLabs/backend

# Crear entorno virtual
python -m venv venv

# Activarlo
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
copy .env.example .env      # Windows
# cp .env.example .env      # macOS / Linux
```

Edita `.env` y completa:

- `EMAIL_USER`: la cuenta de Gmail que enviará las notificaciones.
- `EMAIL_PASS`: una **contraseña de aplicación** de esa cuenta (no la
  contraseña normal). Se genera en
  https://myaccount.google.com/apppasswords (requiere verificación en
  dos pasos activada en la cuenta de Google).
- `RECIPIENT_EMAIL`: correo que recibirá los mensajes (por defecto
  `mariat018@gmail.com`).

Levanta la API:

```bash
uvicorn app:app --reload --port 8000
```

La API quedará disponible en `http://localhost:8000`, con:

- `GET /api/health` → verifica que el servicio está activo.
- `POST /api/contacto` → recibe `{ nombre, email, servicio, mensaje }` y
  envía el correo de notificación.
- Documentación interactiva automática en `http://localhost:8000/docs`.

## 3. Conectar frontend y backend

`js/main.js` detecta automáticamente si el sitio corre en `localhost`; en
ese caso apunta las peticiones del formulario a
`http://localhost:8000/api/contacto`. En producción, si despliegas el
backend detrás del mismo dominio que el frontend (por ejemplo con un
reverse proxy / Nginx), cambia esa URL por la ruta relativa `/api/contacto`
en `js/main.js` (constante `API_CONTACT_URL`).

Mientras desarrollas en local con dos servidores distintos (frontend en
`:5500` y backend en `:8000`), el CORS ya está habilitado en `app.py`
(`allow_origins=["*"]`) para que la petición funcione sin problemas. Antes
de pasar a producción, restringe `allow_origins` al dominio real del sitio.

## 4. Notas de diseño y accesibilidad

- **Responsivo mobile-first**: la navegación colapsa a menú hamburguesa en
  pantallas pequeñas, y las grillas de tarjetas pasan de 1 a 2 y 3 columnas
  según el breakpoint (`sm`, `md`, `lg`).
- **Accesibilidad**: enlace "saltar al contenido", `aria-label` en botones
  e íconos, `aria-live` en el mensaje de estado del formulario, foco
  visible en todos los elementos interactivos y contraste de color acorde
  a WCAG AA sobre los fondos de marca.
- **SEO**: meta `title`, `description`, `viewport`, etiquetas Open Graph y
  Twitter Card ya incluidas en `index.html`, apuntando a `assets/og-image.jpg`
  (1200×630px, generada a partir del logo real sobre el gradiente de marca).
- **Logo**: los PNG de `assets/` se generaron a partir de `LOGO PRODEV LABS.pdf`
  (renderizado con PyMuPDF y recortado con Pillow). Si el logo cambia, vuelve
  a exportar el PDF actualizado y repite el proceso, o reemplaza los PNG
  directamente manteniendo los mismos nombres de archivo.
- **Animaciones**: AOS.js anima la aparición de secciones al hacer scroll;
  los contadores de estadísticas se animan una sola vez al entrar en
  pantalla mediante `IntersectionObserver`.

## 5. Producción

- Minifica `css/styles.css` y `js/main.js` antes de desplegar (por ejemplo
  con herramientas como `esbuild`, `terser` o `cssnano`), o sírvelos con
  compresión gzip/Brotli desde el servidor web.
- Añade imágenes reales optimizadas (WebP) en `assets/` y aplícales
  `loading="lazy"` si agregas fotografías al sitio.
- Despliega el backend (`backend/`) en un servicio como Render, Railway,
  Fly.io o un VPS con `uvicorn`/`gunicorn` detrás de Nginx, y configura las
  variables de entorno del `.env` como secretos del proveedor.

## Contacto

**ProDev Labs**
CEO: María Salcedo
WhatsApp: +57 316 3152408
Email: mariat018@gmail.com
Instagram: [@prodevlabs](https://instagram.com/prodevlabs)
