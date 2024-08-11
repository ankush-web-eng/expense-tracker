import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import AuthProvider from "@/context/AuthProvider";
import { Toaster } from '@/components/ui/toaster';
import { FinanceProvider } from "@/context/FinanceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Expense Tracker",
    template: "%s | Expense Tracker",
  },
  description: "Made with ❤️ by Ankush.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <FinanceProvider>
            <Toaster />
            {children}
          </FinanceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
