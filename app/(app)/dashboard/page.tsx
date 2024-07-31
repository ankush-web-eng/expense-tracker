import Card from "@/components/homepage/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "See all your financial transactions here",
};

export default function Home() {
  return (
    <div
      className="flex justify-center pt-16"
      id="home"
    >
      <Card />
    </div>
  );
}
