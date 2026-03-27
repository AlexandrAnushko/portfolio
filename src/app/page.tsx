import { About } from "@/features/home/About";
import { Contact } from "@/features/home/Contact/Contact";
import { Footer } from "@/features/home/Footer";
import { Hero } from "@/features/home/Hero";
import { Projects } from "@/features/home/Projects";
import { Skills } from "@/features/home/Skills";

export default function Home() {
  return (
    <main id="home">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
