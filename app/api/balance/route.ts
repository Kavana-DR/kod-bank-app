import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/jwt";

const AUTH_COOKIE = "kodbank_token";

type BalanceRow = RowDataPacket & {
  balance: string;
};

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE)?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decodedUsername = "";
    try {
      const decoded = verifyToken(token);
      decodedUsername = typeof decoded.sub === "string" ? decoded.sub : "";
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedUsername) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    const [rows] = await pool.query<BalanceRow[]>(
      "SELECT balance FROM KodUser WHERE username = ? LIMIT 1",
      [decodedUsername]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: `Your balance is: \u20B9${rows[0].balance}` });
  } catch (error) {
    console.error("Balance error:", error);
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 });
  }
}
