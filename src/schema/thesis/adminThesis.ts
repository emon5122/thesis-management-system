import { z } from "zod";

export const thesisBody = z.object({
    name:z.string(),
    studentId: z.string().uuid(),
    supervisorId: z.string().uuid()
})
export const teachersBody= z.array(z.string().uuid())

export const thesisEvaluators = z.object({
    id: z.string().uuid(),
    teachers: z.array(z.string().uuid())
})

export const evaluatorsList = z
.array(
    z.object({
        name: z.string(),
        id: z.string().uuid(),
    })
)