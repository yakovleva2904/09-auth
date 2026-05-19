import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/lib/api/api';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  const cookie = request.headers.get('cookie');
  const { id } = await params;

  const response = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookie || '',
    },
  });

  return NextResponse.json(response.data);
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  const cookie = request.headers.get('cookie');
  const { id } = await params;

  const response = await api.delete(`/notes/${id}`, {
    headers: {
      Cookie: cookie || '',
    },
  });

  return NextResponse.json(response.data);
}