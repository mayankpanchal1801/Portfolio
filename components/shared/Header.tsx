"use client";
import { navLinksArr } from "@/constants/links";
import { Link } from "react-scroll";
import Scrollspy from "react-scrollspy";

const Header = () => {
    const ab = Array.from(navLinksArr.map((link) => link.url));
    return (
        <header className="header">
            <Scrollspy
                className="nav-links-wrapper"
                items={ab}
                currentClassName="nav-active"
                offset={-150}
            >
                {navLinksArr.map((link) => (
                    <Link
                        className="cursor-pointer"
                        to={link.url}
                        smooth={true}
                        duration={500}
                        key={link.name}
                    >
                        {link.name}
                    </Link>
                ))}
            </Scrollspy>
        </header>
    );
};

export default Header;
