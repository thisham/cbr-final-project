import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Sistem Prediksi Autisme Pada Anak" },
    { status: 200 }
  );
}
