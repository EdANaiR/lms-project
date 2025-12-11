import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { User } from "@/types";

export async function POST(request: Request) {
  try {
    const { studentId, topic } = await request.json();

    const db = getDb();

    // En uygun eğitmeni bulur : Listedeki ilk eğitmen
    const instructor = db.users.find((u: User) => u.role === "instructor");

    if (!instructor) {
      return NextResponse.json(
        { message: "Şu anda müsait eğitmen bulunmamaktadır." },
        { status: 404 }
      );
    }

    const newRequestId = db.matchRequests.length + 1;
    const newRequest = {
      id: newRequestId,
      studentId,
      topic,
      status: "matched",
      assignedInstructorId: instructor.id,
      assignedInstructorName: instructor.username,
      notificationSent: true,
    };

    db.matchRequests.push(newRequest);
    saveDb(db);

    return NextResponse.json({
      success: true,
      message: `Talebiniz alındı. Eğitmen ${instructor.username} size atanmıştır.`,
      matchDetails: newRequest,
    });
  } catch (error) {
    console.error("Eşleştirme Hatası:", error);
    return NextResponse.json({ message: "Sunucu Hatası" }, { status: 500 });
  }
}
