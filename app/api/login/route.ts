import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import { generateToken, oneDayFromNow } from "@/lib/jwt";

const AUTH_COOKIE = "kodbank_token";

type UserRow = RowDataPacket & {
  uid: number;
  username: string;
  password: string;
  role: string;
};

export async function POST(request: Request) {
  try {
    const { username, password } = (await request.json()) as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const [users] = await pool.query<UserRow[]>(
      "SELECT uid, username, password, role FROM KodUser WHERE username = ? LIMIT 1",
      [username]
    );

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(user.username, user.role);
    const expiry = oneDayFromNow();

    await pool.query<ResultSetHeader>(
      "INSERT INTO UserToken (token, uid, expiry) VALUES (?, ?, ?)",
      [token, user.uid, expiry]
    );

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set({
      name: AUTH_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiry,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
