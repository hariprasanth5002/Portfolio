import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechSkills } from "@/components/TechSkills";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <Navbar />
      <Hero />
      <About />
      <TechSkills />
      <FeaturedProjects />
      <Contact />
      <Footer />
    </main>
  );
}
