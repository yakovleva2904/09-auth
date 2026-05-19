import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/lib/api/api';

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie');
  const { searchParams } = new URL(request.url);

  const response = await api.get('/notes', {
    headers: {
      Cookie: cookie || '',
    },
    params: {
      search: searchParams.get('search') || '',
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 12,
      tag: searchParams.get('tag') || undefined,
    },
  });

  return NextResponse.json(response.data);
}

export async function POST(request: NextRequest) {
  const cookie = request.headers.get('cookie');
  const body = await request.json();

  const response = await api.post('/notes', body, {
    headers: {
      Cookie: cookie || '',
    },
  });

  return NextResponse.json(response.data);
}