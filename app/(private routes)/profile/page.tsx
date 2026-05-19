import type { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { getServerMe } from '@/lib/api/serverApi';

import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile page',
};

export default async function ProfilePage() {
  const user = await getServerMe();

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
          <h1 className={css.formTitle}>
            Profile
          </h1>

          <Link
            href="/profile/edit"
            className={css.editProfileButton}
          >
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