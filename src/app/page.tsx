"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

const page = () => {
  const invokeMutation = trpc.invoke.useMutation({
    onSuccess: (data) => {
      toast.success("Background job invoked successfully!");
      console.log("Success:", data);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      console.error("Error:", error);
    },
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button 
        disabled={invokeMutation.isPending} 
        onClick={() => invokeMutation.mutate({ text: "test" })}
      >
        {invokeMutation.isPending ? "Invoking..." : "Invoke Background Job"}
      </Button>
      
      {invokeMutation.isSuccess && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>Response: {JSON.stringify(invokeMutation.data)}</p>
        </div>
      )}
      
      {invokeMutation.isError && (
        <div className="mt-4 p-4 bg-red-100 rounded">
          <p>Error: {invokeMutation.error.message}</p>
        </div>
      )}
    </div>
  );
};

export default page;

