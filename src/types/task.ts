import { taskdetails } from "@/schema/task";
import { z } from "zod";

export type taskType= z.infer<typeof taskdetails>