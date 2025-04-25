import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import SectionHeading from "./shared/SectionHeading";
import { useSectionInView } from "@/constants/hooks";
import "react-vertical-timeline-component/style.min.css";
import { experienceArr } from "@/constants/experience";
import { Fragment } from "react";

const Experience = () => {
    const { ref } = useSectionInView("Experience", 0.25);

    return (
        <section
            ref={ref}
            id="experience"
            className="section"
        >
            <SectionHeading>experience</SectionHeading>
            <VerticalTimeline
                className="sm:!w-[70vw]"
                lineColor=""
            >
                {experienceArr.map((experience, index) => (
                    <Fragment key={index}>
                        <VerticalTimelineElement
                            visible
                            className="vertical-timeline-element--work"
                            contentStyle={{
                                background: "#f3f4f6",
                                boxShadow: "none",
                                border: "1px solid rgba(0,0,0,.05)",
                                textAlign: "left",
                                padding: "1.3rem 2rem",
                            }}
                            contentArrowStyle={{
                                borderRight:
                                    ".4rem solid #9ca3af",
                            }}
                            date={experience.date}
                            icon={experience.icon}
                            iconStyle={{
                                background: "white",
                                fontSize: "2rem",
                            }}
                        >
                            <h3 className="font-semibold uppercase">
                                {experience.title}
                            </h3>
                            <p className="font-normal !mt-0">
                                {experience.location}
                            </p>
                        </VerticalTimelineElement>
                    </Fragment>
                ))}
            </VerticalTimeline>
        </section>
    );
};

export default Experience;
