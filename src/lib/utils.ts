import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// สร้างฟังก์ชันสำหรับการรวม class ของ Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// สร้างฟังก์ชันสำหรับการดึงตัวอักษรตัวแรกของชื่อ
export const getInitials = (str: string): string => {
  if (typeof str !== "string" || !str.trim()) return "?"

  return (
    str
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?"
  )
}