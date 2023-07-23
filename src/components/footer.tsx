"use client"
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathName = usePathname();
    const hideHeader = pathName.startsWith("/dashboard") || pathName==="/signup";
    if (!hideHeader) {
    return <div className="bg-neutral-400">This is a footer</div>;
    }
};

export default Footer;
