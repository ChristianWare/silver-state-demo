"use client";

import SiteNav from "@/components/shared/SiteNav/SiteNav";
import styles from "./Nav.module.css";

/**
 * The signed-in areas (admin, dashboards, corporate), the payment and
 * password pages, the blog post and the 404 page use this. It's the site
 * nav (white bar, with Dashboard / Log out when signed in) plus a spacer the
 * height of the fixed bar, so these pages keep their own spacing under it.
 * The props are accepted so existing callers (`<Nav background="white" />`)
 * keep compiling; they have no effect.
 */
export interface NavProps {
  navItemColor?: string;
  color?: string;
  hamburgerColor?: string;
  background?: "white" | "cream" | "accent";
}

export default function Nav(props: NavProps) {
  void props; // accepted for compatibility, intentionally unused
  return (
    <>
      <SiteNav variant='solid' />
      <div className={styles.spacer} aria-hidden='true' />
    </>
  );
}
