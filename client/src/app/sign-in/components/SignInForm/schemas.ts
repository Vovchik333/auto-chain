import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("errors.invalidEmail"),
  password: z.string().min(6, "errors.passwordTooShort"),
});

export type FormValues = z.infer<typeof formSchema>;
