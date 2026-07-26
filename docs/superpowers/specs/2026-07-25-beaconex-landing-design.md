# Beaconex Landing — Design Spec

**Date:** 2026-07-25  
**Status:** Approved for implementation  
**Product:** Landing page de Beaconex S.A.S. (estudio tecnológico)

## Goal

Rediseñar por completo la landing de Beaconex como sitio Next.js desplegable en Vercel: personalidad “estudio moderno”, buenas prácticas (a11y, SEO, estructura), y conversión dual (agendar llamada + formulario).

## Decisions locked

| Tema | Decisión |
|------|----------|
| Alcance | Rediseño completo + prácticas + deploy |
| Personalidad | Estudio moderno — creativo, ágil, cercano |
| Stack | Next.js App Router + TypeScript + CSS Modules |
| Marca visual | Desde cero (nueva paleta y tipografía) |
| Contenido | Conservar 3 servicios y datos de empresa; reescribir headlines y textos |
| Conversión | CTA primario: agendar; alternativo: formulario |
| Agenda | Placeholder `NEXT_PUBLIC_CALENDAR_URL` |
| Formulario | API Route → Formspree vía `FORMSPREE_ID` |

## Page structure

Single route `/`:

1. **Nav** — logo, anclas, CTA Agendar  
2. **Hero** — marca dominante, 1 headline, 1 frase, CTAs (Agendar / Ver servicios); full-bleed; sin cards, badges flotantes ni stats  
3. **Servicios** — Presencia Digital, Transformación Operativa, CTO Externo  
4. **Cómo trabajamos** — 3–4 pasos del proceso  
5. **Por qué Beaconex** — diferenciadores + datos empresa  
6. **Contacto** — agenda (primario) + formulario + email/ubicación  
7. **Footer** — marca, links, copyright  

## Visual direction

**Atmosphere:** clara, con profundidad (gradientes + textura sutil). No dark-mode genérico ni azul SaaS plantilla.

| Token | Hex | Uso |
|-------|-----|-----|
| `--ink` | `#0C1222` | Texto / marca |
| `--paper` | `#F7F4EF` | Fondo base (+ velos) |
| `--signal` | `#E85D04` | Acento CTA |
| `--signal-deep` | `#C44D03` | Hover |
| `--mist` | `#EDE8E0` | Superficies |
| `--line` | `#D6CFC4` | Separadores |
| `--sky` | `#1B6B7A` | Acento secundario |

**Typography:** Syne (display/marca) + Source Sans 3 (cuerpo) vía `next/font`.

**Layout notes:** hero editorial full-bleed; servicios en layout editorial (número + texto), no grid de cards con sombra; 2–3 motions (hero entrance, nav scroll, CTA hover).

## Copy tone

Cercana y concreta. Sin jerga vacía. CTAs: “Agendar llamada” / “Enviar mensaje”. Segunda persona o “nosotros” activo.

**Company data to preserve:**
- Beaconex S.A.S. — Bello, Antioquia, Colombia  
- Email: hola@beaconex-solutions.com  
- Domain: https://www.beaconex-solutions.com  
- Servicios: Presencia Digital, Transformación Operativa (más solicitado), CTO Externo  
- Diferenciadores: ciberseguridad integrada, enfoque en resultados, entregas puntuales  
- Stack tags (referencia): React, Node.js, Shopify, Python, AWS, IA/ML, Ciberseguridad  

## Technical architecture

```
app/
  layout.tsx
  page.tsx
  globals.css
  robots.ts
  sitemap.ts
  api/contact/route.ts
components/
  Nav.tsx + Nav.module.css
  Hero.tsx + Hero.module.css
  Services.tsx + Services.module.css
  Process.tsx + Process.module.css
  Why.tsx + Why.module.css
  Contact.tsx + Contact.module.css
  Footer.tsx + Footer.module.css
lib/
  site.ts
.env.example
```

**Env vars:**
- `NEXT_PUBLIC_CALENDAR_URL` — link de agenda (placeholder vacío → CTA deshabilitado o mailto fallback documentado)
- `FORMSPREE_ID` — ID Formspree (server-only)
- `NEXT_PUBLIC_SITE_URL` — canonical / OG (default `https://www.beaconex-solutions.com`)

**Contact API:** `POST /api/contact` con JSON `{ nombre, empresa?, email, servicio?, mensaje }`. Valida campos requeridos; reenvía a Formspree; responde 200/400/502. Cliente muestra estado enviando / éxito / error.

**Calendar CTA:** si `NEXT_PUBLIC_CALENDAR_URL` está definido, abre en nueva pestaña (`rel="noopener noreferrer"`); si no, el botón apunta a `#contacto` o muestra el formulario como destino.

**A11y / SEO:**
- Menú móvil con botón y `aria-expanded` / `aria-controls`
- Skip link opcional; focus visible; SVG decorativos `aria-hidden`
- Metadata Open Graph + Twitter; favicon; `robots.txt` + `sitemap.xml`

**Legacy:** el `index.html` monolítico actual se retira del root (o se mueve a `legacy/`) al migrar a Next.js para no confundir el deploy.

## Out of scope

- CMS / blog  
- Autenticación  
- Embebido real de Calendly/Cal.com (solo URL externa)  
- i18n (solo español)  
- Casos de éxito / FAQ (no incluidos en estructura aprobada)  

## Success criteria

- Landing responsive desktop + móvil con nav usable en móvil  
- Look alineado a paleta/tipografía del spec  
- Formulario funcional con Formspree configurado (o mensaje claro si falta env)  
- CTA agenda cableado a env var  
- Deployable en Vercel con `npm run build` en verde  
