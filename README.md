# Tuna — Fotografía & Video

Sitio web de portfolio profesional de fotografía y video, creado para **Lupe Holzman**.

## Secciones

- **Inicio** — Hero a pantalla completa con imagen de fondo y animación de entrada.
- **Fotografía** — Galería con 10 categorías (infantil, recién nacido, familia, embarazo, parejas, retrato, 15 años, mascota, evento, producto). Las imágenes se cargan desde Cloudinary con scroll progresivo y lazy loading.
- **Video** — Reproductor de videos con autoplay silenciado.
- **Clientes** — Acceso privado a galerías mediante código.
- **Contacto** — Página de presentación con enlaces a Instagram, WhatsApp y Facebook.

## Tecnologías

- [Next.js](https://nextjs.org/) 16 (App Router + Turbopack)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/) — animaciones y transiciones de página
- [Cloudinary](https://cloudinary.com/) — almacenamiento y optimización de imágenes/video
- TypeScript

## Inicio rápido

```bash
npm install
npm run dev
```

El servidor arranca en `http://localhost:3000`.

Sin credenciales de Cloudinary, la galería muestra imágenes de prueba automáticamente (mock con [picsum.photos](https://picsum.photos/)).

Para usar imágenes reales, creá un archivo `.env.local` (ver `.env.example`):

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Opcionalmente, podés configurar las URLs de videos, galerías de clientes y redes sociales con variables `NEXT_PUBLIC_*` (ver `.env.example` para la lista completa).

## Licencia

Proyecto privado. Todos los derechos reservados.

