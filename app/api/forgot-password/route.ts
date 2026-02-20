import crypto from "crypto";
import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";

type UserRow = RowDataPacket & {
  uid: number;
};

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const [users] = await pool.query<UserRow[]>("SELECT uid FROM KodUser WHERE email = ? LIMIT 1", [email]);

    if (users.length > 0) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 15 * 60 * 1000);

      await pool.query<ResultSetHeader>(
        "UPDATE KodUser SET reset_token = ?, reset_token_expiry = ? WHERE uid = ?",
        [resetToken, expiry, users[0].uid]
      );

      return NextResponse.json({
        message: "Reset link generated",
        resetLink: `/reset-password?token=${resetToken}`,
      });
    }

    return NextResponse.json({
      message: "Reset link generated",
      resetLink: "",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed to generate reset link" }, { status: 500 });
  }
}
