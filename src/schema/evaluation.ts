import { z } from "zod";

const EvaluationValidator = z.object({
    m1: z.number(),
    m2: z.number(),
    m3: z.number(),
    m4: z.number(),
    m5: z.number(),
    m6: z.number(),
  });
  export default EvaluationValidator