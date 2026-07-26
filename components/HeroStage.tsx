"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type Integration = {
  id: string;
  label: string;
  angle: number;
  distance: number;
  color: string;
};

/* Ángulos cada ~36° para evitar solapes (Facebook -148° ≈ AWS 208°). */
const integrations: Integration[] = [
  { id: "instagram", label: "Instagram", angle: -90, distance: 1.04, color: "#E4405F" },
  { id: "shopify", label: "Shopify", angle: -54, distance: 1, color: "#95BF47" },
  { id: "google", label: "Google", angle: -18, distance: 1.06, color: "#4285F4" },
  { id: "whatsapp", label: "WhatsApp", angle: 18, distance: 1, color: "#25D366" },
  { id: "n8n", label: "n8n", angle: 54, distance: 1.08, color: "#EA4B71" },
  { id: "zapier", label: "Zapier", angle: 90, distance: 1, color: "#FF4A00" },
  { id: "hubspot", label: "HubSpot", angle: 126, distance: 1.05, color: "#FF7A59" },
  { id: "salesforce", label: "Salesforce", angle: 162, distance: 1.02, color: "#00A1E0" },
  { id: "facebook", label: "Facebook", angle: 198, distance: 1, color: "#1877F2" },
  { id: "aws", label: "AWS", angle: 234, distance: 1.04, color: "#FF9900" },
];

function Icon({ id, color }: { id: string; color: string }) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (id) {
    case "shopify":
      return (
        <svg {...common}>
          <path fill={color} d="M15.2 4.2c-.2 0-.4 0-.5.1l-1.6 1.1C13 3.4 12.1 2.4 10.7 2.4h-.2C9.4 1.1 8.1.6 6.9.6 4.2.6 2.5 2.5 1.7 5.8L-.2 6.5c-.4.1-.5.2-.5.6L-2 19.6c0 .2.1.3.3.4l3.6 1.1 2.2.6c.2.5.4 1 .6 1.3.1.1.2.2.4.2h.1c.3 0 .6-.2.9-.6.3.1 1.8.5 3.5.5.2 0 .4 0 .5-.1.1-.1.2-.2.3-.5L12.1 11c.2-.6.2-1 0-1.2-.2-.2-.6-.3-1.3-.3H10l1-4.3c.1-.3 0-.5-.1-.6-.1-.1-.3-.2-.6-.2l-1.1-.2z" transform="translate(5 1) scale(.78)" />
        </svg>
      );
    case "google":
      return (
        <svg {...common}>
          <path fill="#EA4335" d="M12 11v3.2h5c-.2 1.1-.8 2.1-1.7 2.7l2.8 2.2C20.3 17.4 21.2 15 21.2 12c0-.6 0-1.2-.2-1.8H12z" />
          <path fill="#34A853" d="M6.7 13.7 5.9 14.3 3.5 16.2C5.2 19.5 8.4 21.5 12 21.5c2.5 0 4.6-.8 6.1-2.2l-2.8-2.2c-.8.5-1.8.8-3.3.8-2.5 0-4.6-1.7-5.3-4.2z" />
          <path fill="#FBBC05" d="M3.5 7.1C2.9 8.2 2.5 9.5 2.5 11s.4 2.8 1 4l3.2-2.5c-.2-.6-.3-1.2-.3-1.5 0-.5.1-1.1.3-1.6L3.5 7.1z" />
          <path fill="#4285F4" d="M12 5.5c1.4 0 2.6.5 3.5 1.4l2.6-2.6C16.6 2.5 14.5 1.5 12 1.5 8.4 1.5 5.2 3.5 3.5 6.8l3.2 2.5C7.4 7.1 9.5 5.5 12 5.5z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path fill={color} d="M17.5 14.4c-.3-.2-1.8-.9-2-.1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.3zM12.1 21.8h0a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.4A9.9 9.9 0 0 1 2.2 11.9C2.2 6.4 6.7 2 12.1 2a9.8 9.8 0 0 1 7 2.9 9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.9-9.9 9.9z" />
        </svg>
      );
    case "n8n":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.2" fill={color} />
          <circle cx="12" cy="6.5" r="2.2" fill={color} />
          <circle cx="18" cy="12" r="2.2" fill={color} />
          <circle cx="12" cy="17.5" r="2.2" fill={color} />
          <path stroke={color} strokeWidth="1.6" d="M7.8 11.2 10.2 7.8M14 7.8l2.2 3.2M14 16.2l2.2-3.2M7.8 12.8l2.2 3.2" />
        </svg>
      );
    case "zapier":
      return (
        <svg {...common}>
          <path fill={color} d="M12 2.5 13.8 9H21l-5.5 4 2.1 6.5L12 16.2 6.4 19.5 8.5 13 3 9h7.2L12 2.5z" />
        </svg>
      );
    case "hubspot":
      return (
        <svg {...common}>
          <circle cx="17.5" cy="6.5" r="2.2" fill={color} />
          <circle cx="7" cy="12" r="3" fill={color} />
          <circle cx="16.5" cy="16.5" r="3.4" fill={color} />
          <path stroke={color} strokeWidth="1.8" d="M9.5 10.5 15.8 7.5M9.8 14.2l3.8 1.5" />
        </svg>
      );
    case "salesforce":
      return (
        <svg {...common}>
          <path fill={color} d="M10.2 7.2c.7-.6 1.6-.9 2.6-.9 1.1 0 2.1.4 2.8 1.1.7-.4 1.5-.6 2.3-.6 2.2 0 4 1.7 4 3.9 0 .2 0 .4-.1.6 1.3.5 2.2 1.7 2.2 3.1 0 1.9-1.5 3.4-3.4 3.4-.4 0-.8-.1-1.1-.2-.6.9-1.7 1.5-2.9 1.5-.7 0-1.4-.2-1.9-.6-.6.9-1.7 1.5-2.9 1.5-1.1 0-2.1-.5-2.7-1.3-.5.2-1 .3-1.6.3-2.2 0-4-1.8-4-4 0-1.5.8-2.8 2.1-3.5-.1-.3-.1-.6-.1-.9 0-2.3 1.9-4.2 4.2-4.2 1 .1 1.9.4 2.6 1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke={color} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke={color} strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.2" fill={color} />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path fill={color} d="M14.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H8.3v3.2h2.8V22h3.4z" />
        </svg>
      );
    case "aws":
      return (
        <svg {...common}>
          <path fill={color} d="M7 15.8c0 .2.2.3.4.2 1.2-.4 2.2-.6 3.3-.6s2.1.2 3.3.6c.2.1.4 0 .4-.2v-1.1c0-.1 0-.2-.2-.3-1.2-.5-2.3-.8-3.5-.8s-2.3.3-3.5.8c-.1.1-.2.2-.2.3v1.1z" />
          <path fill="#fff" d="M12.8 7.2c0-.8-.5-1.2-1.4-1.2H9.2v5.5h1.1V9.8h.9c1.1 0 1.6-.5 1.6-1.4V7.2zm-1.1 1.2c0 .3-.2.5-.6.5h-.7V7.1h.7c.4 0 .6.2.6.5v.8zM15.5 6H14.4v5.5h1.1V6zm2.9 3.8c-.3 0-.6-.1-.8-.3l-.1.3h-1V6h1.1v3c.1.1.3.2.5.2.4 0 .6-.2.6-.7V6H19v2.8c0 1.2-.6 1.8-1.5 1.8z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="5" fill={color} />
        </svg>
      );
  }
}

function polar(angleDeg: number, distance: number, cx: number, cy: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + Math.cos(rad) * radius * distance,
    y: cy + Math.sin(rad) * radius * distance,
  };
}

const MATRIX_GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]$#@*&%ABCDEF";
const MATRIX_TOKENS = ["01", "10", "SYNC", "API", "ETL", "JSON", "CRM", "n8n", "HTTP", "SQL", "AI", "IO"];

function buildColumn(seed: number, length: number) {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    if (i % 7 === 0) {
      out += MATRIX_TOKENS[(seed + i) % MATRIX_TOKENS.length] + "\n";
    } else {
      out += MATRIX_GLYPHS[(seed * 13 + i * 7) % MATRIX_GLYPHS.length] + "\n";
    }
  }
  return out;
}

const MATRIX_COLUMNS = Array.from({ length: 14 }, (_, i) => ({
  text: buildColumn(i + 3, 28),
  delay: `${-(i * 0.45)}s`,
  duration: `${4.2 + (i % 5) * 0.7}s`,
  opacity: 0.28 + (i % 4) * 0.12,
}));

const RING_TEXT =
  "01 · SYNC · API · ETL · JSON · CRM · n8n · ZAPIER · DATA · FLOW · HTTP · SQL · AI · IO · 01 · ";

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 8, y: -12 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      // 0 at top of hero in view, increases as we scroll down through hero
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height + viewH * 0.35)));
      setTilt({
        x: 8 + progress * 28,
        y: -12 + progress * 36,
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cx = 420;
  const cy = 300;
  const radius = 168;

  return (
    <div className={styles.stageWrap} aria-hidden="true">
      <div
        ref={stageRef}
        className={styles.stage}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <svg className={styles.streams} viewBox="0 0 800 600" fill="none">
          <defs>
            <linearGradient id="neonIn" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0" />
              <stop offset="55%" stopColor="#3385FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="neonOut" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#25D366" stopOpacity="0.15" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Inbound automation streams */}
          <path className={`${styles.stream} ${styles.flowFast}`} d="M30 140 C 160 120, 280 220, 400 285" stroke="url(#neonIn)" strokeWidth="1.6" filter="url(#glow)" />
          <path className={`${styles.stream} ${styles.flowMed}`} d="M20 300 C 150 290, 270 285, 395 295" stroke="url(#neonIn)" strokeWidth="1.4" filter="url(#glow)" />
          <path className={`${styles.stream} ${styles.flowSlow}`} d="M50 470 C 180 400, 290 340, 400 310" stroke="url(#neonIn)" strokeWidth="1.5" filter="url(#glow)" />
          <path className={`${styles.stream} ${styles.flowMed}`} d="M90 70 C 220 140, 310 220, 405 280" stroke="url(#neonIn)" strokeWidth="1.2" filter="url(#glow)" />

          {integrations.map((item, index) => {
            const point = polar(item.angle, item.distance, cx, cy, radius);
            const mid = polar(item.angle, item.distance * 0.55, cx, cy, radius);
            return (
              <path
                key={item.id}
                className={`${styles.stream} ${index % 2 === 0 ? styles.flowFast : styles.flowSlow}`}
                d={`M ${cx} ${cy} Q ${mid.x} ${mid.y} ${point.x} ${point.y}`}
                stroke="url(#neonOut)"
                strokeWidth="1.45"
                filter="url(#glow)"
              />
            );
          })}
        </svg>

        <div className={styles.core}>
          <svg className={styles.coreOrbitText} viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="orbitOuter" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
              <path id="orbitInner" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
            </defs>
            <g className={styles.orbitSpin}>
              <text className={styles.orbitGlyphs}>
                <textPath href="#orbitOuter" startOffset="0%">
                  {RING_TEXT}
                  {RING_TEXT}
                </textPath>
              </text>
            </g>
            <g className={styles.orbitSpinReverse}>
              <text className={styles.orbitGlyphsDim}>
                <textPath href="#orbitInner" startOffset="8%">
                  {RING_TEXT}
                </textPath>
              </text>
            </g>
          </svg>

          <div className={styles.coreRing} />
          <div className={styles.coreRingSlow} />
          <div className={styles.coreSphere}>
            <div className={styles.coreMatrix}>
              {MATRIX_COLUMNS.map((col, i) => (
                <span
                  key={i}
                  className={styles.matrixCol}
                  style={{
                    animationDelay: col.delay,
                    animationDuration: col.duration,
                    opacity: col.opacity,
                  }}
                >
                  {col.text}
                </span>
              ))}
            </div>
            <span className={styles.coreHighlight} />
          </div>
          <div className={styles.corePulse} />
        </div>

        {integrations.map((item, index) => {
          const point = polar(item.angle, item.distance, cx, cy, radius);
          return (
            <div
              key={item.id}
              className={styles.node}
              style={{
                left: `${(point.x / 800) * 100}%`,
                top: `${(point.y / 600) * 100}%`,
                animationDelay: `${-index * 0.35}s`,
              }}
              title={item.label}
            >
              <span className={styles.nodeBadge} style={{ borderColor: `${item.color}66` }}>
                <Icon id={item.id} color={item.color} />
              </span>
              <span className={styles.nodeLabel}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
