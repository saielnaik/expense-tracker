"use client"

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import {  PenBox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { db } from '@/utils/dbConfig'
import { Budget } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'



function EditBudget({budgetInfo, refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);
    const {user} = useUser();

    const onUpdateBudget = async () => {
        const result = await db.update(Budget).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budget.id, budgetInfo.id))
        .returning();

        if(result){
            refreshData()
            toast('Budget Updated!')
        }
    }
  return (
    <div>
                  <Dialog>
        <DialogTrigger asChild>
        <Button className="flex gap-2"> <PenBox/> Edit</Button>

        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button variant="outline" size="lg" className="text-lg"
                onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                <div className='absolute z-20'>
                  <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji)
                    setOpenEmojiPicker(false)
                  }}/>
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Name</h2>
                  <Input placeholder="e.g. Home Decor"
                  defaultValue={budgetInfo.name}
                  onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                  <Input placeholder="e.g. ₹5000"
                  type="number"
                  defaultValue={budgetInfo.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button
                disabled={!(name&&amount)}
                onClick={()=>onUpdateBudget()}
                className="mt-5 w-full">Update Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default EditBudget
