'use client'
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

function useToaster() {
  const { toast } = useToast();


  const errorToast = useCallback((message: string) => {
    toast({
      description: message,
      variant: "destructive",
      className: "bg-red-700 text-white rounded-lg font-bold",
    });
  }, [])

  const normalToast = useCallback(
    (message: string) => {
      toast({
        description: message,
      });
    },
    [],
  )

  return {
    errorToast,
    normalToast,
  };
}

export default useToaster;
