import { z } from "zod";

export const taskdetails = z.object({
  name: z.string().max(50),
  details: z.string().max(500).optional(),
});
