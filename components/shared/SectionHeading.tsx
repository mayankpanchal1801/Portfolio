import React from "react";

type SectionHeadingProps = {
    children: React.ReactNode;
};

function SectionHeading({ children }: SectionHeadingProps) {
    return <h3 className="section-title">{children}</h3>;
}

export default SectionHeading;
