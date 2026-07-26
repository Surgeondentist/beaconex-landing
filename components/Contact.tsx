"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getWhatsAppHref,
  isServiceId,
  siteConfig,
  type ServiceId,
} from "@/lib/site";
import styles from "./Contact.module.css";

type Status = "idle" | "loading" | "success" | "error";

function ContactForm() {
  const { contactIntro, services, email, location, whatsappNumber } = siteConfig;
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [servicio, setServicio] = useState("");

  useEffect(() => {
    const requested = searchParams.get("servicio");
    if (isServiceId(requested) || requested === "otro") {
      setServicio(requested);
    }
  }, [searchParams]);

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
      setServicio("");
    } catch {
      setStatus("error");
      setError("No se pudo enviar. Intenta de nuevo.");
    }
  }

  const whatsappHref = getWhatsAppHref(
    isServiceId(servicio) ? (servicio as ServiceId) : undefined,
  );

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={styles.label}>{contactIntro.label}</p>
          <h2 className={`font-display ${styles.title}`}>
            <span>{contactIntro.titleLine1}</span>
            <span className={styles.titleAccent}>{contactIntro.titleLine2}</span>
          </h2>
          <p className={styles.sub}>{contactIntro.sub}</p>

          {whatsappNumber ? (
            <a
              className={styles.whatsapp}
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.whatsappIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              {contactIntro.whatsappCta}
            </a>
          ) : null}

          <div className={styles.meta}>
            <a href={`mailto:${email}`}>{email}</a>
            <span>{location}</span>
          </div>
        </div>

        <div className={styles.formPanel} id="formulario-contacto">
          <p className={styles.formLabel}>{contactIntro.formLabel}</p>
          {status === "success" ? (
            <p className={styles.success} role="status">
              Señal recibida. Te escribimos en menos de 24 horas.
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
                    placeholder="Tu empresa"
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
                <label htmlFor="servicio">¿Qué necesitas?</label>
                <select
                  id="servicio"
                  name="servicio"
                  value={servicio}
                  onChange={(event) => setServicio(event.target.value)}
                >
                  <option value="">Elige un paquete</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.titleLines.join(" ")}
                    </option>
                  ))}
                  <option value="otro">Otro / Aún no lo sé</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="mensaje">El reto *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  placeholder="Qué quieres lograr, en qué punto estás y qué te frena hoy…"
                />
              </div>

              {status === "error" ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className={styles.submit}
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

export default function Contact() {
  return (
    <Suspense fallback={<section id="contacto" className={styles.section} />}>
      <ContactForm />
    </Suspense>
  );
}
