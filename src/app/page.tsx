import { Link } from "@/shared/components/Link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center flex-1">
      <section className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-[90%] xl:max-w-[80%] gap-10 md:gap-20 py-10">
        <div className="flex flex-col w-full md:w-auto md:max-w-[50%] gap-6 md:gap-10 items-center md:items-start text-center md:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold uppercase text-primary">
            Frontend developer
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold uppercase">
            Alexandr <br /> Anushko
          </h1>
          <p className="text-grey-text text-base md:text-lg font-semibold">
            Frontend developer, based in Minsk.
            <br />
            Need a good team member?
            <span className="text-white">{` Let's talk`}</span>
          </p>
          <Link
            text="Get Started"
            href="#"
            className="w-full max-w-[50%] sm:max-w-50"
          />
        </div>
        <div className="w-[60%] sm:w-[45%] md:w-auto md:max-w-[50%] shrink-0">
          <Image
            src="/hishmaliin.jpg"
            alt="author photo"
            width={500}
            height={500}
            loading="eager"
            className="w-full h-auto lg:min-w-75 xl:min-w-100"
          />
        </div>
      </section>
    </main>
  );
}
