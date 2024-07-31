"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Income from "@/components/income";
import { Loader2, AlertCircle, DollarSign } from "lucide-react";

interface IncomeItem {
  source: string;
  amount: number;
  date: Date;
}

export default function IncomePage() {
  const [incomes, setIncomes] = useState<IncomeItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncomes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/get-income");
      setIncomes(response.data.message);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch income data:", error);
      setError("Failed to fetch income data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        <span className="ml-2 text-lg">Loading income data...</span>
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <DollarSign className="h-8 w-8 mr-2 text-green-500" />
          Your Income
        </h1>
        {incomes && incomes.length > 0 ? (
          <div className="space-y-4">
            {incomes.map((income, index) => (
              <Income key={index}>{income}</Income>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No income records found. Start adding your income sources!
          </p>
        )}
      </div>
    </div>
  );
}