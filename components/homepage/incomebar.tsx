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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { incomeSchema } from "@/schemas/incomeSchema";
import axios, { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { useSession } from "next-auth/react";

export function IncomeButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const incomeData = incomeSchema.parse({
    username: username,
    source,
    amount: parseInt(amount),
  });

  const {data:session} = useSession();
  var username = session?.user?.username;
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post<ApiResponse>("/api/income", incomeData);

      toast({
        title: "Success",
        description: response.data.message,
      });

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your sign-up. Please try again.");

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Income</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
          <DialogDescription>
            Track your income by adding a new source of income.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Source
            </Label>
            <Input
              id="name"
              //   defaultValue="Pocket Money"
              className="col-span-3"
              placeholder="Pocket Money"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              How much?
            </Label>
            <Input
              id="username"
              type="number"
              placeholder="500"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
