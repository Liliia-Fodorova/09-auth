"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useEffect, useRef, useState } from "react";

export default function AuthNavigation() {
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuth = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    clearIsAuth();
    router.push("/sign-in");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return isAuthenticated ? (
    <>
      <div className={css.menuWrapper} ref={menuRef}>
        <button className={css.burger} onClick={() => setOpen((prev) => !prev)}>
          ☰
        </button>
        <div className={`${css.dropdown} ${open ? css.open : ''}`}>
          <ul className={css.navigation}>
            <li className={css.navigationItem}>
              <Link
                onClick={() => setOpen(false)}
                className={css.navigationLink}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                onClick={() => setOpen(false)}
                href="/profile"
                prefetch={false}
                className={css.navigationLink}
              >
                Profile
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                onClick={() => setOpen(false)}
                className={css.navigationLink}
                href="/notes/filter/all"
              >
                Notes
              </Link>
            </li>
            <li className={css.navigationItem}>
              <p className={css.userEmail}>{user?.email}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className={css.logoutButton}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.bigNav}>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/notes/filter/all">
              Notes
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
      <div className={css.menuWrapper} ref={menuRef}>
        <button className={css.burger} onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className={`${css.dropdown} ${open ? css.open : ''}`}>
          <ul className={css.navigation}>
            <li className={css.navigationItem}>
              <Link
                onClick={() => setOpen(false)}
                className={css.navigationLink}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                onClick={() => setOpen(false)}
                href="/sign-in"
                prefetch={false}
                className={css.navigationLink}
              >
                Login
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                onClick={() => setOpen(false)}
                href="/sign-up"
                prefetch={false}
                className={css.navigationLink}
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.bigNav}>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}