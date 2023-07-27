import { z } from "zod";

const EvaluationValidator = z.object({
  m1: z.number().min(0).max(15),
  m2: z.number().min(0).max(20),
  m3: z.number().min(0).max(15),
  m4: z.number().min(0).max(10),
  m5: z.number().min(0).max(20),
  m6: z.number().min(0).max(10),
  comment: z.string().min(10).max(200),
});
export default EvaluationValidator;
