'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Expenses {
  left: number;
  spent: number;
}

interface FinanceContextType {
  expenses:  Expenses | null;
  handleSync: () => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expenses | null>(null);

  const getFinance = async () => {
    try {
      const response = await axios.get("/api/get-data");
      setExpenses(response.data.message);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSync = () => {
    getFinance();
  };

  useEffect(() => {
    getFinance();
  }, []);

  return (
    <FinanceContext.Provider value={{ expenses, handleSync }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = (): FinanceContextType => {
  const context = useContext(FinanceContext);
  if (context === null) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};
