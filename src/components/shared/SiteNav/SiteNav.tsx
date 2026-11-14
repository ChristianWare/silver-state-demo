"use client";

// The public site's nav.
//
// variant="overlay" (home page): transparent with light text over the hero
// image, then a white bar with dark text once the element with `heroId` has
// scrolled under the nav. variant="solid": the white bar from the start.
// At 1068px and below the links fold into a full-screen menu.
//
// Beside Book now: Log in when signed out, or Dashboard (the home for the
// signed-in role) and Log out when signed in. A thin bar along the bottom
// shows while a page loads.
//
// On admin pages (where it replaces the side nav at 1068px and below) the
// full-screen menu keeps its usual links and adds "Admin options" at the
// top. That slides a second panel in from the right: Operations,
// Customers, Money, Setup and Account, each opening its links below it,
// one at a time, starting on the section of the page you're on.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { signOut, useSession } from "next-auth/react";
import NavProgress from "@/components/shared/NavProgress/NavProgress";
import Users from "@/components/shared/icons/Users/Users";
import Driver from "@/components/shared/icons/Driver/Driver";
import SignOutLogo from "@/components/shared/icons/SignOutLogo/SignOutLogo";
import {
  ADMIN_NAV_GROUPS,
  isAdminNavActive,
  type AdminNavGroup,
} from "@/components/admin/AdminSideNav/adminNav";
import MountainIcon from "@/components/shared/icons/MountainIcon/MountainIcon";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import styles from "./SiteNav.module.css";

const LINKS = [
  { text: "Home", href: "/" },
  { text: "Services", href: "/services" },
  { text: "Fleet", href: "/fleet" },
  { text: "Airports", href: "/airports" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

type AppRole = "USER" | "ADMIN" | "DRIVER" | "CORPORATE";

/** Where "Dashboard" goes for the signed-in role. */
function dashboardFor(roles: AppRole[]): string {
  if (roles.includes("ADMIN")) return "/admin";
  if (roles.includes("DRIVER")) return "/driver-dashboard";
  if (roles.includes("CORPORATE")) return "/corporate";
  return "/dashboard";
}

const NAV_HEIGHT = 72;

/** The admin sections in the sub-menu: the side nav's groups, then Account
 *  (Log out is handled where it's drawn). */
const ADMIN_MENU_GROUPS: AdminNavGroup[] = [
  ...ADMIN_NAV_GROUPS,
  {
    label: "Account",
    items: [
      { title: "User dashboard", href: "/dashboard", icon: <Users /> },
      {
        title: "Driver dashboard",
        href: "/driver-dashboard",
        icon: <Driver />,
      },
    ],
  },
];

export default function SiteNav({
  variant = "solid",
  heroId = "hero",
}: {
  variant?: "overlay" | "solid";
  /** id of the element the overlay nav sits on top of. */
  heroId?: string;
}) {
  const pathname = usePathname() ?? "/";
  const [pastHero, setPastHero] = useState(false);
  // The menu remembers the page it was opened on, so it closes by itself
  // when a link takes you somewhere else.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const lenis = useLenis();
  const { data: session, status } = useSession();
  const roles = ((session?.user as { roles?: AppRole[] } | undefined)?.roles ??
    []) as AppRole[];
  const signedIn = status === "authenticated";
  const dashboardHref = dashboardFor(roles);
  const logOut = () => signOut({ callbackUrl: "/" });
  const menuOpen = menuOpenOn === pathname;
  const setMenuOpen = (open: boolean) => setMenuOpenOn(open ? pathname : null);
  // The admin sub-menu, remembered the same way, and its open section.
  const [adminOpenOn, setAdminOpenOn] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const adminOpen = menuOpen && adminOpenOn === pathname;

  // Solid once the hero's bottom edge has scrolled up under the nav.
  useEffect(() => {
    if (variant !== "overlay") return;
    const update = () => {
      const hero = document.getElementById(heroId);
      const bottom = hero
        ? hero.getBoundingClientRect().bottom
        : window.innerHeight - window.scrollY;
      setPastHero(bottom <= NAV_HEIGHT);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [variant, heroId]);

  // Lock page scroll and listen for Escape while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpenOn(null);
        setAdminOpenOn(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, lenis]);

  const solid = variant === "solid" || pastHero;
  const inAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const closeMenu = () => {
    setMenuOpen(false);
    setAdminOpenOn(null);
  };
  // The main menu's links are out of the tab order behind the sub-menu.
  const menuTab = menuOpen && !adminOpen ? 0 : -1;
  const subTab = adminOpen ? 0 : -1;

  // The sub-menu opens on the section of the page you're on.
  const openAdmin = () => {
    const current = ADMIN_MENU_GROUPS.find((g) =>
      g.items.some((i) => isAdminNavActive(pathname, i.href)),
    );
    setOpenGroup(current?.label ?? ADMIN_MENU_GROUPS[0].label);
    setAdminOpenOn(pathname);
  };
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`${styles.header} ${solid ? styles.solid : styles.overlay}`}
      >
        <nav className={styles.inner} aria-label='Main'>
          <Logo />

          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${isActive(l.href) ? styles.active : ""}`}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {/* Nothing until the session is known, so it doesn't flicker. */}
            {status === "loading" ? null : signedIn ? (
              <>
                <Link
                  href={dashboardHref}
                  className={`${styles.link} ${isActive(dashboardHref) ? styles.active : ""}`}
                >
                  Dashboard
                </Link>
                <button type='button' className={styles.link} onClick={logOut}>
                  Log out
                </button>
              </>
            ) : (
              <Link
                href='/login'
                className={`${styles.link} ${isActive("/login") ? styles.active : ""}`}
              >
                Log in
              </Link>
            )}

            <Link href='/book' className={styles.bookBtn}>
              Book now
              <span className={styles.bookBox} aria-hidden='true'>
                <Arrow className={styles.bookArrow} />
              </span>
            </Link>
          </div>

          <button
            type='button'
            className={styles.burger}
            aria-label='Open menu'
            aria-expanded={menuOpen}
            aria-controls='site-menu'
            onClick={() => {
              setAdminOpenOn(null);
              setMenuOpen(true);
            }}
          >
            <span />
            <span />
          </button>
        </nav>
        <NavProgress />
      </header>

      <div
        id='site-menu'
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
        data-lenis-prevent
        role='dialog'
        aria-modal='true'
        aria-label='Menu'
        aria-hidden={!menuOpen}
      >
        <div className={styles.menuTop}>
          <Logo dark onClick={closeMenu} />
          <button
            type='button'
            className={styles.close}
            aria-label='Close menu'
            onClick={closeMenu}
            tabIndex={menuTab}
          >
            <svg viewBox='0 0 24 24' width='18' height='18' aria-hidden='true'>
              <path
                d='M6 6l12 12M18 6L6 18'
                stroke='currentColor'
                strokeWidth='1.8'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>

        <ul className={styles.menuLinks}>
          {inAdmin ? (
            <li>
              <button
                type='button'
                className={`${styles.menuLink} ${styles.menuLinkAdmin}`}
                onClick={openAdmin}
                aria-expanded={adminOpen}
                aria-controls='admin-menu'
                tabIndex={menuTab}
              >
                Admin options
                <Arrow className={styles.menuLinkArrow} aria-hidden='true' />
              </button>
            </li>
          ) : null}
          {[
            ...LINKS,
            signedIn
              ? { text: "Dashboard", href: dashboardHref }
              : { text: "Log in", href: "/login" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={styles.menuLink}
                onClick={closeMenu}
                tabIndex={menuTab}
              >
                {l.text}
              </Link>
            </li>
          ))}
          {signedIn ? (
            <li>
              <button
                type='button'
                className={styles.menuLink}
                onClick={() => {
                  closeMenu();
                  logOut();
                }}
                tabIndex={menuTab}
              >
                Log out
              </button>
            </li>
          ) : null}
        </ul>

        <Link
          href='/book'
          className={styles.menuBook}
          onClick={closeMenu}
          tabIndex={menuTab}
        >
          Book now
          <span className={styles.bookBox} aria-hidden='true'>
            <Arrow className={styles.bookArrow} />
          </span>
        </Link>

        {/* The admin sub-menu, sliding in from the right. */}
        {inAdmin ? (
          <div
            id='admin-menu'
            className={`${styles.sub} ${adminOpen ? styles.subOpen : ""}`}
            data-lenis-prevent
            role='group'
            aria-label='Admin options'
            aria-hidden={!adminOpen}
          >
            <div className={styles.subTop}>
              <button
                type='button'
                className={styles.back}
                onClick={() => setAdminOpenOn(null)}
                tabIndex={subTab}
              >
                <Arrow className={styles.backArrow} aria-hidden='true' />
                Back
              </button>
              <button
                type='button'
                className={styles.close}
                aria-label='Close menu'
                onClick={closeMenu}
                tabIndex={subTab}
              >
                <svg
                  viewBox='0 0 24 24'
                  width='18'
                  height='18'
                  aria-hidden='true'
                >
                  <path
                    d='M6 6l12 12M18 6L6 18'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
            </div>

            <p className={styles.subEyebrow}>Admin options</p>

            <ul className={styles.subGroups}>
              {ADMIN_MENU_GROUPS.map((group) => {
                const open = openGroup === group.label;
                const panelId = `admin-menu-${group.label.toLowerCase()}`;
                const linkTab = adminOpen && open ? 0 : -1;
                return (
                  <li key={group.label} className={styles.subGroup}>
                    <button
                      type='button'
                      className={styles.subHeading}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenGroup(open ? null : group.label)}
                      tabIndex={subTab}
                    >
                      {group.label}
                      <svg
                        className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
                        viewBox='0 0 24 24'
                        width='20'
                        height='20'
                        aria-hidden='true'
                      >
                        <path
                          d='M6 9l6 6 6-6'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>

                    <div
                      id={panelId}
                      className={`${styles.subPanel} ${open ? styles.subPanelOpen : ""}`}
                      inert={!open}
                    >
                      <ul className={styles.subLinks}>
                        {group.items.map((item) => {
                          const active = isAdminNavActive(pathname, item.href);
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={`${styles.subLink} ${active ? styles.subLinkActive : ""}`}
                                aria-current={active ? "page" : undefined}
                                onClick={closeMenu}
                                tabIndex={linkTab}
                              >
                                <span
                                  className={styles.subIcon}
                                  aria-hidden='true'
                                >
                                  {item.icon}
                                </span>
                                {item.title}
                              </Link>
                            </li>
                          );
                        })}
                        {group.label === "Account" ? (
                          <li>
                            <button
                              type='button'
                              className={styles.subLink}
                              onClick={() => {
                                closeMenu();
                                logOut();
                              }}
                              tabIndex={linkTab}
                            >
                              <span
                                className={styles.subIcon}
                                aria-hidden='true'
                              >
                                <SignOutLogo />
                              </span>
                              Log out
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href='/admin/bookings/new'
              className={styles.menuBook}
              onClick={closeMenu}
              tabIndex={subTab}
            >
              New booking
              <span className={styles.bookBox} aria-hidden='true'>
                <Arrow className={styles.bookArrow} />
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}

function Logo({ dark, onClick }: { dark?: boolean; onClick?: () => void }) {
  return (
    <Link
      href='/'
      className={`${styles.logo} ${dark ? styles.logoDark : ""}`}
      onClick={onClick}
      aria-label='SS Black Car home'
    >
      <MountainIcon className={styles.logoIcon} />
      <span className={styles.logoText}>
        <span className={styles.logoName}>SS Black Car</span>
        <span className={styles.logoSub}>Las Vegas, NV</span>
      </span>
    </Link>
  );
}
