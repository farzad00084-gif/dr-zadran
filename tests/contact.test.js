import { describe, expect, it } from 'vitest';
import { doctor } from '../src/data/doctor.js';
import {
  buildWhatsAppUrl,
  CLINIC_PHONE_TEL,
  normalizePhoneForWhatsApp,
  telHref,
} from '../src/utils/contact.js';

describe('contact routing', () => {
  it('keeps telephone contact available', () => {
    expect(doctor.phone.display).toBe('+93 78 765 4751');
    expect(doctor.phone.e164).toBe('+93787654751');
    expect(telHref()).toBe('tel:+93787654751');
    expect(CLINIC_PHONE_TEL).toBe(doctor.phone.tel);
  });

  it('does not expose a WhatsApp link until verification is recorded', () => {
    expect(doctor.whatsapp.verified).toBe(false);
    expect(buildWhatsAppUrl()).toBeNull();
    expect(buildWhatsAppUrl({ verified: false })).toBeNull();
  });

  it('builds a correctly encoded link only after explicit verification', () => {
    const url = buildWhatsAppUrl({ verified: true, greeting: 'Hello & welcome' });
    expect(url).toBe('https://wa.me/93787654751?text=Hello%20%26%20welcome');
  });

  it('normalizes supplied numbers for WhatsApp', () => {
    expect(normalizePhoneForWhatsApp('+93 (78) 765-4751')).toBe('93787654751');
  });
});
