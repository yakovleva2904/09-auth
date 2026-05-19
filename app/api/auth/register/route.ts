import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/lib/api/api';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await api.post('/auth/register', body);

  const nextResponse = NextResponse.json(response.data);

  const setCookie = response.headers['set-cookie'];

  if (setCookie) {
    nextResponse.headers.set('set-cookie', setCookie.toString());
  }

  return nextResponse;
}