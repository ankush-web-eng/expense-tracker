import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/context/AuthProvider";

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
        <AuthProvider>{children}</AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
