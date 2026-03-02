import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    if (
        body.lastName === "HUUM" &&
        body.pnr === "ABC123"
    ) {
        return NextResponse.json({
            passengers: [
                {
                    id: 1,
                    name: "ALEX HUUM",
                    seat: "12A",
                    nationality: "TH",
                },
                {
                    id: 2,
                    name: "Somsee Huum",
                    seat: "12B",
                    nationality: "US",
                },
            ],
        });
    }

    return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
    );
}