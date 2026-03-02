"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import StickyActionBar from "@/components/StickyActionBar";

export default function DangerousGoods() {
    const router = useRouter();

    return (
        <>
            <ProgressBar step={4} />
            <div className="container">
                <div className="info-wrapper">
                    <h2 className="page-title">Dangerous Goods Declaration</h2>
                    <div className="info-box">
                        <p>
                            For safety reasons, passengers are prohibited from carrying
                            dangerous goods such as explosives, flammable liquids,
                            compressed gases, and toxic substances.
                        </p>
                        <p>
                            By continuing, you confirm that you are not carrying
                            any prohibited items in your baggage.
                        </p>
                    </div>
                </div>
            </div>
            <StickyActionBar
                disabled={false}
                onContinue={() => router.push("/checkin/boarding-pass")}
            />
        </>
    );
}