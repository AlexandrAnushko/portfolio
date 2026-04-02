"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, ContactFormValues } from "./contactSchema";
import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/shared/components/Button";
import { FormInput } from "@/shared/components/FormInput";
import { Textarea } from "@/shared/components/Textarea";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const result = await sendContactMessage(data);

    if (result.success) {
      toast.success("Message sent successfully!");
      reset();
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="name"
          label="Name"
          placeholder="Your name"
          register={register}
          errorMessage={errors.name?.message}
        />
        <FormInput
          name="email"
          label="Email"
          placeholder="your@email.com"
          type="email"
          register={register}
          errorMessage={errors.email?.message}
        />
      </div>
      <FormInput
        name="subject"
        label="Subject"
        placeholder="Subject"
        register={register}
        errorMessage={errors.subject?.message}
      />
      <Textarea
        id="message"
        label="Message"
        placeholder="Tell me anything..."
        rows={6}
        errorMessage={errors.message?.message}
        {...register("message")}
      />
      <Button
        type="submit"
        isDisabled={isSubmitting}
        text={isSubmitting ? "Sending..." : "Send Message"}
        className="w-full"
      />
    </form>
  );
};
