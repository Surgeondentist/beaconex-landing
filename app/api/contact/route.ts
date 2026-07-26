import { NextResponse } from "next/server";

type ContactBody = {
  nombre?: string;
  empresa?: string;
  email?: string;
  servicio?: string;
  mensaje?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactBody | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida" },
      { status: 400 },
    );
  }

  const nombre = body.nombre?.trim() ?? "";
  const empresa = body.empresa?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const servicio = body.servicio?.trim() ?? "";
  const mensaje = body.mensaje?.trim() ?? "";

  if (!nombre || !email || !mensaje) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios" },
      { status: 400 },
    );
  }

  const formspreeId = process.env.FORMSPREE_ID;
  if (!formspreeId) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Formulario no configurado. Escríbenos a jhon@beaconex-solutions.com",
      },
      { status: 503 },
    );
  }

  const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, empresa, email, servicio, mensaje }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar. Intenta de nuevo." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
