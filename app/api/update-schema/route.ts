import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    await pool.query("ALTER TABLE KodUser ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255) NULL");
    await pool.query("ALTER TABLE KodUser ADD COLUMN IF NOT EXISTS reset_token_expiry DATETIME NULL");

    return NextResponse.json({ message: "Schema updated successfully" });
  } catch (error) {
    console.error("Update schema error:", error);
    return NextResponse.json({ error: "Failed to update schema" }, { status: 500 });
  }
}
