import { siteConfig } from "@/lib/site";
import styles from "./Services.module.css";

export default function Services() {
  const { servicesIntro, services } = siteConfig;

  return (
    <section id="servicios" className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <p className="section-label">{servicesIntro.label}</p>
          <h2 className="section-title">{servicesIntro.title}</h2>
          <p className="section-sub">{servicesIntro.sub}</p>
        </header>

        <div className={styles.grid}>
          {services.map((service) => (
            <article
              key={service.id}
              className={`${styles.card} ${service.featured ? styles.featured : ""}`}
            >
              <p className={styles.region}>{service.region}</p>
              <h3 className={`font-display ${styles.name}`}>
                {service.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p className={styles.summary}>{service.summary}</p>
              <ul className={styles.features}>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className={styles.more} href="#contacto">
                {service.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
