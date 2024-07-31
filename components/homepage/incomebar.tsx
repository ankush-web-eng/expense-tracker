import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Loader2, PlusCircle } from "lucide-react";
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

export function IncomeButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

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
      const response = await axios.post<ApiResponse>("/api/income", {
        email: session?.user?.email,
        source,
        amount: parseInt(amount),
      });

      toast({
        title: "Income Added Successfully",
        description: response.data.message,
        variant: "default",
      });

      setIsSubmitting(false);
      setSource("");
      setAmount("");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding income:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Income Addition Failed",
        description: axiosError.response?.data.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-green-500 hover:bg-green-600 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Income
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
          <DialogDescription>
            Track your income by adding a new source.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="source" className="text-right">
              Source
            </Label>
            <Input
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., Salary"
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
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-green-500 hover:bg-green-600">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Income...
              </>
            ) : (
              "Add Income"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}