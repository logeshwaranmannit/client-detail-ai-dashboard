import { db } from '@/db';
import { reconciliations } from '@/db/schema';

async function main() {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000);
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);

    const sampleReconciliations = [
        {
            clientId: 1,
            accountName: 'Cash - Operating Account',
            amount: 245678.50,
            status: 'Completed',
            lastUpdated: twoHoursAgo.toISOString(),
        },
        {
            clientId: 1,
            accountName: 'Accounts Receivable',
            amount: 892340.75,
            status: 'Completed',
            lastUpdated: threeHoursAgo.toISOString(),
        },
        {
            clientId: 1,
            accountName: 'Inventory',
            amount: 567890.00,
            status: 'Completed',
            lastUpdated: oneDayAgo.toISOString(),
        },
        {
            clientId: 1,
            accountName: 'Accounts Payable',
            amount: -423567.25,
            status: 'In Progress',
            lastUpdated: thirtyMinutesAgo.toISOString(),
        },
        {
            clientId: 2,
            accountName: 'Cash - Operating Account',
            amount: 134567.80,
            status: 'Completed',
            lastUpdated: now.toISOString(),
        },
        {
            clientId: 2,
            accountName: 'Accounts Receivable',
            amount: 456789.20,
            status: 'In Progress',
            lastUpdated: oneHourAgo.toISOString(),
        },
        {
            clientId: 2,
            accountName: 'Deferred Revenue',
            amount: 234500.00,
            status: 'Pending',
            lastUpdated: fourHoursAgo.toISOString(),
        },
        {
            clientId: 2,
            accountName: 'Equipment & Assets',
            amount: 678900.50,
            status: 'Completed',
            lastUpdated: sixHoursAgo.toISOString(),
        },
    ];

    await db.insert(reconciliations).values(sampleReconciliations);
    
    console.log('✅ Reconciliations seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});