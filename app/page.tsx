"use client";

import Navbar from "@/components/NavBar";
import Card from "@/components/homepage/card";
import { useEffect, useState } from "react";

export default function Home() {

  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  // and can render the children
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col">
      <div className="top-0">
        <Navbar />
      </div>
      <div
        className="flex flex-col items-center justify-center h-screen"
        id="home"
      >
        <Card />
      </div>
    </div>
  );
}
