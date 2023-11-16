import SectionHeading from "./shared/SectionHeading";
import { useSectionInView } from "@/constants/hooks";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const Contact = () => {
    const { ref } = useSectionInView("Contact");
    return (
        <motion.section
            ref={ref}
            id="contact"
            className="section"
            initial={{
                opacity: 0,
            }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <SectionHeading>contact</SectionHeading>
            <div
                className="section-content flex flex-col gap-4 text-gray-700
            "
            >
                <p className="text-center mb-8">
                    Thank you for visiting my portfolio! I&apos;m excited to connect with you. Whether you have a
                    project in mind, want to discuss a potential collaboration, or simply have a question, I&apos;m here
                    to help.
                </p>
                <p>
                    <strong className="text-[1.5em]">Let&apos;s Talk:</strong>
                </p>
                <p>
                    Feel free to reach out to me via email or through the form below. I&apos;m always open to new
                    opportunities and conversations.
                </p>
                <p>
                    <strong>Email: </strong>
                    <a className="underline" href="mailto:mayankpanchal1801@gmail.com">
                        mayankpanchal1801@gmail.com
                    </a>
                </p>
            </div>
            <form action="" className="flex flex-col gap-4 w-[min(100%,36rem)] m-auto mt-10">
                <input placeholder="username@mail.com" type="email" className="cu-form-input h-10" />
                <textarea placeholder="Your words to me.." rows={4} className="cu-form-input" />
                <button
                    type="submit"
                    className="group w-[14ch] transition-all flex items-center gap-2 h-[3rem] bg-gray-900 justify-center text-white rounded-full outline-none hover:scale-105 hover:bg-gray-950"
                >
                    Submit{" "}
                    <FaPaperPlane className="transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
            </form>
        </motion.section>
    );
};

export default Contact;
