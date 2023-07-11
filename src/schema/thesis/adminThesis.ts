import { z } from "zod";

export const thesisBody = z.object({
    name:z.string(),
    studentId: z.string().uuid(),
    supervisorId: z.string().uuid()
})