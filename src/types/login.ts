import { loginValidator } from "@/schema/login";
import { z } from "zod";

export type LoginValue = z.infer<typeof loginValidator>