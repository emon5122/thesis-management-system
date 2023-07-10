import { z } from "zod";


const Role = z.enum(["STUDENT", "TEACHER", "ADMIN"]);
export const register = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  role:Role,
  name: z.string().max(50)
});
