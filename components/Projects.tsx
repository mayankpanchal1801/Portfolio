import { Fragment } from "react";
import SectionHeading from "./shared/SectionHeading";
import { projectsArr } from "@/constants/projects";
import Project from "./Project";
import { useSectionInView } from "@/constants/hooks";

const Projects = () => {
    const { ref } = useSectionInView("Projects", 0.25);
    return (
        <section ref={ref} id="projects" className="section">
            <SectionHeading>my projects</SectionHeading>
            {projectsArr.map((project, index) => (
                <Fragment key={index}>
                    <Project {...project} />
                </Fragment>
            ))}
        </section>
    );
};

export default Projects;
