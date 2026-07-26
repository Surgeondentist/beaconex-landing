import { siteConfig } from "@/lib/site";
import styles from "./Process.module.css";

export default function Process() {
  const { processIntro, processSteps } = siteConfig;

  return (
    <section id="proceso" className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <p className="section-label">{processIntro.label}</p>
          <h2 className="section-title">{processIntro.title}</h2>
          <p className="section-sub">{processIntro.sub}</p>
        </header>

        <ol className={styles.steps}>
          {processSteps.map((step) => (
            <li key={step.num} className={styles.step}>
              <span className={`font-display ${styles.num}`}>{step.num}</span>
              <h3 className={`font-display ${styles.title}`}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
