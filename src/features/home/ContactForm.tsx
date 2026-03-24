"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, ContactFormValues } from "./contactSchema";
import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/shared/components/Button";

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
        <div>
          <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full bg-dark-grey border border-primary/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full bg-dark-grey border border-primary/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm mb-2 text-gray-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject")}
          className="w-full bg-dark-grey border border-primary/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
          placeholder="Subject"
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm mb-2 text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className="w-full bg-dark-grey border border-primary/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Tell me anything..."
        ></textarea>
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      <Button
        type="submit"
        isDisabled={isSubmitting}
        text={isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        className="w-full"
      />
    </form>
  );
};
