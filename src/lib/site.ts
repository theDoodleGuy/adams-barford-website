// One place for business facts derived from settings.json, used by the header,
// footer, contact page and JSON-LD so the NAP never drifts.
import settings from '../data/settings.json';
import { displayPhone } from './format';
import { img } from '../data/images';

export { settings };

export const SITE_URL = 'https://www.adamsandbarford.co.uk';
export const phoneDisplay = displayPhone(settings.phoneE164, settings.phone);
export const telHref = `tel:${settings.phoneE164}`;
export const mailHref = `mailto:${settings.email}`;
export const addressLines = [
  settings.address.street,
  settings.address.locality,
  settings.address.region,
  settings.address.postcode,
];

export const serviceSlugs = ['extensions', 'conversions', 'renovations', 'new-build', 'oak-frame', 'commercial'] as const;

export function businessJsonLd() {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#business`,
    name: settings.businessName,
    legalName: settings.legalName,
    url: `${SITE_URL}/`,
    logo: img('logo'),
    image: img('shoot050'),
    description: settings.oneLiner,
    telephone: settings.phoneE164,
    email: settings.email,
    foundingDate: String(settings.founded),
    founder: settings.founders.map((name) => ({ '@type': 'Person', name })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address.street,
      addressLocality: settings.address.locality,
      addressRegion: settings.address.region,
      postalCode: settings.address.postcode,
      addressCountry: settings.address.country,
    },
    areaServed: [
      ...settings.areas.map((name) => ({ '@type': 'Place', name })),
      { '@type': 'AdministrativeArea', name: 'New Forest' },
    ],
  };
  // Hours stay out of the schema until the owner confirms them (Google treats wrong hours as a quality issue).
  if (!settings.hoursPlaceholder) {
    ld.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ];
  }
  const sameAs = [settings.facebook, settings.googleBusinessProfile].filter(Boolean);
  if (sameAs.length) ld.sameAs = sameAs;
  return ld;
}
