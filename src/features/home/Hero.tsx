import { Link } from "@/shared/components/Link";
import { ROUTES } from "@/shared/constants/routes";
import Image from "next/image";

export const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
          {/* Left Content - Main Info */}
          <div className="text-center lg:text-left">
            <p className="mb-6 tracking-wide uppercase text-primary">
              Frontend developer
            </p>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-8 leading-tigh uppercase">
              Alexandr <br /> Anushko
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Frontend developer, based in Minsk.
              <br />
              Need a good team member?
              <Link
                href="https://www.linkedin.com/in/alexandranushko/"
                className="text-white"
                textTransform="normal-case"
                target="_blank"
              >{` Let's talk`}</Link>
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link href={ROUTES.PROJECTS} mode="primary">
                My Projects
              </Link>
              <Link href={ROUTES.CONTACT} mode="outline">
                Contact me
              </Link>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
                <Image
                  src="/avatar.jpg"
                  alt="author photo"
                  width={350}
                  height={350}
                  loading="eager"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
