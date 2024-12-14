import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, folderId, content } = await request.json();
    const file = await prisma.file.create({
      data: {
        name,
        folderId,
        content,
      },
    });
    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, content } = await request.json();
    const file = await prisma.file.update({
      where: { id },
      data: { content },
    });
    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 });
  }
}