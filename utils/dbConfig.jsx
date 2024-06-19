import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://Expense-Tracker_owner:eofi73AtGIMa@ep-shy-bonus-a54h4e67.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require');
export const db = drizzle(sql,{schema});