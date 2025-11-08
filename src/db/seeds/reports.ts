import { db } from '@/db';
import { reports } from '@/db/schema';

async function main() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twentyFiveDaysAgo = new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000);
    const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const sampleReports = [
        {
            clientId: 1,
            reportName: 'Q4 2023 Financial Statement',
            reportType: 'Financial Statement',
            generatedAt: thirtyDaysAgo.toISOString(),
            fileUrl: '/reports/acme-q4-2023-financial.pdf',
        },
        {
            clientId: 1,
            reportName: 'December 2023 Reconciliation Report',
            reportType: 'Reconciliation Report',
            generatedAt: fifteenDaysAgo.toISOString(),
            fileUrl: '/reports/acme-dec-2023-reconciliation.pdf',
        },
        {
            clientId: 1,
            reportName: 'Annual Audit Report 2023',
            reportType: 'Audit Report',
            generatedAt: sevenDaysAgo.toISOString(),
            fileUrl: '/reports/acme-audit-2023.pdf',
        },
        {
            clientId: 2,
            reportName: 'Q4 2023 Financial Statement',
            reportType: 'Financial Statement',
            generatedAt: twentyFiveDaysAgo.toISOString(),
            fileUrl: '/reports/techstart-q4-2023-financial.pdf',
        },
        {
            clientId: 2,
            reportName: 'November 2023 Reconciliation Report',
            reportType: 'Reconciliation Report',
            generatedAt: tenDaysAgo.toISOString(),
            fileUrl: '/reports/techstart-nov-2023-reconciliation.pdf',
        },
        {
            clientId: 2,
            reportName: 'Mid-Year Review Report 2023',
            reportType: 'Audit Report',
            generatedAt: fiveDaysAgo.toISOString(),
            fileUrl: '/reports/techstart-midyear-2023.pdf',
        },
    ];

    await db.insert(reports).values(sampleReports);
    
    console.log('✅ Reports seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});