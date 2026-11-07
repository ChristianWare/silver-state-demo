// The home page hero: full-height photo in a 10px frame, the heading and
// subhead bottom left, the mini booking tool bottom right.

import Image from "next/image";
import HeroBooking from "../HeroBooking/HeroBooking";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id='hero' className={styles.hero}>
      <div className={styles.frame}>
        <Image
          src='/images/other/heroiii.jpg'
          alt='Black car waiting for a rider in Las Vegas'
          fill
          priority
          sizes='100vw'
          className={styles.img}
        />
        <div className={styles.overlay} aria-hidden='true' />
      </div>

      <div className={styles.content}>
        <div className={styles.copy}>
          <h1 className={styles.heading}>
            {/* The quiet way <br />
            through Las Vegas. */}
            Executive Black Car <br className={styles.br} />
            Service in Las Vegas
          </h1>
          <p className={styles.subhead}>
            Black car service in Las Vegas, from Harry Reid International to the
            Strip, Henderson, Summerlin and beyond. Your price shows before you
            book, and your chauffeur tracks your flight.
          </p>
        </div>
        <HeroBooking />
      </div>
    </section>
  );
}
