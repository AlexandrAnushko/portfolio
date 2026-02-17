import { z } from "zod";

export const authFormSchema = z.object({
  email: z.email("Incorrect email address"),
  password: z
    .string()
    .min(6, { message: "The password must be at least 6 characters long" }),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
