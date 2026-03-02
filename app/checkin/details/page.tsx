"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import StickyActionBar from "@/components/StickyActionBar";

interface Passenger {
    id: number;
    name: string;
    nationality?: string;
    phone?: string;
    countryCode?: string;
}

export default function Details() {
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
        const data = sessionStorage.getItem("selectedPassengers");
        if (data) setPassengers(JSON.parse(data));
    }, []);

    const validateField = (id: number, field: string, value: string) => {
        let errorMessage = "";
        if (field === "nationality") {
            if (!value.trim()) {
                errorMessage = "Nationality is required";
            }
        }
        if (field === "phone") {
            if (!value || value.length < 10) {
                errorMessage = "Enter a valid phone number";
            }
        }
        setErrors((prev: any) => ({
            ...prev,
            [`${id}-${field}`]: errorMessage,
        }));
    };

    const updatePassenger = (
        id: number,
        field: string,
        value: string
    ) => {
        setPassengers((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, [field]: value } : p
            )
        );
        validateField(id, field, value);
    };

    const validateAll = () => {
        const newErrors: any = {};
        passengers.forEach((p) => {
            if (!p.nationality) {
                newErrors[`${p.id}-nationality`] =
                    "Nationality is required";
            }
            if (!p.phone || p.phone.length < 10) {
                newErrors[`${p.id}-phone`] =
                    "Enter a valid phone number";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (!validateAll()) return;
        sessionStorage.setItem(
            "selectedPassengers",
            JSON.stringify(passengers)
        );
        router.push("/checkin/dangerous-goods");
    };

    const isFormValid =
        passengers.length > 0 &&
        passengers.every(
            (p) =>
                p.nationality &&
                p.phone &&
                p.phone.length >= 10
        );

    return (
        <>
            <ProgressBar step={3} />
            <div className="container">
                <div className="details-container">
                    <div className="details-card">
                        <h2 className="details-title">
                            Passenger Details
                        </h2>
                        {passengers.map((p) => (
                            <div
                                key={p.id}
                                className="details-section"
                            >
                                <div className="passenger-name">
                                    {p.name}
                                </div>
                                <div className="form-group">
                                    <label>Nationality</label>
                                    <input
                                        className={`input ${errors[`${p.id}-nationality`]
                                                ? "error"
                                                : ""
                                            }`}
                                        value={p.nationality || ""}
                                        onChange={(e) =>
                                            updatePassenger(
                                                p.id,
                                                "nationality",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[`${p.id}-nationality`] && (
                                        <div className="error-text">
                                            {
                                                errors[
                                                `${p.id}-nationality`
                                                ]
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Phone number</label>
                                    <div className="phone-row">
                                        <select
                                            className="country-code"
                                            value={p.countryCode || "+66"}
                                            onChange={(e) =>
                                                updatePassenger(
                                                    p.id,
                                                    "countryCode",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="+66">
                                                🇹🇭 +66
                                            </option>
                                            <option value="+1">
                                                🇺🇸 +1
                                            </option>
                                            <option value="+44">
                                                🇬🇧 +44
                                            </option>
                                        </select>
                                        <input
                                            className={`phone-input ${errors[`${p.id}-phone`]
                                                    ? "error"
                                                    : ""
                                                }`}
                                            value={p.phone || ""}
                                            onChange={(e) =>
                                                updatePassenger(
                                                    p.id,
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    {errors[`${p.id}-phone`] && (
                                        <div className="error-text">
                                            {
                                                errors[
                                                `${p.id}-phone`
                                                ]
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <StickyActionBar
                disabled={!isFormValid}
                onContinue={handleContinue}
            />
        </>
    );
}




// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import ProgressBar from "@/components/ProgressBar";
// import StickyActionBar from "@/components/StickyActionBar";

// interface Passenger {
//     id: number;
//     name: string;
//     nationality?: string;
//     phone?: string;
//     countryCode?: string;
// }

// export default function Details() {
//     const [passengers, setPassengers] = useState<Passenger[]>([]);
//     const [errors, setErrors] = useState<any>({});
//     const router = useRouter();

//     useEffect(() => {
//         const data = sessionStorage.getItem("selectedPassengers");
//         if (data) setPassengers(JSON.parse(data));
//     }, []);

//     const updatePassenger = (
//         id: number,
//         field: string,
//         value: string
//     ) => {
//         setPassengers((prev) =>
//             prev.map((p) =>
//                 p.id === id ? { ...p, [field]: value } : p
//             )
//         );
//     };

//     const validate = () => {
//         const newErrors: any = {};
//         passengers.forEach((p) => {
//             if (!p.nationality) {
//                 newErrors[`${p.id}-nationality`] = "Nationality is required";
//             }
//             if (!p.phone || p.phone.length < 7) {
//                 newErrors[`${p.id}-phone`] =
//                     "Enter a valid phone number";
//             }
//         });
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleContinue = () => {
//         if (!validate()) return;
//         sessionStorage.setItem(
//             "selectedPassengers",
//             JSON.stringify(passengers)
//         );
//         router.push("/checkin/dangerous-goods");
//     };

//     const isFormValid =
//         passengers.length > 0 &&
//         passengers.every(
//             (p) =>
//                 p.nationality &&
//                 p.phone &&
//                 p.phone.length >= 7
//         );
//     return (
//         <>
//             <ProgressBar step={3} />
//             <div className="container">
//                 <div className="details-container">
//                     <div className="details-card">
//                         <h2 className="details-title">
//                             Passenger Details
//                         </h2>
//                         {passengers.map((p) => (
//                             <div
//                                 key={p.id}
//                                 className="details-section"
//                             >
//                                 <div className="passenger-name">
//                                     {p.name}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Nationality</label>
//                                     <input
//                                         className={`input ${errors[`${p.id}-nationality`]
//                                             ? "error"
//                                             : ""
//                                             }`}
//                                         value={p.nationality || ""}
//                                         onChange={(e) =>
//                                             updatePassenger(
//                                                 p.id,
//                                                 "nationality",
//                                                 e.target.value
//                                             )
//                                         }
//                                     />
//                                     {errors[`${p.id}-nationality`] && (
//                                         <div className="error-text">
//                                             {errors[
//                                                 `${p.id}-nationality`
//                                             ]}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Phone number</label>
//                                     <div className="phone-row">
//                                         <select
//                                             className="country-code"
//                                             value={p.countryCode || "+66"}
//                                             onChange={(e) =>
//                                                 updatePassenger(
//                                                     p.id,
//                                                     "countryCode",
//                                                     e.target.value
//                                                 )
//                                             }
//                                         >
//                                             <option value="+66">
//                                                 🇹🇭 +66
//                                             </option>
//                                             <option value="+1">
//                                                 🇺🇸 +1
//                                             </option>
//                                             <option value="+44">
//                                                 🇬🇧 +44
//                                             </option>
//                                         </select>
//                                         <input
//                                             className={`phone-input ${errors[`${p.id}-phone`]
//                                                 ? "error"
//                                                 : ""
//                                                 }`}
//                                             value={p.phone || ""}
//                                             onChange={(e) =>
//                                                 updatePassenger(
//                                                     p.id,
//                                                     "phone",
//                                                     e.target.value
//                                                 )
//                                             }
//                                         />
//                                     </div>
//                                     {errors[`${p.id}-phone`] && (
//                                         <div className="error-text">
//                                             {errors[`${p.id}-phone`]}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <StickyActionBar
//                 disabled={!isFormValid}
//                 onContinue={handleContinue}
//             />
//         </>
//     );
// }