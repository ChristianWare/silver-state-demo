// Home page: where we drive. The valley as a list of areas with rough drive
// times, then the road out to the day trips, ending at the mountain.

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import MountainIcon from "@/components/shared/icons/MountainIcon/MountainIcon";
import styles from "./ServiceAreasSection.module.css";

type Area = {
  name: string;
  copy: string;
  /** Drive time from Harry Reid (LAS). */
  fromLas: string;
  /** Drive time from the middle of the Strip. */
  fromStrip: string;
  tag?: string;
};

// Rough drive times without traffic.
const AREAS: Area[] = [
  {
    name: "The Strip",
    copy: "Resorts, casinos, the Convention Center and the Sphere.",
    fromLas: "10 min",
    fromStrip: "Here",
    tag: "Most booked",
  },
  {
    name: "Downtown",
    copy: "Fremont Street, the Arts District and the courthouse.",
    fromLas: "15 min",
    fromStrip: "10 min",
  },
  {
    name: "Henderson",
    copy: "Green Valley, the M Resort and Henderson Executive Airport.",
    fromLas: "15 min",
    fromStrip: "20 min",
  },
  {
    name: "Summerlin",
    copy: "Red Rock Casino, Downtown Summerlin and the golf courses.",
    fromLas: "25 min",
    fromStrip: "20 min",
  },
  {
    name: "North Las Vegas",
    copy: "Nellis, Aliante and North Las Vegas Airport.",
    fromLas: "20 min",
    fromStrip: "20 min",
  },
  {
    name: "Boulder City",
    copy: "The old town, and the last stop before Hoover Dam.",
    fromLas: "30 min",
    fromStrip: "35 min",
  },
  {
    name: "Lake Las Vegas",
    copy: "Lakeside resorts, the marina and the golf.",
    fromLas: "30 min",
    fromStrip: "30 min",
  },
];

const DAY_TRIPS = [
  { name: "Hoover Dam", copy: "About 45 minutes each way" },
  { name: "Grand Canyon West Rim", copy: "About 2½ hours each way" },
  { name: "Zion National Park", copy: "About 2½ hours each way" },
  { name: "Death Valley", copy: "About 2 hours each way" },
];

export default function ServiceAreasSection() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='Where we drive' />
            <h2 className={styles.heading}>
              All of the Las Vegas Valley → and the road trips beyond it
            </h2>
          </div>
          <p className={styles.intro}>
            The Strip, Downtown, Henderson, Summerlin, North Las Vegas, Boulder
            City and Lake Las Vegas, plus day trips to Hoover Dam, the Grand
            Canyon West Rim, Zion and Death Valley.
          </p>
        </div>

        <ul className={styles.areas}>
          {AREAS.map((a) => (
            <li
              key={a.name}
              className={`${styles.area} ${a.tag ? styles.areaFeatured : ""}`}
            >
              {a.tag && <span className={styles.tag}>{a.tag}</span>}
              <h3 className={`${styles.name} h4`}>{a.name}</h3>
              <p className={styles.copy}>{a.copy}</p>
              <p className={`${styles.fig} ${styles.figLas}`}>
                <span className={styles.figLabel}>From LAS</span>
                <span className={styles.figValue}>{a.fromLas}</span>
              </p>
              <p className={`${styles.fig} ${styles.figStrip}`}>
                <span className={styles.figLabel}>From the Strip</span>
                <span className={styles.figValue}>{a.fromStrip}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className={styles.note}>Rough drive times, without traffic.</p>

        <div className={styles.road} aria-hidden='true'>
          <span className={styles.roadLabel}>Day trips</span>
          <span className={styles.roadLine} />
          <MountainIcon className={styles.roadIcon} />
        </div>

        <ul className={styles.trips}>
          {DAY_TRIPS.map((t) => (
            <li key={t.name} className={styles.trip}>
              <h3 className={styles.tripName}>{t.name}</h3>
              <p className={styles.tripCopy}>{t.copy}</p>
            </li>
          ))}
        </ul>

        <ArrowButton
          href='/locations'
          text='See service areas'
          variant='midnight'
          className={styles.btn}
        />
      </LayoutWrapper>
    </section>
  );
}
