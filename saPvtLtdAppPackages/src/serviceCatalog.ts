/**
 * Stable bilingual service metadata.
 * Search uses keys + names + searchTerms — never the displayed string alone.
 * API / Mongo `serviceType` stays the English `apiName`.
 */

export type AppLang = 'hi' | 'en';

export interface LocalizedText {
  hi: string;
  en: string;
}

export interface ServiceMeta {
  key: string;
  apiName: string;
  name: LocalizedText;
  description: LocalizedText;
  searchTerms: string[];
}

export const SERVICE_CATALOG: ServiceMeta[] = [
  {
    key: 'plumber',
    apiName: 'Plumber',
    name: {hi: 'प्लंबर', en: 'Plumber'},
    description: {
      hi: 'नल, पाइप और पानी टपकने की मरम्मत',
      en: 'Taps, pipes, and water leaks',
    },
    searchTerms: [
      'plumber',
      'plumb',
      'plumbing',
      'pipe',
      'tap',
      'leak',
      'प्लंबर',
      'प्लम्बिंग',
      'नल',
      'पाइप',
    ],
  },
  {
    key: 'electrician',
    apiName: 'Electrician',
    name: {hi: 'इलेक्ट्रीशियन', en: 'Electrician'},
    description: {
      hi: 'बिजली, वायरिंग, स्विच और फैन का काम',
      en: 'Wiring, switches, fans, and electrical repair',
    },
    searchTerms: [
      'electrician',
      'elec',
      'electric',
      'electrical',
      'wiring',
      'इलेक्ट्रीशियन',
      'इलेक्ट्रिशियन',
      'बिजली',
      'वायरिंग',
    ],
  },
  {
    key: 'carpenter',
    apiName: 'Carpenter',
    name: {hi: 'बढ़ई', en: 'Carpenter'},
    description: {
      hi: 'लकड़ी का काम — दरवाज़ा, खिड़की, अलमारी',
      en: 'Woodwork — doors, windows, and furniture',
    },
    searchTerms: [
      'carpenter',
      'carp',
      'wood',
      'woodwork',
      'furniture',
      'बढ़ई',
      'लकड़ी',
    ],
  },
  {
    key: 'painter',
    apiName: 'Painter',
    name: {hi: 'पेंटर', en: 'Painter'},
    description: {
      hi: 'दीवार पेंट, पुताई और पॉलिश',
      en: 'Wall painting and polish',
    },
    searchTerms: [
      'painter',
      'paint',
      'painting',
      'पेंटर',
      'पेंट',
      'पुताई',
    ],
  },
  {
    key: 'ac_repair',
    apiName: 'AC Repair',
    name: {hi: 'एसी मरम्मत', en: 'AC Repair'},
    description: {
      hi: 'एसी की सफाई, गैस और मरम्मत',
      en: 'AC cleaning, gas, and repair',
    },
    searchTerms: [
      'ac repair',
      'ac',
      'a/c',
      'air conditioner',
      'aircon',
      'cooling',
      'एसी',
      'एसी मरम्मत',
      'एयर कंडीशनर',
    ],
  },
  {
    key: 'cleaning',
    apiName: 'Cleaning Service',
    name: {hi: 'सफाई सेवा', en: 'Cleaning Service'},
    description: {
      hi: 'घर, किचन और दफ़्तर की सफाई',
      en: 'Home, kitchen, and office cleaning',
    },
    searchTerms: [
      'cleaning',
      'clean',
      'cleaner',
      'maid',
      'housekeeping',
      'सफाई',
      'सफाई सेवा',
    ],
  },
  {
    key: 'driver',
    apiName: 'Driver',
    name: {hi: 'ड्राइवर', en: 'Driver'},
    description: {
      hi: 'कार या टैक्सी चलाने वाला',
      en: 'Car or taxi driver',
    },
    searchTerms: [
      'driver',
      'drive',
      'taxi',
      'cab',
      'ड्राइवर',
      'चालक',
    ],
  },
  {
    key: 'mason',
    apiName: 'Mason',
    name: {hi: 'राजमिस्त्री', en: 'Mason'},
    description: {
      hi: 'ईंट, सीमेंट और चिनाई का काम',
      en: 'Brick, cement, and masonry work',
    },
    searchTerms: [
      'mason',
      'masonry',
      'brick',
      'राजमिस्त्री',
      'मिस्त्री',
      'चिनाई',
    ],
  },
  {
    key: 'welder',
    apiName: 'Welder',
    name: {hi: 'वेल्डर', en: 'Welder'},
    description: {
      hi: 'लोहा जोड़ने और वेल्डिंग का काम',
      en: 'Welding and metal work',
    },
    searchTerms: ['welder', 'weld', 'welding', 'वेल्डर', 'वेल्डिंग'],
  },
  {
    key: 'appliance_repair',
    apiName: 'Appliance Repair',
    name: {hi: 'उपकरण मरम्मत', en: 'Appliance Repair'},
    description: {
      hi: 'फ्रिज, वाशिंग मशीन और अन्य उपकरणों की मरम्मत',
      en: 'Fridge, washing machine, and appliance repair',
    },
    searchTerms: [
      'appliance repair',
      'appliance',
      'fridge',
      'washing machine',
      'उपकरण',
      'उपकरण मरम्मत',
      'फ्रिज',
    ],
  },
  {
    key: 'gardener',
    apiName: 'Gardener',
    name: {hi: 'माली', en: 'Gardener'},
    description: {
      hi: 'बाग़, पौधे और घास की देखभाल',
      en: 'Garden and plant care',
    },
    searchTerms: ['gardener', 'garden', 'माली', 'बाग', 'बाग़'],
  },
  {
    key: 'roofer',
    apiName: 'Roofer',
    name: {hi: 'छत कारीगर', en: 'Roofer'},
    description: {
      hi: 'छत की मरम्मत और लीकेज',
      en: 'Roof repair and leaks',
    },
    searchTerms: ['roofer', 'roof', 'छत', 'छत कारीगर'],
  },
  {
    key: 'flooring',
    apiName: 'Flooring',
    name: {hi: 'फ़्लोरिंग', en: 'Flooring'},
    description: {
      hi: 'फ़र्श लगाना और मरम्मत',
      en: 'Floor fitting and repair',
    },
    searchTerms: ['flooring', 'floor', 'फ़्लोरिंग', 'फर्श', 'फ़र्श'],
  },
  {
    key: 'tiles_marble',
    apiName: 'Tiles & Marble',
    name: {hi: 'टाइल्स और मार्बल', en: 'Tiles & Marble'},
    description: {
      hi: 'टाइल्स और मार्बल लगाना',
      en: 'Tile and marble fitting',
    },
    searchTerms: [
      'tiles & marble',
      'tiles and marble',
      'tiles',
      'marble',
      'tile',
      'टाइल्स',
      'मार्बल',
      'टाइल्स और मार्बल',
    ],
  },
  {
    key: 'interior_designer',
    apiName: 'Interior Designer',
    name: {hi: 'इंटीरियर डिज़ाइनर', en: 'Interior Designer'},
    description: {
      hi: 'घर की सजावट और डिज़ाइन',
      en: 'Home interior design',
    },
    searchTerms: [
      'interior designer',
      'interior',
      'designer',
      'इंटीरियर',
      'इंटीरियर डिज़ाइनर',
    ],
  },
  // ── Local & Delivery Services ──
  {
    key: 'medicine_delivery',
    apiName: 'Medicine Pickup & Delivery',
    name: {hi: 'दवा लाने-ले जाने की सेवा', en: 'Medicine Pickup & Delivery'},
    description: {
      hi: 'मेडिकल स्टोर से दवा लाकर घर पहुँचाना',
      en: 'Pick up and deliver medicines from a medical store',
    },
    searchTerms: ['medicine', 'dawa', 'दवा', 'medical', 'pharmacy', 'delivery', 'दवाई'],
  },
  {
    key: 'grocery_delivery',
    apiName: 'Grocery Pickup & Delivery',
    name: {hi: 'किराना लाने-ले जाने की सेवा', en: 'Grocery Pickup & Delivery'},
    description: {
      hi: 'दुकान से किराना सामान लाकर घर पहुँचाना',
      en: 'Pick up and deliver groceries',
    },
    searchTerms: ['grocery', 'groceries', 'kiryana', 'किराना', 'सामान', 'delivery'],
  },
  {
    key: 'mobile_repair',
    apiName: 'Mobile Repair',
    name: {hi: 'मोबाइल मरम्मत', en: 'Mobile Repair'},
    description: {
      hi: 'मोबाइल स्क्रीन, बैटरी और हार्डवेयर मरम्मत',
      en: 'Phone screen, battery, and hardware repair',
    },
    searchTerms: ['mobile', 'phone', 'smartphone', 'screen', 'मोबाइल', 'फोन', 'मोबाइल मरम्मत'],
  },
  {
    key: 'ro_repair',
    apiName: 'RO / Water Purifier',
    name: {hi: 'आरओ / पानी की मशीन', en: 'RO / Water Purifier'},
    description: {
      hi: 'आरओ और पानी की मशीन की मरम्मत',
      en: 'RO and water purifier installation and repair',
    },
    searchTerms: ['ro', 'water purifier', 'purifier', 'आरओ', 'पानी की मशीन', 'वाटर'],
  },
  {
    key: 'fridge_repair',
    apiName: 'Refrigerator Repair',
    name: {hi: 'फ्रिज मरम्मत', en: 'Refrigerator Repair'},
    description: {
      hi: 'फ्रिज की कूलिंग और कंप्रेसर मरम्मत',
      en: 'Fridge cooling and compressor repair',
    },
    searchTerms: ['refrigerator', 'fridge', 'cooling', 'फ्रिज', 'रेफ्रिजरेटर', 'फ्रिज मरम्मत'],
  },
  {
    key: 'washing_machine_repair',
    apiName: 'Washing Machine Repair',
    name: {hi: 'वॉशिंग मशीन मरम्मत', en: 'Washing Machine Repair'},
    description: {
      hi: 'वॉशिंग मशीन की मरम्मत और सर्विसिंग',
      en: 'Washing machine repair and servicing',
    },
    searchTerms: ['washing machine', 'washer', 'laundry', 'वॉशिंग मशीन', 'धुलाई'],
  },
  {
    key: 'bike_repair',
    apiName: 'Bike Repair',
    name: {hi: 'बाइक मरम्मत', en: 'Bike Repair'},
    description: {
      hi: 'मोटरसाइकिल और साइकिल की मरम्मत',
      en: 'Motorcycle and bicycle repair',
    },
    searchTerms: ['bike', 'motorcycle', 'cycle', 'बाइक', 'मोटरसाइकिल', 'साइकिल', 'बाइक मरम्मत'],
  },
  {
    key: 'tailor',
    apiName: 'Tailor',
    name: {hi: 'दर्जी', en: 'Tailor'},
    description: {
      hi: 'कपड़े सिलाई और बदलाव',
      en: 'Stitching and clothing alterations',
    },
    searchTerms: ['tailor', 'stitching', 'sewing', 'दर्जी', 'सिलाई', 'कपड़े'],
  },
  {
    key: 'barber',
    apiName: 'Barber',
    name: {hi: 'नाई', en: 'Barber'},
    description: {
      hi: 'बाल काटना और ग्रूमिंग',
      en: 'Hair cutting and grooming',
    },
    searchTerms: ['barber', 'hair', 'haircut', 'नाई', 'बाल', 'हेयरकट'],
  },
  {
    key: 'labour_helper',
    apiName: 'Labour / Helper',
    name: {hi: 'मजदूर / सहायक', en: 'Labour / Helper'},
    description: {
      hi: 'सामान्य मजदूरी और सहायता सेवाएँ',
      en: 'General labour and helper services',
    },
    searchTerms: ['labour', 'labor', 'helper', 'मजदूर', 'सहायक', 'मजदूरी'],
  },
  {
    key: 'welding',
    apiName: 'Welding',
    name: {hi: 'वेल्डिंग', en: 'Welding'},
    description: {
      hi: 'धातु वेल्डिंग और फेब्रिकेशन',
      en: 'Metal welding and fabrication',
    },
    searchTerms: ['welding', 'weld', 'metal', 'वेल्डिंग', 'लोहा'],
  },
  {
    key: 'pump_motor_repair',
    apiName: 'Pump / Motor Repair',
    name: {hi: 'पंप / मोटर मरम्मत', en: 'Pump / Motor Repair'},
    description: {
      hi: 'पानी के पंप और मोटर की मरम्मत',
      en: 'Water pump and motor repair',
    },
    searchTerms: ['pump', 'motor', 'पंप', 'मोटर', 'पानी का पंप'],
  },
  {
    key: 'tractor_driver',
    apiName: 'Tractor Driver',
    name: {hi: 'ट्रैक्टर ड्राइवर', en: 'Tractor Driver'},
    description: {
      hi: 'खेती या ढुलाई के लिए ट्रैक्टर ड्राइवर',
      en: 'Tractor driving for agriculture or transport',
    },
    searchTerms: ['tractor', 'farm', 'agriculture', 'ट्रैक्टर', 'ट्रेक्टर', 'खेती'],
  },
  {
    key: 'cctv_service',
    apiName: 'CCTV Service',
    name: {hi: 'सीसीटीवी सेवा', en: 'CCTV Service'},
    description: {
      hi: 'सीसीटीवी कैमरा लगाना और मरम्मत',
      en: 'CCTV camera installation and repair',
    },
    searchTerms: ['cctv', 'camera', 'security camera', 'सीसीटीवी', 'कैमरा'],
  },
  {
    key: 'wifi_technician',
    apiName: 'Internet / Wi-Fi Technician',
    name: {hi: 'इंटरनेट / वाई-फाई तकनीशियन', en: 'Internet / Wi-Fi Technician'},
    description: {
      hi: 'इंटरनेट और वाई-फाई सेटअप और समस्या समाधान',
      en: 'Internet and Wi-Fi setup and troubleshooting',
    },
    searchTerms: ['wifi', 'wi-fi', 'internet', 'broadband', 'वाई-फाई', 'इंटरनेट', 'नेट'],
  },
  {
    key: 'other',
    apiName: 'Other',
    name: {hi: 'अन्य', en: 'Other'},
    description: {
      hi: 'अन्य घरेलू या स्थानीय सेवाएँ',
      en: 'Other home or local service',
    },
    searchTerms: ['other', 'misc', 'अन्य'],
  },
];

/** Popular services shown in the main grid (max 8). Matches DB isPopular=true. */
export const FEATURED_SERVICE_KEYS = [
  'plumber',
  'electrician',
  'carpenter',
  'painter',
  'ac_repair',
  'cleaning',
  'driver',
  'appliance_repair',
] as const;

/** Service groups for "See all services" organized view */
export const SERVICE_GROUPS: {titleHi: string; titleEn: string; keys: string[]}[] = [
  {
    titleHi: 'घर की मरम्मत और सेवाएँ',
    titleEn: 'Home Repair & Services',
    keys: [
      'plumber', 'electrician', 'carpenter', 'painter', 'ac_repair',
      'appliance_repair', 'ro_repair', 'fridge_repair', 'washing_machine_repair',
      'mobile_repair', 'cctv_service', 'wifi_technician',
    ],
  },
  {
    titleHi: 'डिलीवरी और स्थानीय सहायता',
    titleEn: 'Delivery & Local Help',
    keys: ['medicine_delivery', 'grocery_delivery', 'cleaning', 'labour_helper'],
  },
  {
    titleHi: 'ट्रांसपोर्ट और कृषि',
    titleEn: 'Transport & Agriculture',
    keys: ['driver', 'tractor_driver', 'bike_repair', 'pump_motor_repair'],
  },
  {
    titleHi: 'व्यक्तिगत सेवाएँ',
    titleEn: 'Personal Services',
    keys: ['tailor', 'barber', 'mason', 'welding'],
  },
  {
    titleHi: 'अन्य',
    titleEn: 'Other',
    keys: [
      'welder', 'gardener', 'roofer', 'flooring',
      'tiles_marble', 'interior_designer', 'other',
    ],
  },
];

const BY_KEY = new Map<string, ServiceMeta>();
const BY_ALIAS = new Map<string, ServiceMeta>();

function fold(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function slug(value: string): string {
  return fold(value)
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\u0900-\u097f]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function registerAlias(alias: string, meta: ServiceMeta) {
  const key = fold(alias);
  if (key && !BY_ALIAS.has(key)) BY_ALIAS.set(key, meta);
}

for (const meta of SERVICE_CATALOG) {
  BY_KEY.set(meta.key, meta);
  registerAlias(meta.key, meta);
  registerAlias(meta.key.replace(/_/g, ' '), meta);
  registerAlias(meta.apiName, meta);
  registerAlias(meta.name.en, meta);
  registerAlias(meta.name.hi, meta);
}

function unknownMeta(raw: string, nameHi?: string): ServiceMeta {
  const trimmed = raw.trim();
  return {
    key: slug(trimmed) || 'other',
    apiName: trimmed || 'Service',
    name: {
      hi: nameHi?.trim() || trimmed || 'सेवा',
      en: trimmed || 'Service',
    },
    description: {hi: '', en: ''},
    searchTerms: [trimmed, nameHi || ''].filter(Boolean),
  };
}

export function resolveServiceMeta(
  raw?: string | null,
  extras?: {nameHi?: string},
): ServiceMeta {
  const trimmed = (raw || '').trim();
  if (!trimmed) return unknownMeta('', extras?.nameHi);

  const folded = fold(trimmed);
  const fromKey = BY_KEY.get(folded) || BY_KEY.get(slug(trimmed));
  if (fromKey) return fromKey;

  const fromAlias = BY_ALIAS.get(folded);
  if (fromAlias) return fromAlias;

  if (extras?.nameHi) {
    const fromHi = BY_ALIAS.get(fold(extras.nameHi));
    if (fromHi) return fromHi;
  }

  return unknownMeta(trimmed, extras?.nameHi);
}

export function serviceSearchTerms(
  meta: ServiceMeta,
  extra: string[] = [],
): string[] {
  return [
    meta.key,
    meta.key.replace(/_/g, ' '),
    meta.apiName,
    meta.name.hi,
    meta.name.en,
    ...meta.searchTerms,
    ...extra,
  ].filter(Boolean);
}

export function matchesServiceSearch(
  query: string,
  meta: ServiceMeta,
  extra: string[] = [],
): boolean {
  const q = fold(query);
  if (!q) return true;
  return serviceSearchTerms(meta, extra).some((term) => fold(term).includes(q));
}

export function filterByServiceSearch<T>(
  items: T[],
  query: string,
  getRawName: (item: T) => string,
  extraTerms?: (item: T) => string[],
): T[] {
  const q = query.trim();
  if (!q) return items;
  return items.filter((item) =>
    matchesServiceSearch(
      q,
      resolveServiceMeta(getRawName(item)),
      extraTerms?.(item) || [],
    ),
  );
}

export function servicePrimaryName(
  raw: string | null | undefined,
  lang: AppLang,
  extras?: {nameHi?: string},
): string {
  const meta = resolveServiceMeta(raw, extras);
  return meta.name[lang] || meta.name.en;
}

export function serviceSecondaryName(
  raw: string | null | undefined,
  lang: AppLang,
  extras?: {nameHi?: string},
): string {
  const meta = resolveServiceMeta(raw, extras);
  const other = lang === 'hi' ? meta.name.en : meta.name.hi;
  const primary = meta.name[lang] || meta.name.en;
  return other && other !== primary ? other : '';
}

export function bilingualServiceNames(
  raw: string | null | undefined,
  lang: AppLang,
  extras?: {nameHi?: string},
): {primary: string; secondary: string} {
  return {
    primary: servicePrimaryName(raw, lang, extras),
    secondary: serviceSecondaryName(raw, lang, extras),
  };
}

export function bilingualProfessionLine(
  raw: string | null | undefined,
  extras?: {nameHi?: string},
): string {
  const meta = resolveServiceMeta(raw, extras);
  if (!meta.name.hi || meta.name.hi === meta.name.en) return meta.name.en;
  return `${meta.name.hi} / ${meta.name.en}`;
}

export function serviceDescription(
  raw: string | null | undefined,
  lang: AppLang,
  fallback?: string,
  extras?: {nameHi?: string; description?: string; descriptionHi?: string},
): string {
  const meta = resolveServiceMeta(raw, extras);
  const fromCatalog = meta.description[lang] || meta.description.hi;
  if (fromCatalog) return fromCatalog;
  if (lang === 'hi') return extras?.descriptionHi || extras?.description || fallback || '';
  return extras?.description || extras?.descriptionHi || fallback || '';
}

export function serviceSelectSearchText(
  raw: string | null | undefined,
  extras?: {nameHi?: string},
): string {
  return serviceSearchTerms(resolveServiceMeta(raw, extras)).join(' ');
}

export function findCatalogMatch(query: string): ServiceMeta | null {
  const q = query.trim();
  if (!q) return null;
  return SERVICE_CATALOG.find((meta) => matchesServiceSearch(q, meta)) || null;
}
