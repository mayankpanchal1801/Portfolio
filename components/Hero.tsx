import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowRight, BsDownload, BsGithub, BsLinkedin } from "react-icons/bs";
import { useSectionInView } from "@/constants/hooks";

const Hero = () => {
    const { ref } = useSectionInView("Hero", 0.6);
    return (
        <section ref={ref} id="hero" className="hero flex items-center justify-center">
            <div className="hero-wrapper space-y-8 max-w-[50rem]">
                <motion.figure
                    className="ring-4 ring-white bg-red-200 w-max m-auto  rounded-full   relative"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        type: "tween",
                        duration: 0.2,
                    }}
                >
                    <Image
                        height={150}
                        width={150}
                        className="rounded-full "
                        src="/bannerDp.jpg"
                        alt="banner dp image"
                        priority={true}
                    />

                    <motion.span
                        className="text-[3em] absolute right-[0%] -bottom-[2.5%]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 125,
                            delay: 0.1,
                            duration: 0.7,
                        }}
                    >
                        👋
                    </motion.span>
                </motion.figure>
                <motion.h1
                    className="text-2xl md:text-4xl text-center"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="font-bold"> Hello, I&apos;m Mayank. </span>
                    I&apos;m a <span> full-stack developer </span>
                    with <span> 2+ years </span>
                    of experience. I enjoy building
                    <span className="italic"> sites & apps.</span> My focus is
                    <span> React-(Next.js)</span>.
                </motion.h1>
                <motion.div
                    className="flex max-sm:flex-col justify-center gap-4 items-center"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.1,
                    }}
                >
                    <Link className="group btn btn-filled" href="#contact">
                        Contact me here <BsArrowRight className="transition-all group-hover:translate-x-1" />
                    </Link>
                    <a
                        href="/Mayank_Panchal_Resume.pdf"
                        title="Mayank panchal Resume"
                        className="btn btn-outline "
                        download
                    >
                        Download CV <BsDownload />
                    </a>
                    <span className="flex gap-4">
                        <a
                            href="https://www.linkedin.com/in/mayankpanchal01/"
                            target="_mayank"
                            title="Mayank panchal Linkedin"
                            className="icon-box"
                        >
                            <BsLinkedin />
                        </a>
                        <a href="3" target="_mayank" title="Mayank panchal Github" className="icon-box" download>
                            <BsGithub />
                        </a>
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
