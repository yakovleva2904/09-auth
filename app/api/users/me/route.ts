import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/lib/api/api';

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie');

  const response = await api.get('/users/me', {
    headers: {
      Cookie: cookie || '',
    },
  });

  return NextResponse.json(response.data);
}

export async function PATCH(request: NextRequest) {
  const cookie = request.headers.get('cookie');
  const body = await request.json();

  const response = await api.patch('/users/me', body, {
    headers: {
      Cookie: cookie || '',
    },
  });

  return NextResponse.json(response.data);
}