import { register } from "@/schema/registration";
import { z } from "zod";

export type registrationType= z.infer<typeof register>