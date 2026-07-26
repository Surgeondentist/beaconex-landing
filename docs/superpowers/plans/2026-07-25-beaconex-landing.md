# Beaconex Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el `index.html` monolítico por una landing Next.js App Router con rediseño “estudio moderno”, conversión dual (agenda + formulario) y listo para Vercel.

**Architecture:** App Router + TypeScript; secciones como componentes con CSS Modules; copy y datos en `lib/site.ts`; `POST /api/contact` → Formspree; CTA agenda vía `NEXT_PUBLIC_CALENDAR_URL`.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS Modules, `next/font` (Syne + Source Sans 3), Vercel.

## Global Constraints

- Idioma UI: español (`lang="es"`)
- Tipografías: Syne (display) + Source Sans 3 (body) — no Inter/Roboto/Arial
- Paleta tokens exactos del spec: `--ink #0C1222`, `--paper #F7F4EF`, `--signal #E85D04`, `--signal-deep #C44D03`, `--mist #EDE8E0`, `--line #D6CFC4`, `--sky #1B6B7A`
- Hero: sin cards, badges flotantes, stats ni overlays de chips
- Conservar datos: email `hola@beaconex-solutions.com`, Bello Antioquia, 3 paquetes de servicio
- No commits salvo que el usuario lo pida explícitamente
- No push a remoto salvo petición explícita

## File map

| Path | Responsibility |
|------|----------------|
| `package.json` / `next.config.ts` / `tsconfig.json` | Proyecto Next.js |
| `app/layout.tsx` | Fuentes, metadata SEO, shell HTML |
| `app/page.tsx` | Compone secciones |
| `app/globals.css` | Reset, tokens, utilidades globales |
| `app/robots.ts` / `app/sitemap.ts` | SEO crawlers |
| `app/api/contact/route.ts` | Validación + proxy Formspree |
| `lib/site.ts` | Copy, servicios, empresa, env helpers |
| `components/*` | Secciones UI + CSS Modules |
| `.env.example` | Documentar env vars |
| `legacy/index.html` | Archivo HTML original (movido) |

---

### Task 1: Scaffold Next.js y archivar HTML legacy

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Move: `index.html` → `legacy/index.html`
- Create: `.env.example`

**Interfaces:**
- Produces: app Next.js que responde en `/` con placeholder “Beaconex”

- [ ] **Step 1: Mover el HTML actual a legacy**

```powershell
New-Item -ItemType Directory -Force -Path legacy | Out-Null
Move-Item -Path index.html -Destination legacy/index.html
```

- [ ] **Step 2: Crear proyecto Next.js en el directorio actual**

Run (en la raíz del repo):

```powershell
npx create-next-app@latest . --typescript --eslint --app --no-tailwind --no-src-dir --import-alias "@/*" --turbopack --yes
```

Si `create-next-app` se niega por archivos existentes (`docs/`, `legacy/`), crear `package.json` manualmente:

```json
{
  "name": "beaconex-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.4.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.4.0",
    "typescript": "^5.0.0"
  }
}
```

Luego: `npm install`

- [ ] **Step 3: Añadir `.env.example`**

```
NEXT_PUBLIC_SITE_URL=https://www.beaconex-solutions.com
NEXT_PUBLIC_CALENDAR_URL=
FORMSPREE_ID=
```

- [ ] **Step 4: Verificar scaffold**

Run: `npm run build`  
Expected: Build exitoso (página default o placeholder).

---

### Task 2: Tokens globales, fuentes y `lib/site.ts`

**Files:**
- Create: `lib/site.ts`
- Modify: `app/globals.css`, `app/layout.tsx`

**Interfaces:**
- Produces:
  - `siteConfig` object con `name`, `legalName`, `email`, `url`, `location`, `calendarUrl`, `services[]`, `processSteps[]`, `whyPoints[]`, `navLinks[]`
  - CSS variables en `:root` según Global Constraints

- [ ] **Step 1: Escribir `lib/site.ts`**

```ts
export const siteConfig = {
  name: "Beaconex",
  legalName: "Beaconex S.A.S.",
  tagline: "Soluciones Tecnológicas",
  email: "hola@beaconex-solutions.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.beaconex-solutions.com",
  location: "Bello, Antioquia — Colombia",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? "",
  navLinks: [
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ],
  services: [
    {
      id: "presencia-digital",
      num: "01",
      name: "Presencia Digital",
      featured: false,
      summary: "Tu negocio en internet, listo para vender y generar confianza.",
      features: [
        "Landing o sitio web a medida",
        "Consultoría y optimización Shopify",
        "Apps e integraciones Shopify",
        "Analytics y dominio",
      ],
    },
    {
      id: "transformacion",
      num: "02",
      name: "Transformación Operativa",
      featured: true,
      badge: "Más solicitado",
      summary: "Digitalizamos procesos para que operes con claridad y menos fricción.",
      features: [
        "Diagnóstico de procesos",
        "Google Workspace y CRM",
        "Automatizaciones e integraciones",
        "Apps web a medida",
        "1 mes de soporte post-entrega",
      ],
    },
    {
      id: "cto-externo",
      num: "03",
      name: "CTO Externo",
      featured: false,
      summary: "Liderazgo tecnológico sin el costo de un CTO full-time.",
      features: [
        "Estrategia y hoja de ruta",
        "Revisión de seguridad y riesgos",
        "Arquitectura y decisiones tech",
        "Supervisión de equipos y proveedores",
        "Retainer mensual con canal directo",
      ],
    },
  ],
  processSteps: [
    { num: "01", title: "Diagnosticar", body: "Entendemos tu operación, restricciones y metas de negocio." },
    { num: "02", title: "Diseñar", body: "Priorizamos el camino con más impacto y menos riesgo." },
    { num: "03", title: "Construir", body: "Entregamos por iteraciones, con comunicación constante." },
    { num: "04", title: "Acompañar", body: "Soporte y mejoras para que la solución se sostenga." },
  ],
  whyPoints: [
    { title: "Ciberseguridad integrada", body: "Seguridad desde el día uno, no como parche al final." },
    { title: "Enfoque en resultados", body: "Soluciones que resuelven problemas reales de negocio." },
    { title: "Entregas puntuales", body: "Metodología ágil y compromisos que se cumplen." },
  ],
  techTags: ["React", "Node.js", "Shopify", "Python", "AWS", "IA / ML", "Ciberseguridad"],
  stats: [
    { value: "3+", label: "Años de experiencia" },
    { value: "B2B", label: "Enfoque empresarial" },
    { value: "LATAM+", label: "Clientes internacionales" },
    { value: "100%", label: "Comprometidos" },
  ],
} as const;

export type ServiceId = (typeof siteConfig.services)[number]["id"];
```

- [ ] **Step 2: Definir tokens y reset en `app/globals.css`**

Incluir `:root` con los 7 tokens del spec, `html { scroll-behavior: smooth }`, body con Source Sans 3, clase `.font-display` para Syne, focus-visible outline en `--signal`.

- [ ] **Step 3: Configurar `app/layout.tsx`**

- Importar `Syne` y `Source_Sans_3` desde `next/font/google`
- `metadata`: title `Beaconex — Soluciones Tecnológicas`, description, `metadataBase`, openGraph, twitter
- `<html lang="es">`

- [ ] **Step 4: Verificar**

Run: `npm run build`  
Expected: PASS

---

### Task 3: Nav + Hero

**Files:**
- Create: `components/Nav.tsx`, `components/Nav.module.css`, `components/Hero.tsx`, `components/Hero.module.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `siteConfig` from `lib/site.ts`
- Produces: Nav sticky con menú móvil; Hero con marca, headline, CTAs

- [ ] **Step 1: Implementar `Nav`**

- Logo wordmark `Beacon` + `ex` en `--sky`
- Links desde `siteConfig.navLinks`
- CTA “Agendar llamada”: si `calendarUrl` → `<a href={calendarUrl} target="_blank" rel="noopener noreferrer">`; si no → `#contacto`
- Menú móvil: botón hamburger, `aria-expanded`, `aria-controls="mobile-nav"`, panel con mismos links
- Clase scrolled al pasar ~40px (listener `scroll` o CSS `animation-timeline` si se prefiere JS ligero)

- [ ] **Step 2: Implementar `Hero`**

- Fondo full-bleed: gradiente paper→mist + patrón geométrico CSS (no imagen externa requerida)
- Marca “Beaconex” como señal hero-level (más grande que el headline o al menos igual de dominante)
- Headline reescrito (tono estudio), 1 subtítulo, CTAs: Agendar + Ver servicios (`#servicios`)
- Animación entrada (opacity/translate) con `@media (prefers-reduced-motion: reduce)` desactivada

- [ ] **Step 3: Montar en `page.tsx` y verificar**

Run: `npm run dev` — revisar viewport móvil y desktop  
Run: `npm run build` — PASS

---

### Task 4: Services + Process + Why

**Files:**
- Create: `components/Services.tsx`, `Services.module.css`, `Process.tsx`, `Process.module.css`, `Why.tsx`, `Why.module.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `siteConfig.services`, `processSteps`, `whyPoints`, `stats`, `techTags`

- [ ] **Step 1: `Services`** — layout editorial (número grande + nombre + summary + lista). Badge “Más solicitado” solo en featured, integrado en el flujo tipográfico (no sticker flotante sobre media). `id="servicios"`.

- [ ] **Step 2: `Process`** — 4 pasos en fila/stack. `id="proceso"`.

- [ ] **Step 3: `Why`** — puntos + bloque datos empresa/stats/tags. `id="nosotros"`. Sin emojis en stats.

- [ ] **Step 4: Build**

Run: `npm run build` — PASS

---

### Task 5: Contact (agenda + form) + API + Footer

**Files:**
- Create: `components/Contact.tsx`, `Contact.module.css`, `components/Footer.tsx`, `Footer.module.css`, `app/api/contact/route.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `POST /api/contact` accepts JSON, returns `{ ok: true }` or `{ ok: false, error: string }`
- Form fields: `nombre` (required), `empresa`, `email` (required), `servicio`, `mensaje` (required)

- [ ] **Step 1: API route**

```ts
// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }
  const { nombre, empresa, email, servicio, mensaje } = body as Record<string, string>;
  if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
    return NextResponse.json({ ok: false, error: "Faltan campos obligatorios" }, { status: 400 });
  }
  const formspreeId = process.env.FORMSPREE_ID;
  if (!formspreeId) {
    return NextResponse.json(
      { ok: false, error: "Formulario no configurado. Escríbenos a hola@beaconex-solutions.com" },
      { status: 503 }
    );
  }
  const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, empresa, email, servicio, mensaje }),
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "No se pudo enviar. Intenta de nuevo." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: `Contact`**

- Bloque primario: título + botón/link “Agendar llamada”
- Formulario client component (`"use client"`) con estados idle/loading/success/error
- Labels asociados; select de servicios desde `siteConfig.services`
- Info: email, url, location

- [ ] **Step 3: `Footer`** — logo, email, copyright `© 2026 Beaconex S.A.S.`

- [ ] **Step 4: Verificar API sin FORMSPREE_ID**

```powershell
curl -Method POST http://localhost:3000/api/contact -ContentType "application/json" -Body '{"nombre":"Test","email":"a@b.com","mensaje":"hola"}'
```

Expected: status 503 y mensaje de no configurado.

---

### Task 6: SEO (robots, sitemap, favicon) + pulido a11y + Vercel

**Files:**
- Create: `app/robots.ts`, `app/sitemap.ts`, `app/icon.tsx` (o `public/favicon.ico`)
- Modify: componentes según checklist a11y

- [ ] **Step 1: `robots.ts` y `sitemap.ts`** usando `siteConfig.url`

- [ ] **Step 2: Favicon simple** — `app/icon.tsx` con ImageResponse o SVG en `app/icon.svg` (marca “B” / señal)

- [ ] **Step 3: Checklist a11y**
  - Skip link al `#contenido`
  - SVGs decorativos `aria-hidden="true"`
  - Focus visible en links/botones/inputs
  - Nav móvil operable con teclado

- [ ] **Step 4: Build final + nota Vercel**

Run: `npm run build` — PASS  

Documentar en README breve:
1. `npm install && npm run dev`
2. Variables en Vercel: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CALENDAR_URL`, `FORMSPREE_ID`
3. Importar repo en Vercel → Framework Preset Next.js → Deploy

---

## Spec coverage check

| Spec item | Task |
|-----------|------|
| Estructura 7 bloques | 3–5 |
| Paleta + tipografía | 2–3 |
| Copy reescrito / servicios preservados | 2, 4 |
| Calendar env + form API | 5 |
| A11y móvil / SEO / Vercel | 3, 6 |
| Legacy HTML | 1 |

## Execution

Tras guardar este plan: ejecutar con **subagent-driven-development** o **executing-plans** (inline).
