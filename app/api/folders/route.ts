import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        parentId: null, // Only get root folders
      },
      include: {
        files: true,
        children: {
          include: {
            files: true,
            children: true, // Recursively include all nested folders
          },
        },
      },
    });
    return NextResponse.json(folders);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, parentId } = await request.json();
    const folder = await prisma.folder.create({
      data: {
        name,
        parentId,
      },
      include: {
        files: true,
        children: true,
      },
    });
    return NextResponse.json(folder);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
  }
}