"use client";

import type { SectionName } from "@/constants/types";
import React, { useState, createContext, useContext } from "react";

type ActiveSectionContextProviderProps = {
    children: React.ReactNode;
};

type ActiveSectionContextType = {
    activeSection: SectionName;
    setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
    timeOfLastClick: number;
    setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};
export const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null);

function ActiveSectionContextProvider({ children }: ActiveSectionContextProviderProps) {
    const [activeSection, setActiveSection] = useState<SectionName>("Hero");
    const [timeOfLastClick, setTimeOfLastClick] = useState(0);

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, timeOfLastClick, setTimeOfLastClick }}>
            {children}
        </ActiveSectionContext.Provider>
    );
}

export default ActiveSectionContextProvider;

export function useActiveSectionContext() {
    const context = useContext(ActiveSectionContext);
    if (context === null) {
        throw new Error(`Active section context erow`);
    }
    return context;
}
