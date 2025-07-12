"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Tags", href: "/tags" },
    { label: "Users", href: "/users" },
    { label: "About", href: "/about" },
];

const NavItems = () => {
    const pathname = usePathname();

    return (
        <ul className="flex flex-col md:flex-row gap-4">
            {navLinks.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`text-sm font-medium hover:text-blue-600 transition ${
                            pathname === link.href ? "text-blue-600" : "text-gray-700"
                        }`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavItems;
