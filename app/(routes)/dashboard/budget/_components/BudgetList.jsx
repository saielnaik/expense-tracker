"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budget, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

function BudgetList() {

  const [budgetList, setBudgetList] = useState([]);

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
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <CreateBudget refreshData={() => getBudgetList()}/>
      { budgetList?.length>0? budgetList.map((budget, index) => (
        <BudgetItem budget={budget}/>
      ))
      :[1,2,3,4,5].map((item, index) => (
        <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>
        </div>
      ))}
      </div>
    </div>
  )
}

export default BudgetList
