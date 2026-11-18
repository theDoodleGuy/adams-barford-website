// Every photo from the existing staging site, keyed by a readable name.
// DRAFT: these are served straight from the staging site because downloading them
// was blocked. To localise: run scripts/fetch-images.sh, then point IMG_BASE at '/images'.
// Notes come from the review: several photos may be stock or need the owner to confirm what they show.

export const IMG_BASE = 'https://adamsbarforstg.wpenginepowered.com/wp-content/uploads';

const raw = {
  logo: '2022/07/adamsbarford-logo-3.png',
  ampersandPattern: '2022/07/Ampersand-pattern-3-1.png',

  // Service tiles from the old homepage (PNG, heavy, ~1 MB each)
  tileNewBuild: '2022/07/0003_New-Builds.png',
  tileRestoration: '2022/07/0004_Restoration.png',
  tileRenovation: '2022/07/0005_Renovation.png',
  tileRemodel: '2022/07/0002_Remodel.png',
  tileOak: '2022/07/0006_Oak-Structures.png',
  tileCommercial: '2022/07/0000_Commercial.png',

  // Square brand photos
  squareTools: '2022/07/Square_0002_Tools.png',
  squareAtWork: '2022/07/Square_0004_At-work.png',
  squareContract: '2022/07/Square_0005_Contract.png',

  // 2022 professional shoot (ASW-AB-ZAP-2022-05-19-*): team, sites, interiors
  shoot001: '2025/05/ASW-AB-ZAP-2022-05-19-001.jpg',
  shoot014: '2025/05/ASW-AB-ZAP-2022-05-19-014.jpg',
  shoot024: '2025/05/ASW-AB-ZAP-2022-05-19-024.jpg',
  shoot025: '2025/05/ASW-AB-ZAP-2022-05-19-025.jpg', // old alt: "client"
  shoot030: '2025/05/ASW-AB-ZAP-2022-05-19-030.jpg', // old alt: "join"
  shoot034: '2025/05/ASW-AB-ZAP-2022-05-19-034.jpg',
  shoot041: '2025/05/ASW-AB-ZAP-2022-05-19-041.jpg', // old alt: "meeting"
  shoot045: '2025/05/ASW-AB-ZAP-2022-05-19-045.jpg',
  shoot050: '2025/05/ASW-AB-ZAP-2022-05-19-050.jpg', // old alt: "Paul"
  shoot056: '2025/05/ASW-AB-ZAP-2022-05-19-056.jpg', // old alt: "helmets"
  shoot064: '2025/05/ASW-AB-ZAP-2022-05-19-064.jpg',
  shoot068: '2025/05/ASW-AB-ZAP-2022-05-19-068.jpg',
  shoot069: '2025/05/ASW-AB-ZAP-2022-05-19-069.jpg', // old alt: "vans"
  shoot074: '2025/05/ASW-AB-ZAP-2022-05-19-074.jpg',
  shoot082: '2025/05/ASW-AB-ZAP-2022-05-19-082.jpg',
  shoot089: '2025/05/ASW-AB-ZAP-2022-05-19-089.jpg', // old alt: "kitchen"
  shoot091: '2025/05/ASW-AB-ZAP-2022-05-19-091.jpg',
  shoot100: '2025/05/ASW-AB-ZAP-2022-05-19-100.jpg',

  // Roofing / extension gallery
  roof01: '2023/06/ab001-gallery_roofing_01-v01_OB.jpg',
  roof02: '2023/06/ab001-gallery_roofing_02-v01_OB.jpg',
  roof03: '2023/06/ab001-gallery_roofing_03-v01_OB.jpg',
  roof04: '2023/06/ab001-gallery_roofing_04-v01_OB.jpg',
  roof07: '2023/06/ab001-gallery_roofing_07-v01_OB.jpg',
  roof09: '2023/06/ab001-gallery_roofing_09-v01_OB.jpg',

  // Commercial
  commercialDrove: '2021/04/DROVE-featured-image_v1.jpg',
  commercialG8A2740: '2021/05/G8A2740-scaled.jpg',
  commercialScott12: '2021/05/scottchoucino-12-scaled.jpg',
} as const;

export type ImageKey = keyof typeof raw;
export const imagePaths = raw;
export const img = (key: ImageKey) => `${IMG_BASE}/${raw[key]}`;
