import { redirect } from "next/navigation";
import { getUserId } from "../actions/getUserId";
import { ROUTES } from "@/shared/constants/routes";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default async function Contact() {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);
  return (
    <div className="flex flex-col items-center justify-center flex-1 pt-4">
      <h1 className="text-5xl mb-4">Contact me:</h1>
      <ul className="flex flex-col gap-y-2">
        <li className="flex items-center gap-x-2 group">
          <Linkedin className="w-8 h-8 fill-white border border-white p-1 rounded-lg group-hover:fill-primary group-hover:stroke-primary group-hover:border-primary" />
          <Link
            href="https://www.linkedin.com/in/alexandranushko/"
            className="text-base xl:text-lg text-white group-hover:text-primary"
          >
            Linkedin
          </Link>
        </li>
        <li className="flex items-center gap-2 group">
          <Mail className="w-8 h-8 border border-white p-1 rounded-lg group-hover:stroke-primary group-hover:border-primary" />
          <span className="text-base xl:text-lg text-white group-hover:text-primary">
            alexandr.anushko@gmail.com
          </span>
        </li>
      </ul>
    </div>
  );
}
