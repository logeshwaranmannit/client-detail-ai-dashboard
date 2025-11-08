import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { journals } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clientId = parseInt(id);
    
    const data = await db.query.journals.findMany({
      where: eq(journals.clientId, clientId),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching journals:', error);
    return NextResponse.json({ error: 'Failed to fetch journals' }, { status: 500 });
  }
}
