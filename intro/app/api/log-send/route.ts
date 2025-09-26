import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    country,
    fullName,
    selectedMep,
  }: { country: string; fullName: string; selectedMep: string } =
    await req.json();
  console.log("Email sent:", {
    country,
    fullName: `${fullName.substring(0, 10)}...`,
    selectedMep,
    timestamp: new Date().toISOString(),
  }); // Log send

  return new Response("OK");
}
