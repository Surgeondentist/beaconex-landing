"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import {
  getScheduleHref,
  isExternalSchedule,
  siteConfig,
} from "@/lib/site";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const scheduleHref = getScheduleHref();
  const external = isExternalSchedule();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`container ${styles.nav}`} aria-label="Principal">
        <a href="#inicio" className={styles.logo} onClick={close}>
          <Image
            src="/branding/Beaconex_BX_Transparent_600.png"
            alt="Beaconex"
            width={48}
            height={48}
            className={styles.logoIcon}
            priority
          />
          <span className={`font-display ${styles.logoText}`}>Beaconex</span>
        </a>

        <ul className={styles.links}>
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a
              className={`btn btn-primary ${styles.cta}`}
              href={scheduleHref}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Evaluación
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.bar} data-open={open} />
          <span className={styles.bar} data-open={open} />
        </button>
      </nav>

      <div
        id={menuId}
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        hidden={!open}
      >
        <ul>
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="btn btn-primary"
              href={scheduleHref}
              onClick={close}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Evaluación
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
