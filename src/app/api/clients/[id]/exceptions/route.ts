import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { exceptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clientId = parseInt(id);
    
    const data = await db.query.exceptions.findMany({
      where: eq(exceptions.clientId, clientId),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching exceptions:', error);
    return NextResponse.json({ error: 'Failed to fetch exceptions' }, { status: 500 });
  }
}
