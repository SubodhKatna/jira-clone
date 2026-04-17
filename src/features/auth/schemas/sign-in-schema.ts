import {z} from "zod"

export const signInSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Email is required")
        .max(255, "Email too long")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password is too long"),
})

export type SignInFormData = z.infer<typeof signInSchema>
