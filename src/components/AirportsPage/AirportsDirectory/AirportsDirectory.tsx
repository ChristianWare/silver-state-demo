// /airports: every public airport in Nevada's national airport system, in
// three tables (commercial, private aviation, regional). Ivory cards in the
// style of the fleet comparison; each row becomes a small block on phones.

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { DIRECTORY_GROUPS, NEVADA_AIRPORTS } from "@/lib/nevadaAirports";
import styles from "./AirportsDirectory.module.css";

export default function AirportsDirectory() {
  return (
    <section className={styles.section} id='all-airports'>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='Every airport' />
            <h2 className={styles.heading}>
              All of Nevada&apos;s
              <br />
              airports.
            </h2>
          </div>
          <p className={styles.intro}>
            Codes, categories, 2024 passenger boardings and rough drive times
            from the Strip, for every public airport in the state&apos;s
            national airport system.
          </p>
        </div>

        {DIRECTORY_GROUPS.map((g) => {
          const rows = NEVADA_AIRPORTS.filter((a) => a.group === g.key);
          return (
            <div key={g.key} className={styles.group}>
              <div className={styles.groupHead}>
                <h3 className={`${styles.groupTitle} h4`}>{g.heading}</h3>
                <p className={styles.groupBlurb}>{g.blurb}</p>
              </div>

              <div className={styles.card}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th scope='col'>Code</th>
                      <th scope='col'>Airport</th>
                      <th scope='col'>City</th>
                      <th scope='col'>Category</th>
                      <th scope='col' className={styles.num}>
                        2024 boardings
                      </th>
                      <th scope='col' className={styles.num}>
                        From the Strip
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((a) => (
                      <tr key={a.faa}>
                        <td data-label='Code'>
                          <span className={styles.code}>{a.iata ?? a.faa}</span>
                        </td>
                        <td data-label='Airport' className={styles.airport}>
                          <span className={styles.name}>{a.name}</span>
                          {a.note && (
                            <span className={styles.note}>{a.note}</span>
                          )}
                          <span className={styles.codes}>
                            FAA {a.faa}
                            {a.iata && a.iata !== a.faa
                              ? ` · IATA ${a.iata}`
                              : ""}
                            {a.icao ? ` · ICAO ${a.icao}` : ""}
                          </span>
                        </td>
                        <td data-label='City'>{a.city}</td>
                        <td data-label='Category'>{a.role}</td>
                        <td data-label='2024 boardings' className={styles.num}>
                          <span className={styles.fig}>
                            {a.enplanements != null
                              ? a.enplanements.toLocaleString("en-US")
                              : "—"}
                          </span>
                        </td>
                        <td data-label='From the Strip' className={styles.num}>
                          <span className={styles.fig}>{a.drive ?? "—"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        <p className={styles.source}>
          Boardings are FAA calendar-year 2024 passenger enplanements. Drive
          times are rough, from the middle of the Strip without traffic.
        </p>
      </LayoutWrapper>
    </section>
  );
}
