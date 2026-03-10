import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db/prisma'
import { startOfDayUTC, endOfDayUTC, getDaysInRange } from '@/lib/availability'

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
  fechaSalida?: string
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

/** Cotización desde la página Experiencias: formulario corto con experiencia precargada */
export type ExperienceQuotePayload = {
  source: 'experience-quote'
  nombreCompleto: string
  correo: string
  telefono: string
  numeroViajeros: string
  fechaTentativa: string
  mensaje?: string
  nombreProducto: string
  tipoElemento: string
  destino: string
  duracion: string
  precioRango: string
  urlOrigen?: string
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

function buildExperienceQuoteEmailBody(data: ExperienceQuotePayload): string {
  const producto = (data.nombreProducto || 'Experiencia').toString().trim()
  const lines = [
    'COTIZACIÓN DESDE PÁGINA EXPERIENCIAS',
    '',
    '══════════════════════════════════════',
    'TOUR / EXPERIENCIA SOLICITADO: ' + producto,
    '══════════════════════════════════════',
    'Destino: ' + (data.destino || '—'),
    'Duración: ' + (data.duracion || '—'),
    'Categoría: ' + (data.tipoElemento || '—'),
    'Precio de referencia: ' + (data.precioRango || '—'),
    '',
    '— Datos del interesado —',
    'Nombre: ' + (data.nombreCompleto || '—'),
    'Correo: ' + (data.correo || '—'),
    'Teléfono / WhatsApp: ' + (data.telefono || '—'),
    'Número de viajeros: ' + (data.numeroViajeros || '—'),
    'Fecha tentativa: ' + (data.fechaTentativa || '—'),
    'Mensaje adicional: ' + (data.mensaje || '—'),
    '',
    'Página origen: ' + (data.urlOrigen || '—'),
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
      const telefono = (body.telefono ?? '').toString().trim()
      if (!nombre || !correo || !telefono) {
        return NextResponse.json(
          { error: 'Nombre, correo y teléfono son obligatorios' },
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

    if (raw.source === 'experience-quote') {
      const body = raw as ExperienceQuotePayload
      const nombreCompleto = (body.nombreCompleto ?? '').toString().trim()
      const correo = (body.correo ?? '').toString().trim()
      const telefono = (body.telefono ?? '').toString().trim()
      if (!nombreCompleto || !correo) {
        return NextResponse.json(
          { error: 'Nombre y correo son obligatorios' },
          { status: 400 }
        )
      }
      if (!telefono) {
        return NextResponse.json(
          { error: 'Teléfono es obligatorio para poder contactarte' },
          { status: 400 }
        )
      }
      const textBody = buildExperienceQuoteEmailBody(body)
      const htmlBody = textBody
        .split('\n')
        .map((line) => (line ? `<p style="margin:0 0 8px 0;">${escapeHtml(line)}</p>` : '<br/>'))
        .join('')
      const subject = `Nueva solicitud de cotización — ${(body.nombreProducto || 'Experiencia').toString().trim()}`
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: correo,
        subject: `[Simatiri] ${subject}`,
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

    // Validar que las fechas solicitadas no estén bloqueadas
    const fechaLlegadaStr = (body.fechaLlegada ?? '').toString().trim()
    if (fechaLlegadaStr && /^\d{4}-\d{2}-\d{2}$/.test(fechaLlegadaStr)) {
      const endStr = (body.fechaSalida ?? fechaLlegadaStr).toString().trim()
      const endDateStr = /^\d{4}-\d{2}-\d{2}$/.test(endStr) ? endStr : fechaLlegadaStr
      const fromDate = startOfDayUTC(fechaLlegadaStr)
      const toDate = endOfDayUTC(endDateStr)
      const blocks = await prisma.availabilityBlock.findMany({
        where: {
          status: 'blocked',
          AND: [
            { startDate: { lte: toDate } },
            { endDate: { gte: fromDate } },
          ],
        },
      })
      const blockedSet = new Set<string>()
      blocks.forEach((b) => {
        const a = b.startDate.toISOString().slice(0, 10)
        const c = b.endDate.toISOString().slice(0, 10)
        getDaysInRange(a, c).forEach((d) => blockedSet.add(d))
      })
      const requestedDays = getDaysInRange(fechaLlegadaStr, endDateStr)
      const blockedRequested = requestedDays.filter((d) => blockedSet.has(d))
      if (blockedRequested.length > 0) {
        return NextResponse.json(
          { error: 'Una o más fechas seleccionadas no están disponibles. Por favor consulta la página de disponibilidad y elige otras fechas.' },
          { status: 400 }
        )
      }
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
