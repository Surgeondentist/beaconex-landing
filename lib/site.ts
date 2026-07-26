export const siteConfig = {
  name: "Beaconex",
  legalName: "Beaconex S.A.S.",
  tagline: "Soluciones Tecnológicas",
  email: "jhon@beaconex-solutions.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.beaconex-solutions.com",
  location: "Bello, Antioquia — Colombia",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? "",
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  whatsappDefaultMessage:
    "Hola Beaconex, quiero solicitar la evaluación tecnológica gratuita.",
  navLinks: [
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ],
  hero: {
    brand: "Beaconex",
    titleLines: [
      "Moderniza tu empresa",
      "en cualquier momento y lugar",
    ],
    sub: "En Beaconex, impulsamos la transformación digital de empresas que quieren operar con más claridad. Evaluamos tu presencia digital, procesos y automatizaciones, y construimos soluciones a medida para que tu equipo avance con menos fricción.",
    primaryCta: "Pedir evaluación gratuita",
    secondaryCta: "Ver servicios",
  },
  servicesIntro: {
    label: "Servicios",
    title: "Soluciones digitales",
    sub: "Desde tu primera presencia en línea hasta acompañamiento tecnológico continuo.",
  },
  services: [
    {
      id: "presencia-digital",
      titleLines: ["Presencia", "Digital"],
      region: "Colombia & LATAM",
      featured: false,
      summary:
        "Tu negocio en internet, listo para vender y generar confianza desde el primer contacto. Sitios y landings a medida con foco en conversión.",
      features: [
        "Landing o sitio web a medida",
        "Consultoría y optimización Shopify",
        "Apps e integraciones Shopify",
        "Analytics y configuración de dominio",
      ],
      cta: "Ver más",
    },
    {
      id: "transformacion",
      titleLines: ["Transformación", "Operativa"],
      region: "Más solicitado",
      featured: true,
      summary:
        "Digitalizamos tus procesos para que operes con claridad: menos fricción, más sistema y automatizaciones que sí se usan.",
      features: [
        "Diagnóstico de procesos actuales",
        "Google Workspace y CRM",
        "Automatizaciones e integraciones",
        "Apps web a medida",
        "1 mes de soporte post-entrega",
      ],
      cta: "Ver más",
    },
    {
      id: "aliado-tecnologico",
      titleLines: ["Aliado", "Tecnológico"],
      region: "Retainer mensual",
      featured: false,
      summary:
        "Acompañamiento tecnológico cercano para priorizar, decidir y ejecutar sin el costo de un equipo interno completo.",
      features: [
        "Estrategia y hoja de ruta",
        "Revisión de seguridad y riesgos",
        "Arquitectura y decisiones tech",
        "Supervisión de equipos y proveedores",
        "Canal directo continuo",
      ],
      cta: "Ver más",
    },
  ],
  processIntro: {
    label: "Cómo trabajamos",
    title: "Estamos en cada detalle",
    sub: "Un proceso claro, sin sorpresas.",
  },
  processSteps: [
    {
      num: "01",
      title: "Diagnosticar",
      body: "Entendemos tu operación, restricciones y metas de negocio.",
    },
    {
      num: "02",
      title: "Diseñar",
      body: "Priorizamos el camino con más impacto y menos riesgo.",
    },
    {
      num: "03",
      title: "Construir",
      body: "Entregamos por iteraciones, con feedback continuo.",
    },
    {
      num: "04",
      title: "Acompañar",
      body: "Soporte y mejoras para que la solución se sostenga.",
    },
  ],
  whyIntro: {
    label: "Por qué Beaconex",
    title: "Técnicos con mirada de negocio",
    sub: "Construimos con criterio: claridad en el alcance, comunicación directa y soluciones que tu equipo pueda sostener.",
  },
  whyPoints: [
    {
      title: "Seguridad desde el inicio",
      body: "Integramos buenas prácticas de seguridad en el diseño, no como un parche al final.",
    },
    {
      title: "Enfoque en resultados",
      body: "Priorizamos lo que mueve el negocio: menos ruido, más entregables útiles.",
    },
    {
      title: "Comunicación clara",
      body: "Proceso visible, compromisos explícitos y seguimiento cercano en cada etapa.",
    },
  ],
  techTags: [
    "React",
    "Node.js",
    "Shopify",
    "Python",
    "AWS",
    "IA / ML",
    "Ciberseguridad",
  ],
  stats: [
    { value: "B2B", label: "Enfoque empresarial" },
    { value: "SAS", label: "Empresa formal en Colombia" },
    { value: "24h", label: "Respuesta a contactos" },
    { value: "1:1", label: "Acompañamiento cercano" },
  ],
  banner: {
    line1: "Empieza con",
    line2: "Claridad",
    cta: "Evaluación gratuita",
  },
  contactIntro: {
    label: "Evaluación gratuita",
    titleLine1: "Cuéntanos",
    titleLine2: "el reto",
    sub: "Agenda tu evaluación sin costo. Te respondemos en menos de 24 horas — por formulario o WhatsApp.",
    formCta: "Solicitar evaluación",
    whatsappCta: "Evaluación por WhatsApp",
    formLabel: "Deja tu mensaje",
  },
} as const;

export type ServiceId = (typeof siteConfig.services)[number]["id"];

const serviceIds = siteConfig.services.map((service) => service.id);

export function isServiceId(value: string | null | undefined): value is ServiceId {
  return Boolean(value && serviceIds.includes(value as ServiceId));
}

export function getServiceFormHref(serviceId?: ServiceId | "otro"): string {
  if (!serviceId) return "#contacto";
  return `/?servicio=${serviceId}#contacto`;
}

export function getScheduleHref(): string {
  if (siteConfig.calendarUrl) return siteConfig.calendarUrl;
  return "#contacto";
}

export function isExternalSchedule(): boolean {
  return Boolean(siteConfig.calendarUrl);
}

export function getWhatsAppHref(serviceId?: ServiceId): string {
  const number = siteConfig.whatsappNumber;
  if (!number) return "#contacto";

  let message: string = siteConfig.whatsappDefaultMessage;
  if (serviceId) {
    const service = siteConfig.services.find((item) => item.id === serviceId);
    if (service) {
      const name = service.titleLines.join(" ");
      message = `Hola Beaconex, me interesa el paquete ${name}. ¿Me pueden orientar?`;
    }
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getServiceWhatsAppLinks() {
  return siteConfig.services.map((service) => ({
    id: service.id,
    name: service.titleLines.join(" "),
    formUrl: `${siteConfig.url}${getServiceFormHref(service.id)}`,
    whatsappUrl: getWhatsAppHref(service.id),
  }));
}
