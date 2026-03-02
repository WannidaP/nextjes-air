"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import StickyActionBar from "@/components/StickyActionBar";
import Barcode from "react-barcode";

interface Passenger {
    id: number;
    name: string;
    seat?: string;
}

export default function BoardingPass() {
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const router = useRouter();

    useEffect(() => {
        const data = sessionStorage.getItem("selectedPassengers");
        if (data) setPassengers(JSON.parse(data));
    }, []);

    return (
        <>
            <ProgressBar step={5} />
            <div className="container">
                <h2 className="page-title">Boarding Pass</h2>
                {passengers.map((p) => (
                    <div key={p.id} className="bp-card">
                        <div className="bp-airline-header">
                            ✈ Nextjes Air
                        </div>
                        <div className="bp-content">
                            <div className="bp-main">
                                <div className="bp-route">BKK → NRT</div>
                                <div className="bp-section">
                                    <div className="bp-label">Passenger</div>
                                    <div className="bp-value big">{p.name}</div>
                                </div>
                                <div className="bp-row">
                                    <div>
                                        <div className="bp-label">Flight</div>
                                        <div className="bp-value">HU123</div>
                                    </div>
                                    <div>
                                        <div className="bp-label">Seat</div>
                                        <div className="bp-value highlight">
                                            {p.seat || "12A"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bp-label">Gate</div>
                                        <div className="bp-value">A12</div>
                                    </div>
                                    <div>
                                        <div className="bp-label">Boarding</div>
                                        <div className="bp-value">10:30</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bp-divider" />
                            <div className="bp-barcode">
                                <Barcode
                                    value={`HU123-${p.id}`}
                                    width={1.5}
                                    height={60}
                                    displayValue={false}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <StickyActionBar
                disabled={false}
                onContinue={() => router.push("/checkin")}
                buttonLabel="Done"
                showBack={false}
            />
        </>
    );
}