# Resumen de cambios – Ronda de correcciones Simatiri

## 1. Archivos modificados

| Archivo | Cambios |
|--------|--------|
| `src/components/home/RouteExperienceSection.tsx` | Tren centrado exactamente sobre el marcador de estación (`translate` ajustado); spring un poco más firme. |
| `src/lib/site-config.ts` | WhatsApp a +52 614 252 8190; añadido `DISPLAY_PHONE`. |
| `src/app/contact/page.tsx` | Teléfono actualizado a +52 614 252 8190; enlace `tel:` y enlace `mailto:` en correo. |
| `src/app/about/page.tsx` | Párrafo nuevo: hotel propio en Creel Pueblo Mágico. |
| `src/components/destinations/DestinationsFlagship.tsx` | Cerocahui: estancia sugerida 1 noche. Basaseachi: “cascada permanente más alta de México” en subtitle, intro, whyGo y desc. |
| `src/app/hotels/page.tsx` | Eliminados todos los precios; `rates: []`; specs simplificadas; `note: null`. |
| `src/components/hotels/HotelPanelSystem.tsx` | Si `rates.length === 0`: bloque “Tarifas bajo petición” + botón “Solicitar tarifario” (WhatsApp). Enlace vía `getWhatsAppUrl()`. |
| `prisma/seed.ts` | Todos los precios de tours +200; añadidos “Hiking Barrancas del Cobre” (desde $5,200) y “Buceo Mar de Cortés” (desde $5,500). |
| `src/app/experiences/page.tsx` | Card genérica para tours sin card específica: “Hiking Barrancas del Cobre” y “Buceo Mar de Cortés” con “Desde $X” y botón “Cotizar” a `/tailor-made-trip`. |
| `src/components/experiences/TourBasaseachiCard.tsx` | Fallback de precios +200 (1,700 / 1,500 / 1,200). |
| `src/components/experiences/TourBasaseachiModal.tsx` | Tabla fallback +200. |
| `src/components/experiences/TourBarrancasDelCobreCard.tsx` | Fallback +200. |
| `src/components/experiences/TourBarrancasDelCobreModal.tsx` | Tabla fallback +200. |
| `src/components/experiences/TourCerocahuiCard.tsx` | Fallback +200. |
| `src/components/experiences/TourCerocahuiModal.tsx` | Tabla fallback +200. |
| `src/components/experiences/TourGuachochiYKokoyomeCard.tsx` | Fallback +200. |
| `src/components/experiences/TourGuachochiYKokoyomeModal.tsx` | Tabla fallback +200. |
| `src/components/experiences/TourMaguarichiCard.tsx` | Fallback +200. |
| `src/components/experiences/TourMaguarichiModal.tsx` | Tabla fallback +200. |
| `src/components/experiences/TourMenonitasCard.tsx` | Fallback +200. |
| `src/components/experiences/TourMenonitasModal.tsx` | Tabla fallback +200. |
| `src/components/experiences/TourRecowataCard.tsx` | Fallback +200. |
| `src/components/experiences/TourRecowataModal.tsx` | Tabla fallback +200. |

## 2. Archivos creados

| Archivo | Propósito |
|--------|-----------|
| `src/lib/locales/es.ts` | Diccionario español (claves para nav, common, home). |
| `src/lib/locales/en.ts` | Diccionario inglés (mismas claves). |
| `src/lib/i18n.ts` | Helper `getLocaleStrings(locale)`, `getLocaleFromRequest(searchParams)`. Base para idioma sin APIs de pago. |

## 3. Resumen breve de cambios

- **Mapa / tren:** El tren queda centrado sobre el punto de la estación (ajuste de `translate` y spring).
- **Contacto:** Teléfono único +52 614 252 8190 en `site-config`, página Contacto (con `tel:`) y botón flotante WhatsApp.
- **Nosotros:** Texto que indica que tienen hotel propio en Creel Pueblo Mágico.
- **Destinos – Cerocahui:** Estancia sugerida 1 noche. (La foto sigue siendo la actual; ver nota abajo para iglesia.)
- **Destinos – Basaseachi:** Redacción que destaca “cascada permanente más alta de México” en subtitle, intro, whyGo y descripción.
- **Hoteles:** Sin precios; solo descripción y botón “Solicitar tarifario” (WhatsApp).
- **Experiencias:** +200 en todos los precios (seed + fallbacks en cards/modales). Dos experiencias nuevas: “Hiking Barrancas del Cobre” (desde $5,200) y “Buceo Mar de Cortés” (desde $5,500), con botón Cotizar.
- **i18n:** Base con diccionarios ES/EN y helper en `src/lib/i18n.ts`; sin integración en rutas ni selector de idioma todavía.

## 4. Traducción a inglés (base sin costo)

- **Arquitectura:** Diccionarios estáticos en `src/lib/locales/es.ts` y `src/lib/locales/en.ts`. Mismas claves en ambos. Helper en `src/lib/i18n.ts`: `getLocaleStrings('es' | 'en')`, `getLocaleFromRequest(searchParams)`.
- **Dónde editar:** Textos en español en `src/lib/locales/es.ts`; en inglés en `src/lib/locales/en.ts`. Añadir nuevas claves en los dos archivos.
- **Cómo cambiar de idioma (cuando se implemente):** Por ejemplo: `?lang=en` en la URL y leerlo en layout o middleware; o cookie `locale=en`; o rutas `/en/...` con middleware. Por ahora el sitio sigue en español.
- **Qué falta:** Conectar el locale (cookie, query o ruta) al layout, usar `getLocaleStrings(locale)` en componentes/páginas y sustituir textos fijos por claves. Opcional: selector de idioma en nav.

## 5. Cerocahui – foto iglesia

- La **estancia sugerida** ya está en **1 noche**.
- La **foto** del destino se mantiene (Google Drive). Para usar una **foto de la iglesia de Cerocahui:**  
  1) Añadir la imagen en `public/images/destinations/cerocahui-iglesia.jpg`.  
  2) En `DestinationsFlagship.tsx`, en el objeto de `cerocahui` dentro de `destinations`, cambiar `image` a: `'/images/destinations/cerocahui-iglesia.jpg'`.

## 6. Aplicar nuevos tours y precios en BD

Para que “Hiking Barrancas del Cobre” y “Buceo Mar de Cortés” y los precios +200 aparezcan en la web:

```bash
npx prisma db seed
```

(Si el seed no está configurado en `package.json`, ejecutar: `npx tsx prisma/seed.ts`.)

## 7. Consistencia

- Un solo número de contacto/WhatsApp: +52 614 252 8190.
- Botones “Cotizar” y “Solicitar tarifario” con estilo de marca y enlaces correctos.
- Precios de experiencias actualizados en seed y en fallbacks de cards/modales (+200).
- Sin precios en hoteles; solo descripción y CTA.
