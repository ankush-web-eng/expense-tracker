import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function Reset() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();
  const email = session?.user?.email;

  const handleReset = async () => {
    const isTrue = confirm("Are you sure you want to reset your data?")
    if (!isTrue) return;
    try {
      setIsSubmitting(true);
      const response = await axios.post<ApiResponse>("/api/reset", { email });
      toast({
        title: "Success",
        description: response.data.message,
      });
      setIsSubmitting(false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
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

  return <Button variant="destructive" onClick={handleReset}>
    {isSubmitting ? <span className="flex"><Loader2 className="animate-spin" />{"  "}Reseting</span> : "Reset"}
  </Button>;
}
