"use client";
import { navLinksArr } from "@/constants/links";
import { useActiveSectionContext } from "@/context/active-section-context";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";

const Header = () => {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    return (
        <header className="z-[999] relative">
            <motion.div
                className="header"
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
            ></motion.div>
            <nav className="flex fixed top-[.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
                <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
                    {navLinksArr.map((navLink) => (
                        <motion.li
                            key={navLink.url}
                            className="h-3/4 flex items-center justify-center relative"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Link
                                className={clsx("flex w-full items-center justify-center p-3 hover:text-gray-950", {
                                    "text-gray-950": activeSection === navLink.name,
                                })}
                                href={navLink.url}
                                onClick={() => {
                                    setActiveSection(navLink.name);
                                    setTimeOfLastClick(Date.now());
                                }}
                            >
                                {navLink.name}
                                {navLink.name === activeSection && (
                                    <motion.span
                                        layoutId="activeSection"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                        className="bg-gray-100 rounded-full absolute inset-0 -z-10"
                                    ></motion.span>
                                )}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
