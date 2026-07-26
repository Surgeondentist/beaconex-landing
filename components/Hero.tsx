import {
  getScheduleHref,
  isExternalSchedule,
  siteConfig,
} from "@/lib/site";
import styles from "./Hero.module.css";

const integrations = [
  { id: "shopify", label: "Shopify", x: "78%", y: "18%" },
  { id: "google", label: "Google", x: "92%", y: "38%" },
  { id: "whatsapp", label: "WhatsApp", x: "88%", y: "68%" },
  { id: "aws", label: "AWS", x: "68%", y: "82%" },
  { id: "react", label: "React", x: "52%", y: "72%" },
] as const;

function IntegrationIcon({ id }: { id: (typeof integrations)[number]["id"] }) {
  switch (id) {
    case "shopify":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#95BF47"
            d="M16.7 5.3c-.1 0-.3 0-.4.1l-1.3.8C14.8 4.4 14 3.5 12.8 3.5c-.1 0-.2 0-.3 0C11.6 2.2 10.5 1.7 9.4 1.7 7 1.7 5.4 3.4 4.7 6.3L2.7 6.9c-.4.1-.5.2-.5.6L1 19.2c0 .2.1.3.3.4l3.3 1 .02.01 2 .6c.2.5.4.9.6 1.2.1.1.2.2.3.2h.1c.3 0 .5-.2.8-.5.1-.1.2-.3.4-.6 1.5.4 2.7.7 3.4.7.2 0 .3 0 .4-.1.1-.1.2-.2.3-.5l.02-.1 2.1-9.3.01-.03c.1-.6.2-.9 0-1.1-.2-.2-.6-.2-1.2-.2h-.3l.9-3.9c0-.2 0-.4-.1-.5-.1-.1-.3-.1-.6-.1z"
          />
        </svg>
      );
    case "google":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M12 11v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.8-4.1 2.8-7 0-.7-.1-1.3-.2-1.9H12z" />
          <path fill="#34A853" d="M6.6 14.3l-.9.7-2.7 2.1C4.8 20.1 8.1 22 12 22c2.7 0 5-.9 6.6-2.4l-3.1-2.4c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3z" />
          <path fill="#4A90E2" d="M3 7.1C2.4 8.3 2 9.6 2 11s.4 2.7 1 3.9l3.6-2.8c-.2-.6-.3-1.2-.3-1.1 0-.6.1-1.2.3-1.8L3 7.1z" />
          <path fill="#FBBC05" d="M12 5.1c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.1 14.7 1 12 1 8.1 1 4.8 2.9 3 5.9l3.6 2.8C7.4 6.9 9.4 5.1 12 5.1z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#25D366"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#FF9900"
            d="M6.8 16.4c0 .2.2.3.4.2 1.4-.5 2.5-.7 3.7-.7 1.2 0 2.4.2 3.7.7.2.1.4 0 .4-.2v-1.2c0-.1-.1-.2-.2-.3-1.3-.6-2.6-.9-3.9-.9s-2.6.3-3.9.9c-.1.1-.2.2-.2.3v1.2zm10.5-2.1c.9.4 1.5 1 1.5 1.9 0 1.3-1.3 2.3-3.5 2.7l-.5.1v1.4l.5-.1c3.1-.5 5-2.1 5-4.1 0-1.4-1-2.5-2.5-3.1l-.5-.2v1.5l.5.1c.6.2 1 .5 1 .9 0 .4-.3.7-.9.9l-.1.1zm-13.7.2c-.9.3-1.4.8-1.4 1.5 0 1.1 1.2 1.9 3.1 2.2l.5.1v1.4l-.5-.1C2.7 19.1.8 17.6.8 15.6c0-1.3.9-2.3 2.3-2.9l.5-.2v1.5l-.5.1c-.5.2-.8.4-.8.7 0 .4.3.7.8.8l.1.1z"
          />
          <path
            fill="#FFFFFF"
            d="M13.2 6.2c0-.9-.6-1.4-1.6-1.4H9.1v6.4h1.3V9.4h1c1.2 0 1.8-.6 1.8-1.6v-1.6zm-1.3 1.4c0 .4-.2.6-.7.6h-.8V5.9h.8c.5 0 .7.2.7.6v1.1zM16.4 4.8h-1.3v6.4h1.3V4.8zm3.3 4.4c-.4 0-.7-.1-.9-.3l-.1.3h-1.2V4.8h1.3v3.5c.1.1.4.2.6.2.5 0 .7-.3.7-.8V4.8h1.3v3.3c0 1.4-.7 2.1-1.7 2.1z"
          />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <g fill="none" stroke="#61DAFB" strokeWidth="1.2">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

export default function Hero() {
  const { hero } = siteConfig;
  const scheduleHref = getScheduleHref();
  const external = isExternalSchedule();

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.stage} aria-hidden="true">
        <svg className={styles.streams} viewBox="0 0 800 600" fill="none">
          <defs>
            <linearGradient id="neonA" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0" />
              <stop offset="45%" stopColor="#3385FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="neonB" x1="100%" y1="0%" x2="40%" y2="80%">
              <stop offset="0%" stopColor="#25D366" stopOpacity="0" />
              <stop offset="50%" stopColor="#3385FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Incoming data from left/background into core */}
          <path
            className={`${styles.stream} ${styles.streamIn1}`}
            d="M40 120 C 180 90, 280 160, 420 250"
            stroke="url(#neonA)"
            strokeWidth="1.6"
            filter="url(#glow)"
          />
          <path
            className={`${styles.stream} ${styles.streamIn2}`}
            d="M20 320 C 160 300, 260 280, 410 270"
            stroke="url(#neonA)"
            strokeWidth="1.4"
            filter="url(#glow)"
          />
          <path
            className={`${styles.stream} ${styles.streamIn3}`}
            d="M60 480 C 200 420, 300 340, 415 290"
            stroke="url(#neonA)"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <path
            className={`${styles.stream} ${styles.streamIn4}`}
            d="M120 60 C 240 120, 320 200, 430 255"
            stroke="url(#neonB)"
            strokeWidth="1.2"
            filter="url(#glow)"
          />

          {/* Outgoing to integrations */}
          <path
            className={`${styles.stream} ${styles.streamOut1}`}
            d="M500 240 C 560 160, 620 110, 700 90"
            stroke="url(#neonA)"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <path
            className={`${styles.stream} ${styles.streamOut2}`}
            d="M520 270 C 600 250, 680 240, 760 230"
            stroke="url(#neonB)"
            strokeWidth="1.4"
            filter="url(#glow)"
          />
          <path
            className={`${styles.stream} ${styles.streamOut3}`}
            d="M510 300 C 590 360, 670 410, 740 450"
            stroke="url(#neonA)"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <path
            className={`${styles.stream} ${styles.streamOut4}`}
            d="M470 320 C 520 400, 560 470, 600 530"
            stroke="url(#neonB)"
            strokeWidth="1.3"
            filter="url(#glow)"
          />
          <path
            className={`${styles.stream} ${styles.streamOut5}`}
            d="M430 310 C 450 380, 430 450, 400 500"
            stroke="url(#neonA)"
            strokeWidth="1.2"
            filter="url(#glow)"
          />
        </svg>

        <div className={styles.core}>
          <div className={styles.coreRing} />
          <div className={styles.coreRingSlow} />
          <div className={styles.coreSphere}>
            <span className={styles.coreHighlight} />
          </div>
          <div className={styles.corePulse} />
        </div>

        {integrations.map((item) => (
          <div
            key={item.id}
            className={styles.node}
            style={{ left: item.x, top: item.y }}
            title={item.label}
          >
            <IntegrationIcon id={item.id} />
            <span className={styles.nodeLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        <p className={`font-mono ${styles.brand}`}>{hero.brand}</p>
        <h1 id="hero-title" className={`font-display ${styles.title}`}>
          <span>{hero.line1}</span>
          <span className={styles.titleAccent}>{hero.line2}</span>
        </h1>
        <p className={styles.sub}>{hero.sub}</p>
        <div className={styles.ctas}>
          <a
            className="btn btn-primary"
            href={scheduleHref}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {hero.primaryCta}
          </a>
          <a className="btn btn-ghost-light" href="#servicios">
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
