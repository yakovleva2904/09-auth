import { api } from './api';

import type { User } from '@/types/user';
import type { NewNote, Note } from '@/types/note';

type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export async function fetchNotes(
  search = '',
  page = 1,
  tag?: string
): Promise<FetchNotesResponse> {
  const response = await api.get('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get(`/notes/${id}`);

  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await api.post('/notes', note);

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete(`/notes/${id}`);

  return response.data;
}

type AuthData = {
  email: string;
  password: string;
};

export async function register(data: AuthData): Promise<User> {
  const response = await api.post('/auth/register', data);

  return response.data;
}

export async function login(data: AuthData): Promise<User> {
  const response = await api.post('/auth/login', data);

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<User | null> {
  const response = await api.get('/auth/session');

  return response.data || null;
}

export async function getMe(): Promise<User> {
  const response = await api.get('/users/me');

  return response.data;
}

export async function updateMe(data: Partial<User>): Promise<User> {
  const response = await api.patch('/users/me', data);

  return response.data;
}