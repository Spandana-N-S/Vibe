import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "vibe-development",
  env: process.env.NODE_ENV,
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});
