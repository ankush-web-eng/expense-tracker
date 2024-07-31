import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Loader2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { useFinance } from "@/context/FinanceContext";

export function ExpenseBar() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const {handleSync} = useFinance()

  const handleSubmit = async () => {
    if (!source || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post<ApiResponse>("/api/expense", {
        email: session?.user?.email,
        source,
        amount: parseInt(amount),
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      handleSync()
      setIsSubmitting(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Expense Addition Failed",
        description: axiosError.response?.data.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-red-500 hover:bg-red-600 text-white">
          <DollarSign className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Record where and how much you spent.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="source" className="text-right">
              Expense Source
            </Label>
            <Input
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., Groceries"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Expense...
              </>
            ) : (
              "Add Expense"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}