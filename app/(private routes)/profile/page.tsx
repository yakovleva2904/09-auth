'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/authStore';

import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Profile</h1>
          <p>User not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Email: {user.email}</p>

          <div className={css.usernameWrapper}>
            <p>Username: {user.username}</p>
          </div>
        </div>
      </div>
    </main>
  );
}