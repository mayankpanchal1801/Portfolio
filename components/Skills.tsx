import { useSectionInView } from "@/constants/hooks";
import { skillsArr } from "@/constants/skills";

const Skills = () => {
    const { ref } = useSectionInView("Skills");

    return (
        <section ref={ref} id="skills" className="section">
            <h3 className="section-title">skill</h3>

            <div className="skills-wrapper m-auto  flex flex-wrap gap-4 justify-center">
                {skillsArr.map((skill) => {
                    return (
                        <div className="card w-72 " key={skill.title}>
                            <h3 className="title">{skill.title}</h3>

                            <p className="desc">{skill.description?.length ? skill.description : ""}</p>
                            {skill.tools?.length ? skill.tools.map((tool) => <li key={tool}>{tool}</li>) : ""}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Skills;
