import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { User } from "@/types";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Basit bir veritabanı okuması
    const db = getDb();
    const user = db.users.find(
      (u: User) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Geçersiz kullanıcı adı veya şifre." },
        { status: 401 }
      );
    }

    const { password: _, ...userData } = user;

    return NextResponse.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Login Hatası:", error);
    return NextResponse.json({ message: "Sunucu Hatası" }, { status: 500 });
  }
}
