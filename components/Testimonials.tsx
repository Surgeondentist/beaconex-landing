import { siteConfig } from "@/lib/site";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const { testimonialsIntro, testimonials } = siteConfig;

  return (
    <section id="opiniones" className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <p className="section-label">{testimonialsIntro.label}</p>
          <h2 className="section-title">{testimonialsIntro.title}</h2>
        </header>

        <div className={styles.grid}>
          {testimonials.map((item) => (
            <figure key={item.name} className={styles.card}>
              <blockquote className={styles.quote}>“{item.quote}”</blockquote>
              <figcaption>
                <p className={`font-display ${styles.name}`}>{item.name}</p>
                <p className={styles.role}>{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
