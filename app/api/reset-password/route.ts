import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";

type UserRow = RowDataPacket & {
  uid: number;
};

export async function POST(request: Request) {
  try {
    const { token, newPassword } = (await request.json()) as {
      token?: string;
      newPassword?: string;
    };

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
    }

    const [users] = await pool.query<UserRow[]>(
      "SELECT uid FROM KodUser WHERE reset_token = ? AND reset_token_expiry > NOW() LIMIT 1",
      [token]
    );

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query<ResultSetHeader>(
      "UPDATE KodUser SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE uid = ?",
      [hashedPassword, users[0].uid]
    );

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
