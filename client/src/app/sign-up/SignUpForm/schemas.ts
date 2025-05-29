import { z } from "zod";

export const formSchema = z.object({
  username: z.string()
    .min(2, "errors.usernameTooShort")
    .max(50, "errors.usernameTooLong")
    .regex(/^[a-zA-Z0-9_-]+$/, "errors.usernameInvalid"),
  email: z.string().email("errors.invalidEmail"),
  password: z.string()
    .min(8, "errors.passwordTooShort")
    .regex(/[A-Z]/, "errors.passwordNoUppercase")
    .regex(/[a-z]/, "errors.passwordNoLowercase")
    .regex(/[0-9]/, "errors.passwordNoNumber")
    .regex(/[^A-Za-z0-9]/, "errors.passwordNoSpecial"),
})

export type FormValues = z.infer<typeof formSchema>