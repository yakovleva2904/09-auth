import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/lib/api/api';

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie');

  const response = await api.get('/auth/session', {
    headers: {
      Cookie: cookie || '',
    },
  });

  return NextResponse.json(response.data);
}