import axios, { type AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});

serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  if (cookieHeader) {
    config.headers.Cookie = cookieHeader;
  }

  return config;
});

export async function getServerMe(): Promise<User | null> {
  try {
    const response = await serverApi.get<User>('/users/me');
    return response.data;
  } catch {
    return null;
  }
}

export async function getServerNoteById(id: string): Promise<Note> {
  const response = await serverApi.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function getServerNotes(
  search = '',
  page = 1,
  tag?: string
) {
  const response = await serverApi.get('/notes', {
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
  return serverApi.get('/auth/session');
}