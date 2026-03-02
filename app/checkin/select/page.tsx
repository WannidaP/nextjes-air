"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import StickyActionBar from "@/components/StickyActionBar";

interface Passenger {
    id: number;
    name: string;
    seat: string;
}

export default function Select() {
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        const data = sessionStorage.getItem("passengers");
        if (data) {
            setPassengers(JSON.parse(data));
        }
    }, []);

    const handleContinue = () => {
        const selectedPassengers = passengers.filter((p) =>
            selected.includes(p.id)
        );
        sessionStorage.setItem(
            "selectedPassengers",
            JSON.stringify(selectedPassengers)
        );
        router.push("/checkin/details");
    };

    const toggle = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selected.length === passengers.length) {
            setSelected([]);
        } else {
            setSelected(passengers.map((p) => p.id));
        }
    };

    return (
        <>
            <ProgressBar step={2} />
            <div className="container">
                <div className="page-section">
                    <div className="select-card">
                        <div className="select-header">
                            <div className="select-title">
                                Select Passengers
                            </div>
                            <div className="select-all" onClick={toggleAll}>
                                {selected.length === passengers.length
                                    ? "Clear All"
                                    : "Select All"}
                            </div>
                        </div>
                        <div className="flight-info">
                            Bangkok (BKK) → Tokyo (NRT) • 20 May 2025
                        </div>
                        {passengers.map((p) => {
                            const active = selected.includes(p.id);
                            return (
                                <div
                                    key={p.id}
                                    className={`passenger-row ${active ? "selected" : ""
                                        }`}
                                    onClick={() => toggle(p.id)}
                                >
                                    <div className="passenger-left">
                                        <div
                                            className={`radio-circle ${active ? "active" : ""
                                                }`}
                                        >
                                            {active && (
                                                <div className="radio-dot" />
                                            )}
                                        </div>
                                        <div style={{ fontWeight: 600 }}>
                                            {p.name}
                                        </div>
                                    </div>
                                    <div className="seat-badge">
                                        {p.seat}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <StickyActionBar
                        disabled={selected.length === 0}
                        onContinue={handleContinue}
                    />
                </div>
            </div>
        </>
    );
}