export interface Passenger {
    id: number;
    name: string;
    seat: string;
    nationality: string;
}

export interface CheckinResponse {
    passengers: Passenger[];
}

export interface CheckinRequest {
    lastName: string;
    pnr: string;
}

export const checkinService = {
    async retrieveBooking(payload: CheckinRequest) {
        const res = await fetch("/api/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error("Not found");
        }

        return res.json();
    },
};