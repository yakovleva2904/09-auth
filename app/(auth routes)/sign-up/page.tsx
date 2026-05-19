'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { register } from '@/lib/api/clientApi';

import { useAuthStore } from '@/lib/store/authStore';

import css from './SignUpPage.module.css';

export default function SignUpPage() {
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
      const user = await register({
        email: String(formData.get('email')),
        password: String(formData.get('password')),
      });

      setUser(user);

      router.push('/profile');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>
          Sign Up
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
            Sign Up
          </button>
        </div>
      </form>
    </main>
  );
}