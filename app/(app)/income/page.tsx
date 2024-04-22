"use client";

import Navbar from "@/components/NavBar";
import Income from "@/components/income";
import axios from "axios";
import { useEffect, useState } from "react";

interface Income {
  source: string;
  amount: number;
  date: string;
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [expenses, setExpenses] = useState<Income[] | null>(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/api/get-income");
      setExpenses(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch expenses");
    }
  };

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
              <Income key={index}>{expense}</Income>
            ))}
        </div>
      </div>
    </div>
  );
}
