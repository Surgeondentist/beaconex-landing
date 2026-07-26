import Image from "next/image";
import { siteConfig } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Image
            src="/branding/Beaconex_BX_Transparent_600.png"
            alt="Beaconex"
            width={56}
            height={56}
            className={styles.logoIcon}
          />
          <p className={`font-display ${styles.logoText}`}>Beaconex</p>
        </div>
        <p className={styles.meta}>
          {siteConfig.tagline} · {siteConfig.location}
        </p>
        <p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
        <p className={styles.copy}>
          © {year} {siteConfig.legalName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
