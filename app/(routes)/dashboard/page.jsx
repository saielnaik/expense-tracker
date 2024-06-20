"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budget, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budget/_components/BudgetItem'
import ExpenseListTable from './expenses/_components/ExpenseListTable'


function page() {

  const [budgetList, setBudgetList] = useState([]);

  const [expenseList, setExpenseList] = useState([]);

  const {user} = useUser();

  useEffect(() =>{
    user&&getBudgetList();
  }, [user])

  const getBudgetList = async () => {

    const result = await db.select({
      ...getTableColumns(Budget),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number),
    }).from(Budget)
    .leftJoin(Expenses,eq(Budget.id, Expenses.budgetId))
    .where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budget.id)
    .orderBy(desc(Budget.id));
    setBudgetList(result);
    getAllExpenses();
  }

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
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what happening with your money. Lets manage your expense</p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList}/>
          <ExpenseListTable expensesList={expenseList} refreshData={() => getBudgetList()}/>
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.map((budget, index)=>(
            <BudgetItem budget={budget} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
