import MountainIcon from "../icons/MountainIcon/MountainIcon";
import styles from "./LoadingPulse.module.css";

/** Full-screen loading state: the mountains logo from the nav, pulsing. */
export default function LoadingPulse() {
  return (
    <div className={styles.container} role='status' aria-label='Loading'>
      <MountainIcon className={styles.thunderIcon} aria-hidden='true' />
    </div>
  );
}
