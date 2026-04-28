// GET, POST /api/todos
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://todo-server.inuappcenter.kr/';

// GET 요청 /api/todos?date=sort=createdAt&2026-04-28
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.toString();

  const res = await fetch(`${API_URL}/todos?${query}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// POST 요청 /api/todos
export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
