'use client'

import { useSession } from "next-auth/react";
import { Auth } from "./auth";
import { User, Menu } from 'lucide-react';
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const username = session?.user?.username;

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-3 cursor-pointer md:hidden" />
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-2" />
              <span className="font-bold text-xl text-gray-800 dark:text-white">
                {username || 'Guest'}
              </span>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            {/* <Link href="/transactions" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Transactions</Link> */}
            {/* <Link href="/settings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</Link> */}
          </div>
          <div className="flex items-center">
            <Auth />
          </div>
        </div>
      </div>
    </nav>
  );
}