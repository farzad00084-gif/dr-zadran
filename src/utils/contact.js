import { doctor } from '../data/doctor.js';

export const CLINIC_PHONE_DISPLAY = doctor.phone.display;
export const CLINIC_PHONE_TEL = doctor.phone.tel;
export const CLINIC_PHONE_E164 = doctor.phone.e164;

export function normalizePhoneForWhatsApp(value = '') {
  return value.replace(/[^\d]/g, '');
}

/**
 * Returns a WhatsApp link only when the clinic has confirmed the number is
 * WhatsApp-enabled. Until then, callers must keep the telephone fallback.
 */
export function buildWhatsAppUrl({ verified = doctor.whatsapp.verified, greeting } = {}) {
  if (!verified) return null;
  const number = normalizePhoneForWhatsApp(doctor.whatsapp.e164);
  if (!number) return null;
  const message = greeting ?? doctor.whatsapp.greeting;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telHref() {
  return doctor.phone.tel;
}
