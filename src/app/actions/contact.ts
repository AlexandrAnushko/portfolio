"use server";

import prisma from "@/lib/db";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/features/home/Contact/contactSchema";

export const sendContactMessage = async (data: ContactFormValues) => {
  const parsed = contactFormSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  await prisma.contactMessage.create({
    data: parsed.data,
  });

  return { success: true };
};
