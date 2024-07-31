'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/model/User";
import axios from "axios";

interface FinanceContextType {
  user: User | null;
  handleSync: () => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSync = () => {
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <FinanceContext.Provider value={{ user, handleSync }}>
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
