/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The site's look for Google Maps, used by the booking route map.
 *
 * Colors are read from the global CSS variables at runtime (--gold,
 * --midnight, --ivory …), so a change in globals.css carries into the map
 * without touching this file. The fallbacks are only used if a variable is
 * missing.
 */

/** Where the map opens before any address is picked: the Strip. */
export const MAP_DEFAULT_CENTER = { lat: 36.1147, lng: -115.1728 };
export const MAP_DEFAULT_ZOOM = 11;

export type BrandMapColors = {
  accent: string;
  midnight: string;
  navy: string;
  slate: string;
  steel: string;
  ivory: string;
  champagne: string;
  stroke: string;
  white: string;
};

const FALLBACK: BrandMapColors = {
  accent: "#ff9f00",
  midnight: "#0b0f1a",
  navy: "#1c2333",
  slate: "#3a4560",
  steel: "#8a93a6",
  ivory: "#f7f5f0",
  champagne: "#e8d9b0",
  stroke: "#dedbd2",
  white: "#ffffff",
};

/** The palette from globals.css, as the browser sees it right now. */
export function readBrandColors(): BrandMapColors {
  if (typeof window === "undefined") return FALLBACK;
  const root = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    root.getPropertyValue(name).trim() || fallback;
  return {
    accent: read("--gold", FALLBACK.accent),
    midnight: read("--midnight", FALLBACK.midnight),
    navy: read("--navy", FALLBACK.navy),
    slate: read("--slate", FALLBACK.slate),
    steel: read("--steel", FALLBACK.steel),
    ivory: read("--ivory", FALLBACK.ivory),
    champagne: read("--champagne", FALLBACK.champagne),
    stroke: read("--stroke", FALLBACK.stroke),
    white: read("--white", FALLBACK.white),
  };
}

/**
 * The map's style: ivory land, white streets, champagne highways, quiet
 * labels, and the clutter (business pins, transit, parcels) turned off.
 * Airports stay, tinted, with their names, since so many rides start there.
 * Later rules win, so the airport rules come after the transit ones.
 */
export function brandMapStyles(c: BrandMapColors): any[] {
  return [
    { elementType: "geometry", stylers: [{ color: c.ivory }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: c.slate }] },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: c.ivory }, { weight: 3 }],
    },

    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: c.stroke }],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: c.midnight }],
    },

    { featureType: "poi", stylers: [{ visibility: "off" }] },

    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: c.white }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: c.stroke }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: c.steel }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: c.champagne }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: c.champagne }, { lightness: -8 }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: c.slate }],
    },

    { featureType: "transit", stylers: [{ visibility: "off" }] },
    {
      featureType: "transit.station.airport",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "transit.station.airport",
      elementType: "geometry",
      stylers: [{ color: c.champagne }, { lightness: 25 }],
    },
    {
      featureType: "transit.station.airport",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.station.airport",
      elementType: "labels.text.fill",
      stylers: [{ color: c.midnight }],
    },

    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: c.stroke }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: c.steel }],
    },
  ];
}

/** Map options that go with the style: only the zoom buttons, no clutter. */
export function brandMapOptions(c: BrandMapColors): any {
  return {
    center: MAP_DEFAULT_CENTER,
    zoom: MAP_DEFAULT_ZOOM,
    styles: brandMapStyles(c),
    backgroundColor: c.ivory,
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
    // One finger scrolls the page on phones; two fingers move the map.
    gestureHandling: "cooperative",
  };
}

const svgUrl = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

/**
 * A round marker with a letter or number in it, as an icon for
 * google.maps.Marker. "pickup" is the accent with a midnight letter,
 * "dropoff" is midnight with an accent letter and ring, and "stop" is a
 * smaller white marker with a midnight number.
 */
export function brandMarkerIcon(
  google: any,
  kind: "pickup" | "dropoff" | "stop",
  text: string,
  c: BrandMapColors,
): any {
  const stop = kind === "stop";
  const size = stop ? 28 : 36;
  const r = size / 2 - 3;
  const fill =
    kind === "pickup" ? c.accent : kind === "dropoff" ? c.midnight : c.white;
  const ring =
    kind === "pickup" ? c.white : kind === "dropoff" ? c.accent : c.midnight;
  const ink =
    kind === "pickup" ? c.midnight : kind === "dropoff" ? c.accent : c.midnight;
  const fontSize = stop ? 12 : 14;
  const half = size / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${half}" cy="${half + 1}" r="${r}" fill="#0b0f1a" opacity="0.18"/><circle cx="${half}" cy="${half}" r="${r}" fill="${fill}" stroke="${ring}" stroke-width="2.5"/><text x="${half}" y="${half + fontSize / 3 + 0.5}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="${ink}">${text}</text></svg>`;

  return {
    url: svgUrl(svg),
    scaledSize: new google.maps.Size(size, size),
    anchor: new google.maps.Point(half, half),
  };
}

/**
 * The route: a midnight line with a soft accent edge under it. Returns the
 * options for the two polylines, edge first so the line draws on top.
 */
export function brandRouteLines(c: BrandMapColors): any[] {
  return [
    {
      strokeColor: c.accent,
      strokeOpacity: 0.45,
      strokeWeight: 10,
      zIndex: 1,
    },
    {
      strokeColor: c.midnight,
      strokeOpacity: 0.95,
      strokeWeight: 4,
      zIndex: 2,
    },
  ];
}
