/**
 * @file apps/web/src/lib/utils.ts
 * @description Class name utility using pure clsx.
 * @author yuva.devlab@gmail.com
 */

import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
