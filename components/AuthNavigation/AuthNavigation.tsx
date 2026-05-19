'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api/clientApi';

import { useAuthStore } from '@/lib/store/authStore';

import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();

  const isAuthenticated = useAuthStore(
    state => state.isAuthenticated
  );

  const user = useAuthStore(state => state.user);

  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    try {
      await logout();

      clearIsAuthenticated();
      router.push('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link
            href="/profile"
            className={css.navigationLink}
          >
            Profile
          </Link>
        </li>

        <li className={css.navigationItem}>
          <span className={css.userEmail}>
            {user?.email}
          </span>

          <button
            type="button"
            className={css.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          className={css.navigationLink}
        >
          Sign In
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          className={css.navigationLink}
        >
          Sign Up
        </Link>
      </li>
    </>
  );
}