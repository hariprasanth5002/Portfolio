"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#020617]/80 backdrop-blur-md border-b border-gray-800 shadow-sm py-4"
                    : "bg-transparent py-6 border-b border-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold font-heading text-slate-100 tracking-tight">
                    Hariprasanth
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative text-gray-400 hover:text-white font-medium group transition-colors text-sm"
                        >
                            {link.name}
                            <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </a>
                    ))}

                    <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-800">
                        <a href="https://github.com/hariprasanth5002" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaGithub className="text-xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/hariprasanth-u-a662b7352/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#38bdf8] transition-colors">
                            <FaLinkedin className="text-xl" />
                        </a>
                        <a href="https://drive.google.com/file/d/1U0nQTr9wtdNMmuYT7eQc0_FC3UiL3dT7/view?usp=sharing" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#22c55e] transition-colors">
                            <FaFilePdf className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
