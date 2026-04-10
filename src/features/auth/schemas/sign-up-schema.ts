import { z } from "zod"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name too long")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .max(255)
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .max(100)
      .regex(passwordRegex, {
        message: "Must include uppercase, lowercase, number & special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>
