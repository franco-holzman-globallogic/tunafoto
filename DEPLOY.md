# Despliegue en Vercel

## Requisitos previos

- Cuenta en [Vercel](https://vercel.com/) (el plan gratuito es suficiente)
- Repositorio en GitHub con el código del proyecto
- Credenciales de Cloudinary (para producción)

---

## Opción 1: Deploy manual desde la CLI

### 1. Instalar la CLI de Vercel

```bash
npm i -g vercel
```

### 2. Iniciar sesión

```bash
vercel login
```

### 3. Deploy

Desde la raíz del proyecto:

```bash
vercel
```

La primera vez te va a pedir:
- **Set up and deploy?** → `Y`
- **Which scope?** → seleccioná tu cuenta
- **Link to existing project?** → `N`
- **Project name?** → `tunafoto` (o el que prefieras)
- **Directory?** → `.` (la raíz)
- **Override settings?** → `N` (Vercel detecta Next.js automáticamente)

### 4. Configurar variables de entorno

Desde el dashboard de Vercel o por CLI:

```bash
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

Ingresá cada valor cuando lo pida. Seleccioná los entornos: **Production**, **Preview** y **Development**.

### 5. Deploy a producción

```bash
vercel --prod
```

---

## Opción 2: Deploy automático con GitHub (recomendado)

Esta es la forma más práctica: cada push a `main` dispara un deploy automático.

### 1. Subir el proyecto a GitHub

Si todavía no lo subiste:

```bash
git init
git add .
git commit -m "deploy inicial"
git remote add origin https://github.com/tu-usuario/tunafoto.git
git push -u origin main
```

### 2. Importar en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Clic en **"Import Git Repository"**
3. Seleccionar el repositorio `tunafoto`
4. Vercel detecta automáticamente que es un proyecto Next.js
5. En **Environment Variables**, agregar:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
6. Clic en **Deploy**

### 3. Deploy automático configurado

Una vez importado, Vercel automáticamente:

- **Hace deploy a producción** en cada push a la rama `main`
- **Crea un preview deploy** en cada pull request o push a otras ramas
- **No consume minutos de CI** — Vercel tiene su propio pipeline gratuito, independiente de GitHub Actions

> **Nota sobre el plan gratuito de Vercel (Hobby):**
> - Incluye deploys ilimitados
> - Builds de hasta 45 minutos
> - 100 GB de ancho de banda por mes
> - Funciones serverless con 10 segundos de timeout
> - No tiene costo mientras el proyecto sea personal/no comercial

### 4. Verificar la configuración

En el dashboard de Vercel → tu proyecto → **Settings** → **Git**:

- **Production Branch**: debe ser `main`
- **Auto-deploy**: debe estar habilitado (viene activado por defecto)

### 5. Dominio personalizado (opcional)

En **Settings** → **Domains**, podés agregar tu dominio:

1. Clic en **Add**
2. Escribir tu dominio (ej: `tunafoto.com`)
3. Vercel te da los registros DNS que tenés que configurar en tu proveedor de dominio
4. Esperar la propagación DNS (puede tardar hasta 48hs)

---

## Estructura del deploy

```
Vercel
├── Build: next build (automático)
├── Output: .next/ (standalone)
├── API Routes: /api/imagenes → Serverless Function
└── Assets: /public/ → Edge CDN
```

## Troubleshooting

### Las imágenes no cargan en producción

Verificá que las 3 variables de entorno de Cloudinary estén configuradas en Vercel. Podés verlas en **Settings** → **Environment Variables**.

### El build falla

```bash
# Probá el build localmente antes de pushear
npm run build
```

### Los fonts no cargan

Es un tema de TLS en el servidor de build. En producción no debería pasar. Si persiste, se puede agregar en `next.config.ts`:

```ts
experimental: {
  turbopackUseSystemTlsCerts: true,
}
```
