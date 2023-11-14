"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
        </main>
    );
}
