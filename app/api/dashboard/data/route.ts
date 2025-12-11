import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json({
      courses: db.courses,
      matchRequests: db.matchRequests,
    });
  } catch (error) {
    console.error("Veri yükleme hatası:", error);
    return NextResponse.json({ message: "Veri yüklenemedi" }, { status: 500 });
  }
}
