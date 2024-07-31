'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { IncomeButton } from "./incomebar";
import { ExpenseBar } from "./expensebar";
import Reset from "./reset";
import axios from "axios";
import { History } from 'lucide-react';

export default function Card() {
  const [left, setLeft] = useState(0)
  const [spent, setSpent] = useState(0)
  
  const getData = async () => {
    try {
      const response = await axios.get("/api/get-data")
      setLeft(response.data.message.left)
      setSpent(response.data.message.spent)
    } catch (error) {
      console.log(error);
      alert("Something went wrong while Fetching Data")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Financial Summary</h2>
          <Reset />
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg flex justify-between items-center">
            <span className="text-green-800 dark:text-green-200 font-medium">Money Left</span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-300">₹{(left - spent).toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg flex justify-between items-center">
            <span className="text-red-800 dark:text-red-200 font-medium">Money Spent</span>
            <span className="text-2xl font-bold text-red-600 dark:text-red-300">₹{spent.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <IncomeButton />
          <ExpenseBar />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/income" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
            <History className="mr-2 h-5 w-5" />
            Income History
          </Link>
          <Link href="/expenses" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
            <History className="mr-2 h-5 w-5" />
            Expense History
          </Link>
        </div>
      </div>
    </div>
  );
}