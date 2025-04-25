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
            className="section max-w-[45rem] "
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
        >
            <SectionHeading>about</SectionHeading>
            <p className="para">
                Over the past three years, I’ve focused on
                mastering the craft of web development and
                solving real-world challenges with scalable,
                intuitive solutions. This journey has
                equipped me with a well-rounded skill set
                and a strong foundation in both frontend and
                backend technologies.
            </p>
            <p className="para">
                I’ve honed my ability to create responsive,
                interactive, and user-friendly interfaces
                using HTML5, CSS3, and modern frameworks
                like React.js and Next.js. My frontend
                toolkit also includes Tailwind CSS,
                SCSS/SASS, Redux, Context API, and Zustand,
                enabling me to build sleek, performant
                applications.
            </p>
            <p className="para">
                On the backend, I work with Node.js,
                Express.js, and RESTful APIs, along with
                GraphQL and WebSocket for real-time
                communication. I also have hands-on
                experience with server-side rendering and
                database systems like MongoDB, MySQL,
                PostgreSQL, and Firebase.
            </p>
            <p className="para">
                Beyond development, I prioritize clean
                architecture, maintainable code, and
                continuous improvement through version
                control (Git, GitHub), performance
                optimization, and CI/CD workflows. My solid
                grasp of Data Structures and Algorithms
                helps me write efficient, reliable code
                across all layers of the stack.
            </p>
            <p className="para">
                Whether I’m architecting a feature or
                refining an experience, I strive to deliver
                measurable impact. I’m passionate about
                mentoring, staying on top of emerging tech
                trends, and collaborating with teams that
                value both innovation and precision.
            </p>
        </motion.section>
    );
};

export default About;
