import { noticedetails } from "@/schema/notice";
import { z } from "zod";

export type noticeType= z.infer<typeof noticedetails>