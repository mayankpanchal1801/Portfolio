import { projectsArr } from "@/constants/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
type ProjectProps = (typeof projectsArr)[0];

const Project = ({ title, description, tags, imgSrc, url }: ProjectProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.23 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale: scaleProgress, opacity: opacityProgress }}
            className="group mb-3 sm:mb-8 last:mb-0 "
        >
            <section className="max-sm:flex max-sm:flex-col rounded-lg bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden sm:pr-8 relative hover:bg-gray-200 transition sm:group-even:pl-8">
                <div className="max-sm:order-2  pt-4 pb-8 px-5 sm:pl-10 sm:pt-10 sm:max-w-[50%] sm:h-[20rem] flex flex-col sm:group-even:ml-[18rem] ">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <p className="mt-2 leading-relaxed text-gray-700">{description}</p>
                    <ul className="flex flex-wrap mt-4 gap-2">
                        {tags.map((tag, index) => (
                            <li
                                key={index}
                                className="bg-black/[.7] px-3 py-1 text-[.7rem] uppercase tracking-wider text-white rounded-full"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <a
                        className="group-even:ml-auto mt-4 w-max flex justify-center items-center gap-1 group/link text-blue-700"
                        target={`"_${title}"`}
                        href={url}
                    >
                        Visit Website <BsArrowRight className=" transition-all group-hover/link:translate-x-2" />
                    </a>
                </div>
                <Image
                    src={imgSrc}
                    alt="project i worked on"
                    className="max-sm:order-1 sm:absolute sm:top-10 sm:-right-40 sm:w-[28rem] rounded-t-lg shadow-2xl
                    max-sm:w-full
            sm:group-hover:scale-[1.04]
            sm:group-hover:-translate-x-3
            sm:group-hover:translate-y-3
            sm:group-hover:-rotate-2
            sm:group-even:group-hover:translate-x-2
            sm:group-even:group-hover:translate-y-3
            sm:group-even:group-hover:rotate-2
            group-even:right-[initial]
            group-even:-left-40 
            "
                    width={300}
                    height={200}
                />
            </section>
        </motion.div>
    );
};

export default Project;
