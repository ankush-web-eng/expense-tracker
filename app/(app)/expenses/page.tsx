"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Expense from "@/components/expense";
import { Loader2, AlertCircle } from "lucide-react";
import { TransactionType } from "@/model/User";

interface Expense {
  source: string;
  amount: number;
  date: Date;
  type: TransactionType;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/get-expense");
      setExpenses(response.data.message);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setError("Failed to fetch expenses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">Loading expenses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        <AlertCircle className="h-8 w-8 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Expenses</h1>
        {expenses && expenses.length > 0 ? (
          <div className="space-y-4">
            {expenses.map((expense, index) => (
              <Expense key={index}>{expense}</Expense>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No expenses found. Start adding your expenses!
          </p>
        )}
      </div>
    </div>
  );
}