import { type AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

import { api } from './api';

import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export async function getServerMe(): Promise<User | null> {
  try {
    const cookieStore = await cookies();

    const response = await api.get<User>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function getServerNoteById(
  id: string
): Promise<Note> {
  const cookieStore = await cookies();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function getServerNotes(
  search = '',
  page = 1,
  tag?: string
) {
  const cookieStore = await cookies();

  const response = await api.get('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      search,
      page,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
}

export async function checkServerSession(): Promise<AxiosResponse> {
  const cookieStore = await cookies();

  return api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
}