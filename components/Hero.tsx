import Image from "next/image";
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

      <div className={styles.hexLeft} aria-hidden="true">
        <div className={styles.hex} />
        <div className={styles.hexGlow} />
      </div>

      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <div className={styles.copyPanel}>
            <p className={`font-display ${styles.brand}`}>{hero.brand}</p>
            <h1 id="hero-title" className={`font-display ${styles.title}`}>
              {hero.titleLines.map((line) => (
                <span key={line} className={styles.titleLine}>
                  {line}
                </span>
              ))}
            </h1>
            <p className={styles.sub}>{hero.sub}</p>
          </div>
          <div className={styles.ctas}>
            <a
              className={`btn btn-light ${styles.primaryCta}`}
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

        <div className={styles.visual} aria-hidden="true">
          <Image
            src="/hero/evaluation-team.png"
            alt=""
            width={984}
            height={884}
            className={styles.team}
            priority
          />
        </div>
      </div>
    </section>
  );
}
