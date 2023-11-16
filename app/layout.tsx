import Header from "@/components/shared/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "@/components/shared/Footer";
import ActiveSectionContextProvider from "@/context/active-section-context";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mayank panchal || Portfolio",
    description:
        "Experienced frontend developer with a passion for creating beautiful and user-friendly web applications. With over 2 years of industry expertise, I specialize in crafting responsive, pixel-perfect designs and implementing seamless user interfaces. Let's collaborate to turn your web projects into stunning, high-performance experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="!scroll-smooth">
            <body className={` ${nunito.className} bg-gray-50 text-gray-950 max-w-[100vw] overflow-x-hidden`}>
                <div className="backdround bg-blue-200 -z-10 absolute top-[-20%] left-[10%] w-[32rem] h-[32rem] rounded-full blur-[250px]"></div>
                <div className="backdround bg-red-200 -z-10 absolute top-[-20%] right-[10%] w-[32rem] h-[32rem] rounded-full blur-[250px]"></div>
                <ActiveSectionContextProvider>
                    <Header />
                    {children}
                    <Footer />
                </ActiveSectionContextProvider>
            </body>
        </html>
    );
}
