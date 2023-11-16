import React from "react";

const Footer = () => {
    const dat = new Date();
    const yr = dat.getFullYear();
    return (
        <div className="footer-bottom">
            <div className="container m-auto pb-4 text-gray-700">
                <div className="copyright">
                    <p className="text-center">&copy; {yr} Mayank Panchal. All Rights Reserved.</p>
                </div>
                <div className="credits">
                    <p className="text-center">
                        Designed and built with ❤️ by{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            Mayank
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
