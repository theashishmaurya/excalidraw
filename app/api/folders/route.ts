import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensures the route is treated as dynamic


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
    console.log(name,parentId,"Name and Parent Id")
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
    console.log(folder,"folder")
    return NextResponse.json(folder);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
  }
}