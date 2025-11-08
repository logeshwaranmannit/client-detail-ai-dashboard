import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const clients = sqliteTable('clients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  industry: text('industry').notNull(),
  status: text('status').notNull(),
  aiSummary: text('ai_summary').notNull(),
  reconciliationProgress: integer('reconciliation_progress').notNull(),
  exceptionCount: integer('exception_count').notNull(),
  confidenceScore: integer('confidence_score').notNull(),
  dataFreshness: text('data_freshness').notNull(),
  signOffReadiness: text('sign_off_readiness').notNull(),
  createdAt: text('created_at').notNull(),
});

export const reconciliations = sqliteTable('reconciliations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').notNull().references(() => clients.id),
  accountName: text('account_name').notNull(),
  amount: real('amount').notNull(),
  status: text('status').notNull(),
  lastUpdated: text('last_updated').notNull(),
});

export const journals = sqliteTable('journals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').notNull().references(() => clients.id),
  entryNumber: text('entry_number').notNull(),
  description: text('description').notNull(),
  debit: real('debit').notNull(),
  credit: real('credit').notNull(),
  date: text('date').notNull(),
});

export const exceptions = sqliteTable('exceptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').notNull().references(() => clients.id),
  type: text('type').notNull(),
  description: text('description').notNull(),
  severity: text('severity').notNull(),
  status: text('status').notNull(),
  createdAt: text('created_at').notNull(),
});

export const reports = sqliteTable('reports', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').notNull().references(() => clients.id),
  reportName: text('report_name').notNull(),
  reportType: text('report_type').notNull(),
  generatedAt: text('generated_at').notNull(),
  fileUrl: text('file_url').notNull(),
});