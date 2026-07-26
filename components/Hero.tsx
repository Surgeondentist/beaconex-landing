import {
  getScheduleHref,
  isExternalSchedule,
  siteConfig,
} from "@/lib/site";
import HeroStage from "@/components/HeroStage";
import styles from "./Hero.module.css";

export default function Hero() {
  const { hero } = siteConfig;
  const scheduleHref = getScheduleHref();
  const external = isExternalSchedule();

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.gridBg} aria-hidden="true" />
      <HeroStage />

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
