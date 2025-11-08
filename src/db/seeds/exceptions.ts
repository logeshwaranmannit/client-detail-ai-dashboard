import { db } from '@/db';
import { exceptions } from '@/db/schema';

async function main() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

    const sampleExceptions = [
        {
            clientId: 1,
            type: 'Amount Mismatch',
            description: 'Bank statement shows $423,567.25 but ledger shows $423,557.25 for accounts payable',
            severity: 'Medium',
            status: 'In Review',
            createdAt: oneDayAgo.toISOString(),
        },
        {
            clientId: 1,
            type: 'Missing Document',
            description: 'Invoice #INV-2024-456 referenced in journal entry but not attached',
            severity: 'Low',
            status: 'Open',
            createdAt: threeHoursAgo.toISOString(),
        },
        {
            clientId: 2,
            type: 'Date Discrepancy',
            description: 'Revenue recognized in Q1 but contract signed in Q2',
            severity: 'High',
            status: 'Open',
            createdAt: fiveDaysAgo.toISOString(),
        },
        {
            clientId: 2,
            type: 'Amount Mismatch',
            description: 'Deferred revenue calculation differs by $2,500 between systems',
            severity: 'High',
            status: 'In Review',
            createdAt: fourDaysAgo.toISOString(),
        },
        {
            clientId: 2,
            type: 'Missing Document',
            description: 'Purchase order for equipment not provided',
            severity: 'Medium',
            status: 'Open',
            createdAt: threeDaysAgo.toISOString(),
        },
        {
            clientId: 2,
            type: 'Amount Mismatch',
            description: 'Marketing expense total differs from approved budget',
            severity: 'Low',
            status: 'In Review',
            createdAt: twoDaysAgo.toISOString(),
        },
        {
            clientId: 2,
            type: 'Date Discrepancy',
            description: 'Payment date in system differs from bank transaction date',
            severity: 'Medium',
            status: 'Open',
            createdAt: oneDayAgo.toISOString(),
        },
    ];

    await db.insert(exceptions).values(sampleExceptions);
    
    console.log('✅ Exceptions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});