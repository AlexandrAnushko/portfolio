import { z } from "zod";

export const authFormSchema = z.object({
  email: z.email("Некорректный адрес email"),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать не менее 6 символов." }),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
