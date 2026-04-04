"use server";

import prisma from "@/lib/db";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/features/home/Contact/contactSchema";
import { ActionResult } from "./actionUtils";

export const sendContactMessage = async (
  data: ContactFormValues,
): Promise<ActionResult> => {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: "Invalid form data" };

  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};
