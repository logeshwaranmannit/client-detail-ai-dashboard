import { db } from '@/db';
import { clients } from '@/db/schema';

async function main() {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const sampleClients = [
        {
            id: 1,
            name: 'Acme Corporation',
            industry: 'Manufacturing',
            status: 'Active',
            aiSummary: 'Acme Corporation demonstrates strong financial health with consistent revenue growth and excellent compliance metrics. Recent reconciliation activities show high accuracy with minimal exceptions. The company maintains robust internal controls and timely reporting practices.',
            reconciliationProgress: 94,
            exceptionCount: 2,
            confidenceScore: 92,
            dataFreshness: '2 hours ago',
            signOffReadiness: 'Ready',
            createdAt: ninetyDaysAgo.toISOString(),
        },
        {
            id: 2,
            name: 'TechStart Inc',
            industry: 'Technology',
            status: 'Active',
            aiSummary: 'TechStart Inc is a growing technology company with moderate reconciliation progress. Several exceptions require attention, primarily related to revenue recognition and expense categorization. The company is working towards improving data quality and control processes.',
            reconciliationProgress: 78,
            exceptionCount: 5,
            confidenceScore: 75,
            dataFreshness: 'Real-time',
            signOffReadiness: 'Pending Review',
            createdAt: sixtyDaysAgo.toISOString(),
        }
    ];

    await db.insert(clients).values(sampleClients);
    
    console.log('✅ Clients seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});