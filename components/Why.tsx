import { siteConfig } from "@/lib/site";
import styles from "./Why.module.css";

export default function Why() {
  const { whyIntro, whyPoints, stats, techTags, legalName, location } =
    siteConfig;

  return (
    <section id="nosotros" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.label}>{whyIntro.label}</p>
          <h2 className={`font-display ${styles.title}`}>{whyIntro.title}</h2>
          <p className={styles.sub}>{whyIntro.sub}</p>
          <ul className={styles.points}>
            {whyPoints.map((point) => (
              <li key={point.title} className={styles.point}>
                <span className={styles.check} aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointBody}>{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.panel} aria-label="Datos de Beaconex">
          <h3 className={`font-display ${styles.panelTitle}`}>{legalName}</h3>
          <p className={styles.panelSub}>{location}</p>
          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <p className={`font-display ${styles.statValue}`}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
          <ul className={styles.tags}>
            {techTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
