/**
 * @file apps/api/src/common/pagination/cursor.util.ts
 * @description Opaque cursor encoding and decoding utilities for Relay-compliant pagination.
 * @module @vitalai/api/common
 */

export function encodeCursor(id: string): string {
  return Buffer.from(`cursor:${id}`).toString("base64");
}

export function decodeCursor(cursor: string): string {
  const decoded = Buffer.from(cursor, "base64").toString("utf-8");
  if (!decoded.startsWith("cursor:")) {
    throw new Error("Invalid cursor format");
  }
  return decoded.slice(7);
}
