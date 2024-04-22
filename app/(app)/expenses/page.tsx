"use client";

import Navbar from "@/components/NavBar";
import Expense from "@/components/expense";
import axios from "axios";
import { useEffect, useState } from "react";

interface Expense {
  source: string;
  amount: number;
  date: string;
}

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/api/get-expense");
      setExpenses(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch expenses");
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetchExpenses();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-screen w-screen flex-col">
      <Navbar />
      <div className=" flex justify-center">
        <div className="flex flex-col gap-4">
          {expenses !== null &&
            expenses?.map((expense, index) => (
              <Expense key={index}>{expense}</Expense>
            ))}
        </div>
      </div>
    </div>
  );
}
