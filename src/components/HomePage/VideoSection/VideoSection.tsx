"use client";

// Home page: a "window" onto a video that stays still while the page
// scrolls past it. The video is fixed to the screen and clipped to this
// section, so it only shows through here. It sets up the service areas
// below: the desert just past the city, by the hour.

import { useEffect, useRef } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { HOURLY_MIN_HOURS } from "@/lib/booking/rules";
import styles from "./VideoSection.module.css";

// Rough drive times from the Strip.
const NEARBY = [
  { name: "Red Rock Canyon", time: "30 min" },
  { name: "Hoover Dam", time: "45 min" },
  { name: "Valley of Fire", time: "1 hr" },
];

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only play while the section is on screen, and not at all for
  // "reduce motion". We watch the section, not the video: the video is
  // position: fixed, so it always counts as on screen.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !reduced.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              sync();
            },
            { threshold: 0 },
          )
        : null;

    if (io) io.observe(section);
    else {
      onScreen = true;
      sync();
    }

    reduced.addEventListener("change", sync);
    return () => {
      io?.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby='video-heading'
    >
      <div className={styles.frame}>
        {/* Background video: fixed to the screen, seen through the frame */}
        <video
          ref={videoRef}
          className={styles.video}
          src='/videos/mesaii.mp4'
          poster='/videos/mesaii-poster.jpg'
          muted
          loop
          playsInline
          preload='metadata'
          aria-hidden='true'
        />
        <div className={styles.overlay} aria-hidden='true' />

        <LayoutWrapper>
          <div className={styles.content}>
            <PulseEyeBrow text='Beyond the Strip' color='white' />
            <h2 id='video-heading' className={styles.heading}>
              The desert starts where the city ends
            </h2>
            <p className={styles.copy}>
              Red rock, open road and a sky that goes on forever, all within an
              hour of your hotel. Book a chauffeur by the hour (from{" "}
              {HOURLY_MIN_HOURS} hours) and stop wherever the view tells you to.
            </p>
            <ul className={styles.nearby}>
              {NEARBY.map((n) => (
                <li key={n.name} className={styles.place}>
                  <span className={styles.placeName}>{n.name}</span>
                  <span className={styles.placeTime}>{n.time}</span>
                </li>
              ))}
            </ul>
            <ArrowButton
              href='/services/day-trips'
              text='Plan a day trip'
              className={styles.btn}
            />
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
