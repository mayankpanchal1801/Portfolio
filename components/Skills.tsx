import { useSectionInView } from "@/constants/hooks";
import { skillsArr } from "@/constants/skills";

import { motion } from "framer-motion";

const Skills = () => {
    const { ref } = useSectionInView("Skills", 0.25);

    const fadeInAnimationVariant = {
        initial: {
            opacity: 0,
            y: 100,
        },
        animate: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.05 * index,
            },
        }),
    };

    return (
        <section ref={ref} id="skills" className="section">
            <h3 className="section-title">skill</h3>

            <div className="section-content skills-wrapper m-auto  flex flex-wrap gap-4 justify-center">
                {skillsArr.map((skill, index) => {
                    return (
                        <motion.div
                            className="card w-72 "
                            key={index}
                            variants={fadeInAnimationVariant}
                            initial="initial"
                            whileInView="animate"
                            viewport={{
                                once: true,
                            }}
                            custom={index}
                        >
                            <h3 className="title">{skill.title}</h3>

                            <p className="desc">{skill.description?.length ? skill.description : ""}</p>
                            {skill.tools?.length ? skill.tools.map((tool) => <li key={tool}>{tool}</li>) : ""}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Skills;
