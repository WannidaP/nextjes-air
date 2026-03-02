"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomTabs() {
    const pathname = usePathname();

    const tabs = [
        { name: "Home", href: "/" },
        { name: "Flights", href: "#" },
        { name: "Check-in", href: "/checkin" },
    ];

    return (
        <div className="bottom-tabs">
            {tabs.map((tab) => {
                const active = pathname.startsWith(tab.href) && tab.href !== "#";

                return (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        className={`tab-item ${active ? "active" : ""}`}
                    >
                        {tab.name}
                    </Link>
                );
            })}
        </div>
    );
}