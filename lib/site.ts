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
    "Hola Beaconex, me gustaría recibir información sobre sus servicios.",
  navLinks: [
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#opiniones", label: "Opiniones" },
    { href: "#contacto", label: "Contacto" },
  ],
  hero: {
    brand: "Beaconex",
    line1: "Tecnología",
    line2: "a Medida",
    sub: "Somos expertos en software, transformación digital y marketing tecnológico. Creamos soluciones atractivas y modernas que capturan la esencia de cada negocio.",
    primaryCta: "Agendar llamada",
    secondaryCta: "Ver servicios",
  },
  servicesIntro: {
    label: "Servicios",
    title: "Soluciones digitales",
    sub: "Desde tu primera presencia en línea hasta liderazgo tecnológico continuo.",
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
      id: "cto-externo",
      titleLines: ["CTO", "Externo"],
      region: "Retainer mensual",
      featured: false,
      summary:
        "Liderazgo tecnológico de alto nivel sin el costo de un CTO de tiempo completo. Estrategia, seguridad y decisiones con criterio.",
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
    label: "Casos de enfoque",
    title: "Por qué elegir Beaconex",
    sub: "Entendemos que tu presencia digital es clave para el éxito. Ya sea lanzar algo nuevo, mejorar lo existente o acompañarte en el día a día, estamos para ayudarte.",
  },
  whyPoints: [
    {
      title: "Experiencia comprobada",
      body: "Años construyendo software, ecommerce y operaciones digitales para empresas B2B.",
    },
    {
      title: "Diseño con intención",
      body: "Interfaces claras, centradas en el usuario y alineadas a tu marca — no plantillas genéricas.",
    },
    {
      title: "Optimización constante",
      body: "Seguridad, rendimiento y evolución continua después del lanzamiento.",
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
    { value: "3+", label: "Años de experiencia" },
    { value: "B2B", label: "Enfoque empresarial" },
    { value: "LATAM+", label: "Clientes internacionales" },
    { value: "100%", label: "Comprometidos" },
  ],
  testimonialsIntro: {
    label: "Estamos en cada detalle",
    title: "Nuestros clientes lo dicen",
  },
  testimonials: [
    {
      name: "Alejandro",
      role: "Operaciones · Medellín",
      quote:
        "Necesitábamos digitalizar procesos que vivían en Excel y WhatsApp. Beaconex no solo entregó la herramienta: ordenó la operación. Hoy respondemos más rápido y con menos errores.",
    },
    {
      name: "Christian",
      role: "Ecommerce · Miami",
      quote:
        "The Beaconex team rebuilt our Shopify setup and connected the pieces we were missing. Fast, clear, and focused on results — exactly what we needed.",
    },
    {
      name: "Rodrigo",
      role: "Dirección · Santiago",
      quote:
        "Como CTO externo nos ayudaron a priorizar la hoja de ruta y a tomar mejores decisiones tecnológicas. El proceso fue ágil y ya vemos más consultas cualificadas.",
    },
  ],
  banner: {
    line1: "Construimos",
    line2: "Tus Ideas",
    cta: "Agendar llamada",
  },
  contactIntro: {
    label: "Contacto",
    title: "¿Listo para el siguiente paso?",
    sub: "Completa el formulario o escríbenos por WhatsApp. Respondemos en menos de 24 horas.",
    scheduleCta: "Ir al formulario",
    formCta: "Enviar mensaje",
    whatsappCta: "Escribe",
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
