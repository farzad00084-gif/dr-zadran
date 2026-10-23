/**
 * Single source of truth for the doctor's public identity and contact routes.
 *
 * Content status is tracked in CONTENT_VERIFICATION.md. Do not add claims,
 * institutions, dates, statistics, or contact routes without a recorded source
 * and the doctor's approval.
 */
const runtimeOrigin =
  typeof window !== 'undefined' &&
  window.location.protocol.startsWith('http') &&
  !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)
    ? window.location.origin
    : '';

export const doctor = {
  name: 'Dr. Khalid Khan Zadran',
  nameLatin: 'Dr. Khalid Khan Zadran',
  title: 'Consultant Neurosurgeon | Brain & Spine Surgeon',
  shortTitle: 'Consultant Neurosurgeon',
  credentials: ['MBBS', 'MD', 'RMP', 'MCPS', 'FCPS (Neurosurgery)'],
  location: {
    city: 'Kabul',
    country: 'Afghanistan',
    countryCode: 'AF',
  },
  affiliation: {
    name: 'Rifah Medical Complex',
    city: 'Kabul',
    country: 'Afghanistan',
  },
  phone: {
    display: '+93 78 765 4751',
    e164: '+93787654751',
    tel: 'tel:+93787654751',
  },
  whatsapp: {
    // The supplied number has NOT been verified as WhatsApp-enabled.
    // Set verified to true only after clinic confirmation and a real-device test.
    verified: false,
    e164: '93787654751',
    greeting:
      'Hello, I would like information about contacting the clinic and arranging a consultation.',
  },
  facebook: {
    label: 'Dr. Khalid Khan Zadran — official Facebook page',
    url: 'https://www.facebook.com/DrKhalidkhanzadran/',
    verified: true,
  },
  site: {
    // Replace through VITE_SITE_URL during builds, or fall back to the real
    // deployment origin at runtime. No production domain is asserted.
    url: import.meta.env.VITE_SITE_URL || runtimeOrigin,
    defaultLanguage: 'en',
  },
  emergency: {
    // No local emergency number is published because it has not been verified.
    verifiedNumber: null,
  },
};

export const clinicPhoneHref = doctor.phone.tel;
