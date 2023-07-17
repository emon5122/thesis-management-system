import type { User
 } from "next-auth";
import type { User } from "next-auth";
import "next-auth/jwt"

type role="ADMIN" | "TEACHER" | "STUDENT"

declare module "next-auth/jwt"{
    interface JWT{
        role: role
    }
}
declare module "next-auth"{
    interface Session{
        user: User&{
            role: role
        }
    }
}