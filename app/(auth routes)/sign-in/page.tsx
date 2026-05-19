'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/lib/api/clientApi';

import { useAuthStore } from '@/lib/store/authStore';

import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();

  const setUser = useAuthStore(state => state.setUser);

  const [error, setError] = useState('');

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError('');

    const formData = new FormData(event.currentTarget);

    try {
      const user = await login({
        email: String(formData.get('email')),
        password: String(formData.get('password')),
      });

      setUser(user);

      router.push('/profile');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>
          Sign In
        </h1>

        <label className={css.formGroup}>
          Email

          <input
            className={css.input}
            name="email"
            type="email"
            required
          />
        </label>

        <label className={css.formGroup}>
          Password

          <input
            className={css.input}
            name="password"
            type="password"
            required
          />
        </label>

        {error && (
          <p className={css.error}>
            {error}
          </p>
        )}

        <div className={css.actions}>
          <button
            className={css.submitButton}
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}