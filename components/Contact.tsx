"use client";

import { FormEvent, useState } from "react";
import {
  getScheduleHref,
  isExternalSchedule,
  siteConfig,
} from "@/lib/site";
import styles from "./Contact.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { contactIntro, services, email, url, location } = siteConfig;
  const scheduleHref = getScheduleHref();
  const external = isExternalSchedule();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      nombre: String(data.get("nombre") ?? ""),
      empresa: String(data.get("empresa") ?? ""),
      email: String(data.get("email") ?? ""),
      servicio: String(data.get("servicio") ?? ""),
      mensaje: String(data.get("mensaje") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "No se pudo enviar. Intenta de nuevo.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("No se pudo enviar. Intenta de nuevo.");
    }
  }

  return (
    <section id="contacto" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="section-label">{contactIntro.label}</p>
          <h2 className="section-title">{contactIntro.title}</h2>
          <p className="section-sub">{contactIntro.sub}</p>

          <a
            className={`btn btn-primary ${styles.schedule}`}
            href={scheduleHref}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {contactIntro.scheduleCta}
          </a>

          <ul className={styles.info}>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <a href={url} target="_blank" rel="noopener noreferrer">
                beaconex-solutions.com
              </a>
            </li>
            <li>
              <span>{location}</span>
            </li>
          </ul>
        </div>

        <div className={styles.formWrap}>
          {status === "success" ? (
            <p className={styles.success} role="status">
              Mensaje enviado. Te contactaremos en menos de 24 horas.
            </p>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="tu@empresa.com"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="servicio">¿En qué podemos ayudarte?</label>
                <select id="servicio" name="servicio" defaultValue="">
                  <option value="">Selecciona un servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.titleLines.join(" ")}
                    </option>
                  ))}
                  <option value="otro">Otro / No estoy seguro</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="mensaje">Cuéntanos tu proyecto *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  placeholder="Describe brevemente qué necesitas o el reto que quieres resolver..."
                />
              </div>

              {status === "error" ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando..." : contactIntro.formCta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
