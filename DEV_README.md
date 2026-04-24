# Guía de Desarrollo — Tuna

## Arquitectura

```
tunafoto/
├── app/
│   ├── layout.tsx            # Layout raíz (Navbar + Footer + fuentes)
│   ├── template.tsx          # Wrapper con animación de fade entre páginas
│   ├── page.tsx              # Página de inicio (Hero)
│   ├── globals.css           # Estilos globales + Tailwind
│   ├── components/
│   │   ├── Navbar.tsx        # Barra de navegación fija (responsive + mobile)
│   │   ├── Hero.tsx          # Hero de pantalla completa con imagen de fondo
│   │   └── Footer.tsx        # Pie de página (oculto en inicio)
│   ├── fotografia/
│   │   └── page.tsx          # Galería de fotos con categorías y scroll infinito
│   ├── video/
│   │   └── page.tsx          # Página de videos
│   ├── clientes/
│   │   └── page.tsx          # Acceso a galerías privadas por código
│   ├── contacto/
│   │   └── page.tsx          # Página de contacto y biografía
│   └── api/
│       └── imagenes/
│           └── route.ts      # API Route — busca imágenes en Cloudinary
├── public/                   # Archivos estáticos (logo, fotos de contacto)
├── next.config.ts            # Configuración de Next.js (dominios de imágenes)
├── .env.example              # Template de variables de entorno
└── package.json
```

## Flujo de datos

1. **Galería de fotos** (`/fotografia`):
   - El cliente selecciona una categoría → llama a `GET /api/imagenes?folder=<slug>`
   - El API Route busca en Cloudinary o devuelve imágenes mock si no hay credenciales
   - Las URLs se cachean en un `useRef` para evitar llamadas repetidas
   - Se renderizan en lotes de 6 con `IntersectionObserver` (scroll progresivo)
   - Cada `<img>` tiene `loading="lazy"` nativo

2. **Videos** (`/video`):
   - URLs de Cloudinary hardcodeadas (no usan el API Route)
   - Autoplay silenciado con controles

3. **Clientes** (`/clientes`):
   - Formulario que valida un código contra un diccionario local
   - Abre la galería en Pixellu en una nueva pestaña

## Configuración

### Variables de entorno

Crear `.env.local` a partir de `.env.example`:

| Variable | Descripción | Requerida |
|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud en Cloudinary | Solo producción |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary | Solo producción |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary | Solo producción |

**Sin estas variables**, el API devuelve imágenes de prueba desde picsum.photos automáticamente.

### Estructura de Cloudinary

Las imágenes en Cloudinary deben estar organizadas en carpetas que coincidan con los slugs de categoría:

```
infantil/
recien-nacido/
familia/
embarazo/
parejas/
retrato/
15-anos/
mascota/
evento/
producto/
```

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo (Turbopack)
npm run dev

# Build de producción
npm run build

# Servir build de producción
npm start

# Lint
npm run lint
```

## Optimizaciones de rendimiento

- **Scroll progresivo**: las imágenes se renderizan en lotes de 6 usando `IntersectionObserver`
- **Lazy loading nativo**: `loading="lazy"` en todas las imágenes de la galería
- **Cloudinary transforms**: las imágenes se sirven con `f_auto,q_auto` (formato y calidad automáticos) y `w_800` (ancho reducido)
- **Caché en cliente**: las categorías ya visitadas no vuelven a hacer fetch
- **`next/image`**: usado en Navbar y Contacto para optimización automática de imágenes estáticas
- **Transiciones con Framer Motion**: animaciones ligeras con `AnimatePresence`

## Seguridad

- El parámetro `folder` en el API Route está validado con regex (`/^[a-zA-Z0-9_-]+$/`) para prevenir inyección en la expresión de búsqueda de Cloudinary
- Las credenciales de Cloudinary se manejan exclusivamente en variables de entorno del servidor
- Los enlaces externos usan `rel="noopener noreferrer"`
- El acceso a galerías de clientes valida el código en el cliente (galerías alojadas en Pixellu)

## Notas

- Las fuentes Google (Geist/Geist Mono) pueden fallar si hay restricciones de red/TLS. La app funciona con fuentes de respaldo.
- El archivo `lib/getImages.ts` fue eliminado (era código muerto de una versión anterior que leía archivos locales).
