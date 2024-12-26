import { randomBytes } from "crypto";

export function generateSecureToken(length: number = 32): string {
  const buffer = randomBytes(length / 2); // Since we're converting to hex, we need half the bytes
  return buffer.toString("hex");
}
