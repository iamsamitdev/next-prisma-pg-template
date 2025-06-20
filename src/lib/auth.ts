import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// กำหนด JWT_SECRET และ JWT_EXPIRES_IN จากข้อมูลใน .env หากไม่มีจะส่งข้อมูลกลับไปยัง client
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
if (!JWT_SECRET || !JWT_EXPIRES_IN) {
    throw new Error('JWT_SECRET หรือ JWT_EXPIRES_IN ไม่ถูกต้อง')
}

// สร้างฟังก์ชันสำหรับการเข้ารหัสรหัสผ่าน
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12 // จำนวนรอบในการเข้ารหัส
    return bcrypt.hash(password, saltRounds)
}

// สร้างฟังก์ชันสำหรับการเปรียบเทียบรหัสผ่าน
export async function comparePasswords(
    plainTextPassword: string,
    hashedPassword: string
):  Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword)
}

// สร้างฟังก์ชันสำหรับการสร้าง Token ด้วย JWT
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET!, { 
        expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions)
}

// สร้างฟังก์ชันสำหรับการตรวจสอบ Token
export function verifyToken(token: string): { userId: string } | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET!) as { userId: string }
        return decoded
    } catch (error) {
        console.error("Token verification failed:", error)
        return null
    }
}

// สร้าง interface สำหรับการตรวจสอบการยืนยันตัวตน
export interface AuthUser {
    id: string
    fullName: string
    email: string
    phoneNumber?: string
    createdAt: Date
    token: string
}