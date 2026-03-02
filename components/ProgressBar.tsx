"use client";
interface Props {
    step: 1 | 2 | 3 | 4 | 5;
}

const steps = [
    { id: 1, label: "Retrieve Booking" },
    { id: 2, label: "Select Passenger" },
    { id: 3, label: "Passenger Details" },
    { id: 4, label: "Dangerous Goods" },
    { id: 5, label: "Boarding Pass" },
];

export default function ProgressBar({ step }: Props) {
    return (
        <div className="progress-wrapper">
            <div className="progress-row">
                {steps.map((s, index) => {
                    const active = step === s.id;
                    const completed = step > s.id;

                    return (
                        <div key={s.id} className="progress-item">
                            <div
                                className={`circle ${active ? "active" : completed ? "completed" : ""}`}
                            >
                                {s.id}
                            </div>
                            {index !== steps.length - 1 && (
                                <div
                                    className={`connector ${step > s.id ? "connector-active" : ""
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}