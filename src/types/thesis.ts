import { teachersBody, thesisBody, thesisEvaluators } from "@/schema/thesis/adminThesis";
import { z } from "zod";

export type assignFormType = z.infer<typeof thesisBody>;

export type teacherFormBody = z.infer<typeof thesisEvaluators>
