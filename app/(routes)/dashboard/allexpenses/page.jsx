"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budget, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import ExpenseListTable from '../expenses/_components/ExpenseListTable'


function page() {
  const [expenseList, setExpenseList] = useState([]);

const {user} = useUser();

useEffect(() =>{
  user&&getAllExpenses();
}, [user])



const getAllExpenses = async () => {
  const result = await db.select({
    id:Expenses.id,
    name:Expenses.name,
    amount:Expenses.amount,
    createdAy:Expenses.createdAy
  })
  .from(Budget)
  .rightJoin(Expenses,eq(Budget.id,Expenses.budgetId))
  .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
  .orderBy(desc(Expenses.id));
  setExpenseList(result);
}

  return (
    <div>
      <ExpenseListTable expensesList={expenseList} refreshData={() => getBudgetList()}/>
    </div>
  )
}

export default page
