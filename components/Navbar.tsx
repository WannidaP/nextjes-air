"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Flights", href: "#" },
        { name: "Check-in", href: "/checkin" },
    ];

    return (
        <div className="navbar">
            <div className="nav-container">
                <div className="logo">
                    ✈ Nextjes Air
                </div>

                <div className="nav-links">
                    {navItems.map((item) => {
                        const active = pathname.startsWith(item.href) && item.href !== "#";

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`nav-link ${active ? "active" : ""}`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}