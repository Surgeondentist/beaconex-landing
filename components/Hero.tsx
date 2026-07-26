import Image from "next/image";
import {
  getScheduleHref,
  isExternalSchedule,
  siteConfig,
} from "@/lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  const { hero } = siteConfig;
  const scheduleHref = getScheduleHref();
  const external = isExternalSchedule();

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={`container ${styles.layout}`}>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.hex} />
          <div className={styles.hexGlow} />
          <Image
            src="/hero/evaluation-team.png"
            alt=""
            width={984}
            height={884}
            className={styles.team}
            priority
          />
        </div>

        <div className={styles.content}>
          <p className={`font-display ${styles.brand}`}>{hero.brand}</p>
          <h1 id="hero-title" className={`font-display ${styles.title}`}>
            <span>{hero.line1}</span>
            <span className={styles.titleAccent}>{hero.line2}</span>
          </h1>
          <p className={styles.sub}>{hero.sub}</p>
          <div className={styles.ctas}>
            <a
              className={`btn btn-primary ${styles.primaryCta}`}
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
      </div>
    </section>
  );
}
