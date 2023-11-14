import React from "react";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";

export const experienceArr = [
    {
        title: "B.tech",
        location: "Gangoh, Saharnpur",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, dolorem.",
        icon: React.createElement(LuGraduationCap),
        date: "2018-22",
    },
    {
        title: "UI Developer",
        location: "Screetract Solutions, Bengaluru",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, dolorem.",
        icon: React.createElement(MdOutlineWorkOutline),
        date: "Feb 22 - present",
    },
] as const;
