import { Link } from "@/shared/components/Link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center flex-1">
      <section className="flex items-center justify-center w-full max-w-[80%] gap-20">
        <div className="flex flex-col justify-between max-w-[50%] h-full max-h-[80%] gap-10">
          <h2 className="text-2xl font-semibold uppercase text-primary">
            Frontend developer
          </h2>
          <h1 className="text-7xl font-semibold uppercase">
            Alexandr <br /> Anushko
          </h1>
          <p className="text-grey-text text-lg font-semibold">
            Frontend developer, based in Minsk.
            <br />
            Need a good team member?
            <span className="text-white">{` Let's talk`}</span>
          </p>
          <Link text="Get Started" href="#" className="max-w-[50%]" />
        </div>
        <div className="max-w-[50%]">
          <Image
            src="/hishmaliin.jpg"
            alt="author photo"
            width={500}
            height={500}
            loading="eager"
          />
        </div>
      </section>
    </main>
  );
}
