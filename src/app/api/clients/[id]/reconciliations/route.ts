import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reconciliations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clientId = parseInt(id);
    
    const data = await db.query.reconciliations.findMany({
      where: eq(reconciliations.clientId, clientId),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching reconciliations:', error);
    return NextResponse.json({ error: 'Failed to fetch reconciliations' }, { status: 500 });
  }
}
