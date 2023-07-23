import { loginValidator } from "@/schema/login";
import { z } from "zod";
import type{ role } from "./nextauth";

export type LoginValue = z.infer<typeof loginValidator>

export type GetUserResult = {
    id: string;
    name: string | null;
    email: string;
    role: role;
    password: string;
} | null;