"use client";
import { useRouter } from "next/navigation";

interface Props {
    disabled: boolean;
    onContinue: () => void;
    buttonLabel?: string;
    showBack?: boolean;
}

export default function StickyActionBar({
    disabled,
    onContinue,
    buttonLabel = "Continue",
    showBack = true,
}: Props) {
    const router = useRouter();

    return (
        <div className="action-bar">
            <div
                className="action-inner"
            >
                {showBack && (
                    <button
                        className="btn-secondary"
                        onClick={() => router.back()}
                    >
                        Back
                    </button>
                )}
                <button
                    className="btn-primary-fixed"
                    disabled={disabled}
                    onClick={onContinue}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}