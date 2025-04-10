import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "n9195iq3",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-01-01",
  });