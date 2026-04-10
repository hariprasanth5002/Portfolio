"use client";

import { FaGithub, FaLinkedin, FaFilePdf } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="py-8 bg-[#0F172A] border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
                <div className="flex gap-6">
                    <a
                        href="https://github.com/hariprasanth5002"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <FaGithub className="text-xl" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/hariprasanth-u-a662b7352/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#38bdf8] transition-colors"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="text-xl" />
                    </a>
                    <a
                        href="https://drive.google.com/file/d/1Z73iIxgxFkdyyKNLa7-SGfK2AzqlLmo9/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#22c55e] transition-colors"
                        aria-label="Resume"
                    >
                        <FaFilePdf className="text-xl" />
                    </a>
                </div>
                <p className="text-gray-500 text-sm font-medium tracking-wide">
                    © {new Date().getFullYear()} Hariprasanth. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
