import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/context/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
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
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
        > */}
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
