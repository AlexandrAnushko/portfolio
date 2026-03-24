import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { SocialLink } from "@/shared/components/Socials/SocialLink";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-asphalt">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-primary text-center mb-4 tracking-wide uppercase">
          Get In Touch
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          {`Have a project in mind? Let's work together to create something amazing.`}
        </p>

        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>

        <div className="mt-16 flex justify-center gap-6">
          <SocialLink
            href="https://www.linkedin.com/in/alexandranushko/"
            text="Linkedin"
          >
            <Linkedin className="w-7 h-7 border border-white p-1 rounded-lg fill-white group-hover:fill-primary group-hover:stroke-primary group-hover:border-primary transition-colors" />
          </SocialLink>
          <SocialLink href="https://github.com/AlexandrAnushko" text="GitHub">
            <Github className="w-7 h-7 border border-white p-1 rounded-lg group-hover:stroke-primary group-hover:border-primary transition-colors" />
          </SocialLink>
          <SocialLink href="https://t.me/to_care_the_carrot" text="Telegram">
            <Image
              src="/icons/telegram.svg"
              alt="Telegram icon"
              width={7}
              height={7}
              className="w-7 h-7 border border-white p-1 rounded-lg fill-white group-hover:fill-primary group-hover:stroke-primary group-hover:border-primary transition-colors"
            />
          </SocialLink>
        </div>
      </div>
    </section>
  );
};
