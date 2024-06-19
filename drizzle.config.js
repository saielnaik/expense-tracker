
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Expense-Tracker_owner:eofi73AtGIMa@ep-shy-bonus-a54h4e67.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require',
    }
  };
  