import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { User, Course } from "@/types";

export async function POST(request: Request) {
  try {
    const { userId, courseId } = await request.json();

    if (!userId || !courseId) {
      return NextResponse.json(
        { message: "Kullanıcı ID ve Kurs ID gereklidir." },
        { status: 400 }
      );
    }

    const db = getDb();
    const userIndex = db.users.findIndex((u: User) => u.id === userId);
    const course = db.courses.find((c: Course) => c.id === courseId);

    if (userIndex === -1 || !course) {
      return NextResponse.json(
        { message: "Kullanıcı veya kurs bulunamadı." },
        { status: 404 }
      );
    }

    const user = db.users[userIndex];

    if (user.purchasedCourseIds.includes(courseId)) {
      return NextResponse.json(
        { message: "Bu kurs zaten satın alınmış." },
        { status: 400 }
      );
    }

    if (user.wallet < course.price) {
      return NextResponse.json(
        {
          success: false,
          message: `Yetersiz bakiye. Gerekli: ₺${course.price}, Mevcut: ₺${user.wallet}`,
        },
        { status: 400 }
      );
    }

    db.users[userIndex].purchasedCourseIds.push(courseId);
    db.users[userIndex].wallet -= course.price;

    saveDb(db);

    return NextResponse.json({
      success: true,
      message: `${course.title} başarıyla satın alındı!`,
      user: db.users[userIndex],
      remainingBalance: db.users[userIndex].wallet,
    });
  } catch (error) {
    console.error("Satın Alma Hatası:", error);
    return NextResponse.json({ message: "Sunucu Hatası" }, { status: 500 });
  }
}
