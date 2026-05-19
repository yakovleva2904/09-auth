import { NextResponse } from 'next/server';

import { api } from '@/lib/api/api';

export async function POST() {
  const response = await api.post('/auth/logout');

  const nextResponse = NextResponse.json({ message: 'Logged out' });

  const setCookie = response.headers['set-cookie'];

  if (setCookie) {
    nextResponse.headers.set('set-cookie', setCookie.toString());
  }

  return nextResponse;
}