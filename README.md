# Beaconex Landing

Landing page de **Beaconex S.A.S.** — Next.js (App Router) + TypeScript + CSS Modules.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local`:

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SITE_URL` | URL canónica / SEO (default: `https://www.beaconex-solutions.com`) |
| `NEXT_PUBLIC_CALENDAR_URL` | Link de agenda. Si está vacío, el CTA va a `#contacto` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp Business con código de país (ej. `573001234567`) |
| `FORMSPREE_ID` | ID de Formspree para el formulario de contacto |

### Links de formulario por servicio (WhatsApp Business)

Usa estos en catálogo / respuestas rápidas:

- Presencia Digital: `/?servicio=presencia-digital#contacto`
- Transformación Operativa: `/?servicio=transformacion#contacto`
- Aliado Tecnológico: `/?servicio=aliado-tecnologico#contacto`

## Deploy en Vercel

1. Sube el repo a GitHub.
2. En [vercel.com](https://vercel.com): **Add New Project** → importa el repo.
3. Framework: **Next.js** (auto-detectado).
4. Añade las variables de entorno anteriores.
5. Deploy.

## Estructura

- `app/` — rutas, layout, API `/api/contact`, SEO
- `components/` — secciones de la landing
- `lib/site.ts` — copy y datos de la empresa
- `legacy/index.html` — versión HTML anterior (archivo)

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run start` — servir build
- `npm run lint` — ESLint
