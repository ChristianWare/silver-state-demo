/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Address search on a text input, using Google's Places API (New).
 *
 * Google no longer lets new Cloud projects turn on the old Places API, which
 * the old `google.maps.places.Autocomplete` widget needs. This class works
 * the same way, so it drops in where that widget was:
 *
 *   const ac = new PlacesAutocomplete(input, {
 *     componentRestrictions: { country: "us" },
 *   });
 *   ac.addListener("place_changed", () => {
 *     const place = ac.getPlace();
 *     // place.place_id, place.formatted_address, place.geometry.location
 *   });
 *
 * As you type it asks Places API (New) for suggestions and shows them in a
 * list under the input, in the site's style. Up and down arrows move through
 * the list, Enter or a click picks one, Escape closes it. Picking one looks
 * up its address and location, fills the input, and fires "place_changed".
 *
 * The Google Cloud key needs "Places API (New)" enabled.
 */

type LegacyPlace = {
  place_id: string;
  formatted_address: string;
  name?: string;
  geometry: { location: any };
};

type Options = {
  /** Kept for the old widget's signature; the fields we need are fixed. */
  fields?: string[];
  componentRestrictions?: { country?: string | string[] };
};

type Suggestion = {
  main: string;
  secondary: string;
  text: string;
  prediction: any;
};

// Results lean toward Las Vegas without excluding anywhere else.
const BIAS = {
  center: { lat: 36.1147, lng: -115.1728 },
  radius: 50000,
};

const STYLE_ID = "places-autocomplete-style";

/** The list's look, added to the page once. Colors come from globals.css. */
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
.pa-menu {
  position: absolute;
  z-index: 10000;
  overflow: hidden;
  border: 1px solid var(--stroke, #dedbd2);
  border-radius: 6px;
  background: var(--white, #fff);
  box-shadow: 0 12px 32px rgb(11 15 26 / 14%);
  font-family: var(--SofiaSansRegular, system-ui, sans-serif);
}
.pa-list { list-style: none; margin: 0; padding: 4px; }
.pa-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.pa-item[aria-selected="true"] { background: var(--ivory, #f7f5f0); }
.pa-main {
  font-family: var(--SofiaSansBold, system-ui, sans-serif);
  font-size: 15px;
  line-height: 1.3;
  color: var(--midnight, #0b0f1a);
}
.pa-secondary {
  font-size: 13px;
  line-height: 1.3;
  color: var(--slate, #3a4560);
}
.pa-foot {
  display: flex;
  justify-content: flex-end;
  padding: 6px 12px;
  border-top: 1px solid var(--stroke, #dedbd2);
  font-family: Roboto, Arial, sans-serif;
  font-size: 11px;
  color: #5e5e5e;
}`;
  document.head.appendChild(style);
}

/** The new Places classes, from the loaded script or loaded on demand. */
async function placesLib(): Promise<any> {
  const g = (window as any).google;
  if (g?.maps?.places?.AutocompleteSuggestion) return g.maps.places;
  if (g?.maps?.importLibrary) return g.maps.importLibrary("places");
  throw new Error("Google Maps isn't loaded");
}

let nextId = 0;

export class PlacesAutocomplete {
  private input: HTMLInputElement;
  private regions: string[] | undefined;
  private listeners: Array<() => void> = [];
  private place: LegacyPlace | null = null;

  private menu: HTMLDivElement;
  private list: HTMLUListElement;
  private suggestions: Suggestion[] = [];
  private active = -1;
  private open = false;

  private token: any = null;
  private timer: number | undefined;
  private request = 0;
  private listId = `pa-list-${++nextId}`;

  constructor(input: HTMLInputElement, options: Options = {}) {
    this.input = input;
    const country = options.componentRestrictions?.country;
    this.regions = country
      ? (Array.isArray(country) ? country : [country]).map((c) =>
          c.toLowerCase(),
        )
      : undefined;

    injectStyles();

    this.menu = document.createElement("div");
    this.menu.className = "pa-menu";
    this.menu.hidden = true;
    this.list = document.createElement("ul");
    this.list.className = "pa-list";
    this.list.id = this.listId;
    this.list.setAttribute("role", "listbox");
    const foot = document.createElement("div");
    foot.className = "pa-foot";
    foot.textContent = "Google Maps";
    this.menu.append(this.list, foot);
    // Clicking the list must not take focus from the input.
    this.menu.addEventListener("mousedown", (e) => e.preventDefault());
    document.body.appendChild(this.menu);

    input.setAttribute("autocomplete", "off");
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-controls", this.listId);
    input.setAttribute("aria-expanded", "false");

    input.addEventListener("input", this.onInput);
    input.addEventListener("keydown", this.onKeyDown);
    input.addEventListener("blur", this.onBlur);
    input.addEventListener("focus", this.onFocus);
  }

  /** Same as the old widget: "place_changed" fires when a place is picked. */
  addListener(event: string, handler: () => void) {
    if (event === "place_changed") this.listeners.push(handler);
    return {
      remove: () => {
        this.listeners = this.listeners.filter((h) => h !== handler);
      },
    };
  }

  /** The picked place, in the old widget's shape. */
  getPlace(): LegacyPlace | null {
    return this.place;
  }

  /** Removes the list and the input's listeners. */
  dispose() {
    this.close();
    window.clearTimeout(this.timer);
    this.input.removeEventListener("input", this.onInput);
    this.input.removeEventListener("keydown", this.onKeyDown);
    this.input.removeEventListener("blur", this.onBlur);
    this.input.removeEventListener("focus", this.onFocus);
    this.menu.remove();
  }

  // ── Typing ────────────────────────────────────────────────────────────

  private onInput = () => {
    window.clearTimeout(this.timer);
    const text = this.input.value.trim();
    if (text.length < 2) {
      this.suggestions = [];
      this.close();
      return;
    }
    // Wait for a short pause in typing before asking Google.
    this.timer = window.setTimeout(() => this.fetch(text), 180);
  };

  private onFocus = () => {
    if (this.suggestions.length && this.input.value.trim().length >= 2) {
      this.show();
    }
  };

  private onBlur = () => this.close();

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.highlight((this.active + 1) % this.suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.highlight(
        (this.active - 1 + this.suggestions.length) % this.suggestions.length,
      );
    } else if (e.key === "Enter") {
      // Pick the highlighted one (or the first), and don't submit the form.
      e.preventDefault();
      void this.pick(this.active >= 0 ? this.active : 0);
    } else if (e.key === "Escape") {
      e.preventDefault();
      this.close();
    }
  };

  // ── Google ────────────────────────────────────────────────────────────

  private async fetch(text: string) {
    const request = ++this.request;
    try {
      const places = await placesLib();
      if (!this.token) this.token = new places.AutocompleteSessionToken();
      const { suggestions } =
        await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: text,
          sessionToken: this.token,
          locationBias: BIAS,
          ...(this.regions ? { includedRegionCodes: this.regions } : {}),
        });
      // A newer request has gone out since; ignore this one.
      if (request !== this.request) return;

      this.suggestions = (suggestions ?? [])
        .map((s: any) => s.placePrediction)
        .filter(Boolean)
        .map((p: any) => ({
          main: p.mainText?.text ?? p.text?.text ?? "",
          secondary: p.secondaryText?.text ?? "",
          text: p.text?.text ?? "",
          prediction: p,
        }));
      this.render();
    } catch (err) {
      if (request !== this.request) return;
      console.warn("[PlacesAutocomplete]", err);
      this.suggestions = [];
      this.close();
    }
  }

  private async pick(index: number) {
    const s = this.suggestions[index];
    if (!s) return;
    this.close();
    this.input.value = s.text;

    try {
      const place = s.prediction.toPlace();
      await place.fetchFields({
        fields: ["id", "formattedAddress", "location", "displayName"],
      });
      this.place = {
        place_id: place.id,
        formatted_address: place.formattedAddress ?? s.text,
        name: place.displayName ?? s.main,
        geometry: { location: place.location },
      };
      // The lookup ends the session; the next search starts a new one.
      this.token = null;
      this.suggestions = [];
      this.listeners.forEach((h) => h());
    } catch (err) {
      console.warn("[PlacesAutocomplete]", err);
    }
  }

  // ── The list ──────────────────────────────────────────────────────────

  private render() {
    this.list.replaceChildren();
    this.active = -1;
    if (!this.suggestions.length) {
      this.close();
      return;
    }
    this.suggestions.forEach((s, i) => {
      const li = document.createElement("li");
      li.className = "pa-item";
      li.id = `${this.listId}-${i}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");
      const main = document.createElement("span");
      main.className = "pa-main";
      main.textContent = s.main;
      li.appendChild(main);
      if (s.secondary) {
        const secondary = document.createElement("span");
        secondary.className = "pa-secondary";
        secondary.textContent = s.secondary;
        li.appendChild(secondary);
      }
      li.addEventListener("mouseenter", () => this.highlight(i));
      li.addEventListener("click", () => void this.pick(i));
      this.list.appendChild(li);
    });
    if (document.activeElement === this.input) this.show();
  }

  private highlight(index: number) {
    this.active = index;
    Array.from(this.list.children).forEach((li, i) =>
      li.setAttribute("aria-selected", i === index ? "true" : "false"),
    );
    this.input.setAttribute(
      "aria-activedescendant",
      index >= 0 ? `${this.listId}-${index}` : "",
    );
  }

  private positionMenu = () => {
    const r = this.input.getBoundingClientRect();
    this.menu.style.top = `${r.bottom + window.scrollY + 4}px`;
    this.menu.style.left = `${r.left + window.scrollX}px`;
    this.menu.style.width = `${r.width}px`;
  };

  private show() {
    this.positionMenu();
    this.menu.hidden = false;
    this.open = true;
    this.input.setAttribute("aria-expanded", "true");
    window.addEventListener("scroll", this.positionMenu, true);
    window.addEventListener("resize", this.positionMenu);
  }

  private close() {
    this.menu.hidden = true;
    this.open = false;
    this.input.setAttribute("aria-expanded", "false");
    this.input.removeAttribute("aria-activedescendant");
    window.removeEventListener("scroll", this.positionMenu, true);
    window.removeEventListener("resize", this.positionMenu);
  }
}
