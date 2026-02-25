import { mapRegions } from "@/data/philippinesData";
import { auth } from "@/lib/auth";
import { requireAuth } from "@/lib/require-auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { session, error } = await requireAuth();

    if (error) return error;

    // 2️⃣ Get query params
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Missing coordinates" },
        { status: 400 },
      );
    }

    const googleApi = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`,
    );

    const data = await googleApi.json();

    if (!data.results.length) {
      throw new Error(
        "Unable to determine the location from the provided coordinates.",
      );
    }

    const addressComponents = data.results[0].address_components.map(
      (i: { short_name: string }) => i.short_name.toLowerCase(),
    );

    const result = mapRegions.find((item) => {
      const lowerTitle = item.title.toLowerCase();

      const matchesFormatted = addressComponents.some((shortName: string) =>
        shortName.includes(lowerTitle),
      );
      return matchesFormatted;
    });

    if (result === undefined) {
      throw new Error(
        "We’re unable to map your current location in our system. This may be because you’re using a VPN connected to another country or you’re currently outside the country.",
      );
    }

    return NextResponse.json({
      filteredResult: result,
      apiResult: data.results,
    });
  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
