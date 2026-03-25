"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, ContactFormValues } from "./contactSchema";
import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/shared/components/Button";
import { FormInput } from "@/shared/components/FormInput";

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
        <div className="relative">
          <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
            Name
          </label>
          <FormInput name="name" placeholder="Your name" register={register} />
          {errors.name && (
            <p className="absolute -bottom-[1.5em] right-0 text-red-400 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
            Email
          </label>
          <FormInput
            name="email"
            placeholder="your@email.com"
            type="email"
            register={register}
          />
          {errors.email && (
            <p className="absolute -bottom-[1.5em] right-0 text-red-400 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="relative">
        <label htmlFor="subject" className="block text-sm mb-2 text-gray-300">
          Subject
        </label>
        <FormInput name="subject" placeholder="Subject" register={register} />
        {errors.subject && (
          <p className="absolute -bottom-[1.5em] right-0 text-red-400 text-sm mt-1">
            {errors.subject.message}
          </p>
        )}
      </div>
      <div className="relative">
        <label htmlFor="message" className="block text-sm mb-2 text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className="w-full bg-dark-grey border border-primary/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Tell me anything..."
        />
        {errors.message && (
          <p className="absolute -bottom-[1.25em] right-0 text-red-400 text-sm mt-1">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        isDisabled={isSubmitting}
        text={isSubmitting ? "Sending..." : "Send Message"}
        className="w-full"
      />
    </form>
  );
};
