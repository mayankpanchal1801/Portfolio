import React from "react";
import SectionHeading from "./shared/SectionHeading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/constants/hooks";
const About = () => {
    const { ref } = useSectionInView("About");
    return (
        <motion.section
            ref={ref}
            id="about"
            className="section max-w-[45rem]"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
        >
            <SectionHeading>about</SectionHeading>
            <p className="para">
                In the past two years, I&apos;ve dedicated myself to honing my web development skills and expanding my
                knowledge base. During this time, I&apos;ve acquired a diverse set of skills that have enabled me to
                excel in various aspects of web development.
            </p>
            <p className="para">
                My focus has been on achieving excellence in every facet of web development. I&apos;ve delved deep into
                front-end development, ensuring that I can create visually appealing and user-friendly websites. My
                proficiency extends to HTML, CSS, and JavaScript, as well as modern libraries and frameworks like React
                and Vue.js. Responsive design principles have become second nature, ensuring that the websites I build
                are accessible and adaptive across all devices.
            </p>
        </motion.section>
    );
};

export default About;
