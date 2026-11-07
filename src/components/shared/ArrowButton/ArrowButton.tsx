import Link from "next/link";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import styles from "./ArrowButton.module.css";

interface Props {
  href: string;
  text: string;
  /**
   * "gold": gold button, midnight box, gold arrow (the hero's Book now).
   * "midnight": midnight button, gold box, midnight arrow.
   */
  variant?: "gold" | "midnight";
  className?: string;
}

/**
 * <ArrowButton href='/book' text='Book now' />
 * <ArrowButton href='/book' text='Book now' variant='midnight' />
 */
export default function ArrowButton({
  href,
  text,
  variant = "gold",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`${styles.btn} ${styles[variant]} ${className}`}
    >
      {text}
      <span className={styles.box} aria-hidden='true'>
        <Arrow className={styles.arrow} />
      </span>
    </Link>
  );
}
