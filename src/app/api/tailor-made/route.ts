import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = 'ventas@simatiri.com'
const FROM_EMAIL = process.env.EMAIL_FROM ?? 'Simatiri Cotizaciones <onboarding@resend.dev>'

export type TailorMadePayload = {
  nombreCompleto: string
  correo: string
  telefono: string
  pais: string
  numeroViajeros: string
  fechaLlegada: string
  duracion: string
  presupuesto: string
  intereses: string[]
  notas: string
  urlOrigen?: string
}

export type ContactPayload = {
  source: 'contact'
  nombre: string
  correo: string
  tipoConsulta?: string
  telefono?: string
  mensaje?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
function buildEmailBody(data: TailorMadePayload): string {
  const lines = [
    'Nueva solicitud de cotización personalizada',
    '',
    'Nombre: ' + (data.nombreCompleto || '—'),
    'Correo: ' + (data.correo || '—'),
    'Teléfono / WhatsApp: ' + (data.telefono || '—'),
    'País de origen: ' + (data.pais || '—'),
    'Número de viajeros: ' + (data.numeroViajeros || '—'),
    'Fecha tentativa de llegada: ' + (data.fechaLlegada || '—'),
    'Duración estimada: ' + (data.duracion || '—'),
    'Presupuesto por persona: ' + (data.presupuesto || '—'),
    'Intereses: ' + (Array.isArray(data.intereses) && data.intereses.length > 0 ? data.intereses.join(', ') : '—'),
    '',
    'Notas / solicitudes especiales:',
    data.notas || '—',
    '',
    'Página de origen: ' + (data.urlOrigen || '—'),
    'Fecha de envío: ' + new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
  ]
  return lines.join('\n')
}

function buildContactEmailBody(data: ContactPayload): string {
  const lines = [
    'Mensaje desde la página Contacto (Simatiri Experience)',
    '',
    'Nombre: ' + (data.nombre || '—'),
    'Correo: ' + (data.correo || '—'),
    'Tipo de consulta: ' + (data.tipoConsulta || '—'),
    'Teléfono: ' + (data.telefono || '—'),
    '',
    'Mensaje:',
    data.mensaje || '—',
    '',
    'Fecha de envío: ' + new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
  ]
  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json() as Record<string, unknown>

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Servicio de correo no configurado' },
        { status: 503 }
      )
    }

    if (raw.source === 'contact') {
      const body = raw as ContactPayload
      const nombre = (body.nombre ?? '').toString().trim()
      const correo = (body.correo ?? '').toString().trim()
      if (!nombre || !correo) {
        return NextResponse.json(
          { error: 'Nombre y correo son obligatorios' },
          { status: 400 }
        )
      }
      const textBody = buildContactEmailBody(body)
      const htmlBody = textBody
        .split('\n')
        .map((line) => (line ? `<p style="margin:0 0 8px 0;">${escapeHtml(line)}</p>` : '<br/>'))
        .join('')
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: correo,
        subject: `[Simatiri] Contacto - ${nombre}`,
        text: textBody,
        html: `<div style="font-family:sans-serif;max-width:560px;">${htmlBody}</div>`,
      })
      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { error: error.message || 'Error al enviar el correo' },
          { status: 500 }
        )
      }
      return NextResponse.json({ success: true })
    }

    const body = raw as TailorMadePayload
    const {
      nombreCompleto = '',
      correo = '',
      telefono = '',
      pais = '',
      numeroViajeros = '',
      fechaLlegada = '',
      duracion = '',
      presupuesto = '',
      intereses = [],
      notas = '',
      urlOrigen = '',
    } = body

    if (!nombreCompleto.trim() || !correo.trim()) {
      return NextResponse.json(
        { error: 'Nombre y correo son obligatorios' },
        { status: 400 }
      )
    }

    const textBody = buildEmailBody(body)
    const htmlBody = textBody
      .split('\n')
      .map((line) => (line ? `<p style="margin:0 0 8px 0;">${escapeHtml(line)}</p>` : '<br/>'))
      .join('')

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: correo.trim(),
      subject: `[Simatiri] Cotización personalizada - ${nombreCompleto.trim()}`,
      text: textBody,
      html: `<div style="font-family:sans-serif;max-width:560px;">${htmlBody}</div>`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: error.message || 'Error al enviar el correo' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Tailor-made API error:', err)
    return NextResponse.json(
      { error: 'Error inesperado al procesar la solicitud' },
      { status: 500 }
    )
  }
}
