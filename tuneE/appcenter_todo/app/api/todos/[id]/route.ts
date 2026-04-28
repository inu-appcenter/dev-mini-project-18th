// PATCH, DELETE /api/todos/[id]
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://todo-server.inuappcenter.kr/';

// PATCH 요청 /api/todos/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// DELETE요청  /api/todos/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  // DELETE는 204 No Content를 반환할 수 있으므로
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
