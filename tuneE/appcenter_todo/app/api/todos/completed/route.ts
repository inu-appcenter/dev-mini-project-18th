// PATCH /api/todos/completed
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://todo-server.inuappcenter.kr/';

// PATCH 요청 /api/todos/[id]/completed
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const res = await fetch(`${API_URL}/todos/${id}/completed`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
