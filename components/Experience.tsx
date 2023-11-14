import SectionHeading from "./shared/SectionHeading";
import { useSectionInView } from "@/constants/hooks";

const Experience = () => {
    const { ref } = useSectionInView("Experience");

    return (
        <section ref={ref} id="experience" className="section">
            <SectionHeading>experience</SectionHeading>
        </section>
    );
};

export default Experience;
