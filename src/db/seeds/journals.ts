import { db } from '@/db';
import { journals } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const sampleJournals = [
        // Client 1 (Acme Corporation) journals
        {
            clientId: 1,
            entryNumber: 'JE-2024-001',
            description: 'Monthly salary expenses',
            debit: 125000.00,
            credit: 0.00,
            date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 1,
            entryNumber: 'JE-2024-002',
            description: 'Cash deposit from customer',
            debit: 0.00,
            credit: 45000.00,
            date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 1,
            entryNumber: 'JE-2024-003',
            description: 'Equipment purchase',
            debit: 78500.00,
            credit: 0.00,
            date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 1,
            entryNumber: 'JE-2024-004',
            description: 'Utility expenses',
            debit: 5600.00,
            credit: 0.00,
            date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 1,
            entryNumber: 'JE-2024-005',
            description: 'Revenue recognition adjustment',
            debit: 0.00,
            credit: 12300.00,
            date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        // Client 2 (TechStart Inc) journals
        {
            clientId: 2,
            entryNumber: 'JE-2024-101',
            description: 'Software license revenue',
            debit: 0.00,
            credit: 25000.00,
            date: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 2,
            entryNumber: 'JE-2024-102',
            description: 'Cloud infrastructure costs',
            debit: 8900.00,
            credit: 0.00,
            date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 2,
            entryNumber: 'JE-2024-103',
            description: 'Marketing expenses',
            debit: 15600.00,
            credit: 0.00,
            date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 2,
            entryNumber: 'JE-2024-104',
            description: 'Customer payment received',
            debit: 0.00,
            credit: 34500.00,
            date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            clientId: 2,
            entryNumber: 'JE-2024-105',
            description: 'Office rent payment',
            debit: 4200.00,
            credit: 0.00,
            date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(journals).values(sampleJournals);
    
    console.log('✅ Journals seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});