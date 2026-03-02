"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkinService } from "@/lib/checkin.service";

export default function Checkin() {
    const [lastName, setLastName] = useState("");
    const [pnr, setPnr] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const isValid = lastName.trim() !== "" && pnr.trim() !== "";

    const handleSubmit = async () => {
        if (!isValid) return;
        setLoading(true);
        try {
            const res = await checkinService.retrieveBooking({
                lastName,
                pnr,
            });
            sessionStorage.setItem(
                "passengers",
                JSON.stringify(res.passengers)
            );
            router.push("/checkin/select");
        } catch (err) {
            alert("Booking not found");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="hero">
                <div className="hero-inner">
                    <h1 className="hero-title">Online Check-in</h1>
                    <p className="hero-subtitle">
                        Check in online and save time at the airport.
                    </p>
                </div>
            </section>
            <br />
            <div className="container">
                <div className="container">
                    <div className="card">
                        <h2>Retrieve Your Booking</h2>
                        <label>Last Name</label>
                        <input
                            className="input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label>Booking reference (PNR)</label>
                        <input
                            className="input"
                            value={pnr}
                            onChange={(e) => setPnr(e.target.value)}
                        />
                        <button
                            className="btn-primary"
                            disabled={!isValid || loading}
                            onClick={handleSubmit}
                        >
                            Retrieve Booking
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}