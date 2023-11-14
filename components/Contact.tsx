import SectionHeading from "./shared/SectionHeading";
import { useSectionInView } from "@/constants/hooks";

const Contact = () => {
    const { ref } = useSectionInView("Contact");
    return (
        <section ref={ref} id="contact" className="section">
            <SectionHeading>contact</SectionHeading>
        </section>
    );
};

export default Contact;
