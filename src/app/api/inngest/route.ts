import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions";

console.log("Inngest client configured:", {
  id: inngest.id,
  hasEventKey: !!process.env.INNGEST_EVENT_KEY,
  hasSigningKey: !!process.env.INNGEST_SIGNING_KEY,
});

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
  ],
});
