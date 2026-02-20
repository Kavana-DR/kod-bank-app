import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";

type ExistingUserRow = RowDataPacket & {
  uid: number;
};

export async function POST(request: Request) {
  try {
    const { username, email, password, phone } = (await request.json()) as {
      username?: string;
      email?: string;
      password?: string;
      phone?: string;
    };

    if (!username || !email || !password || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const [existingUsers] = await pool.query<ExistingUserRow[]>(
      "SELECT uid FROM KodUser WHERE username = ? LIMIT 1",
      [username]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query<ResultSetHeader>(
      "INSERT INTO KodUser (username, email, password, phone, role, balance) VALUES (?, ?, ?, ?, 'customer', 10000)",
      [username, email, hashedPassword, phone]
    );

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
