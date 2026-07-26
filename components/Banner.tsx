import {
  getScheduleHref,
  isExternalSchedule,
  siteConfig,
} from "@/lib/site";
import styles from "./Banner.module.css";

export default function Banner() {
  const { banner } = siteConfig;
  const scheduleHref = getScheduleHref();
  const external = isExternalSchedule();

  return (
    <section className={styles.banner} aria-labelledby="banner-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="banner-title" className={`font-display ${styles.title}`}>
          <span>{banner.line1}</span>
          <span className={styles.accent}>{banner.line2}</span>
        </h2>
        <a
          className="btn btn-light"
          href={scheduleHref}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {banner.cta}
        </a>
      </div>
    </section>
  );
}
