import jwt, { type JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

if (!jwtSecret) {
  throw new Error("Missing required environment variable: JWT_SECRET");
}

export type KodbankJwtPayload = JwtPayload & {
  role: string;
};

export function generateToken(username: string, role: string): string {
  return jwt.sign({ role }, jwtSecret, {
    algorithm: "HS256",
    subject: username,
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): KodbankJwtPayload {
  const decoded = jwt.verify(token, jwtSecret, {
    algorithms: ["HS256"],
  });

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    !("role" in decoded) ||
    typeof decoded.role !== "string"
  ) {
    throw new Error("Invalid token payload");
  }

  return decoded as KodbankJwtPayload;
}

export function oneDayFromNow(): Date {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}
