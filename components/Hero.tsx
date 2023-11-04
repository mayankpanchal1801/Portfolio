import Image from "next/image";
import { Link } from "react-scroll";
import { BsLinkedin } from "react-icons/bs";

const Hero = () => {
    return (
        <section id="hero" className="hero flex items-center justify-center">
            <div className="hero-wrapper space-y-8">
                <figure className="ring-4 ring-white bg-red-200 w-max m-auto  rounded-full   relative">
                    <Image
                        height={150}
                        width={150}
                        className="rounded-full "
                        src="/bannerDp.jpg"
                        alt="banner dp image"
                    />

                    <span className="text-[3em] absolute right-[25%] bottom-[25%]">
                        👋
                    </span>
                </figure>
                <h1 className="text-2xl md:text-3xl text-center">
                    <strong> Hello, I{`&apos;`}m Mayank.</strong> I{`&apos;`}m a
                    <strong> full-stack developer</strong> <br /> with
                    <strong>
                        {" "}
                        2<span className="text-black-600 text-3xl">+</span>{" "}
                        years
                    </strong>
                    of experience. I enjoy building <br /> sites & apps. My
                    focus is <span>React-(Next.js)</span>.
                </h1>
                <div className="flex justify-center gap-4 items-center">
                    <Link
                        className="btn btn-filled"
                        smooth={true}
                        duration={500}
                        to="contact"
                    >
                        Contact me here
                    </Link>
                    <span className="btn btn-outline ">Download CV</span>
                    <a
                        href="https://www.linkedin.com/in/mayankpanchal01/"
                        target="_mayank"
                        title="Mayank panchal Linkedin"
                        className="icon-box"
                    >
                        <BsLinkedin />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
