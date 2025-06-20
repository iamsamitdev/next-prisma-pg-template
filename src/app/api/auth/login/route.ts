import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { comparePasswords, generateToken } from '@/lib/auth'

// สร้าง schema สำหรับการเข้าสู่ระบบ ที่มีการตรวจสอบข้อมูลที่กรอกเข้ามา
const LoginSchema = z.object({
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  password: z.string().min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
  remember: z.boolean().optional(),
})

// สร้าง route สำหรับการเข้าสู่ระบบ ที่มีการตรวจสอบข้อมูลที่กรอกเข้ามา
// URL: /api/auth/login
// Method: POST
// Body: { email: string, password: string, remember: boolean }
// Response: { message: string, user: { id: string, fullName: string, email: string, phoneNumber: string, createdAt: string } }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // รับข้อมูลจาก request body
    const validatedData = LoginSchema.parse(body)
    
    // ตรวจสอบว่ามีผู้ใช้งานที่มีอีเมลนี้อยู่ในระบบหรือไม่
    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.email
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      )
    }
    
    // ตรวจสอบว่ารหัสผ่านที่กรอกเข้ามาใช้งานตรงกับรหัสผ่านในฐานข้อมูลหรือไม่
    const isPasswordValid = await comparePasswords(validatedData.password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      )
    }
    
    // สร้าง token สำหรับการยืนยันตัวตน
    const token = generateToken(user.id)
    
    // ส่งข้อมูลผู้ใช้งาน
    const userResponse = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
    }
    
    // ส่งข้อมูลผู้ใช้งาน
    const response = NextResponse.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: userResponse,
    }, { status: 200 })
    
    // ตั้งค่า cookie สำหรับการยืนยันตัวตน
    const maxAge = validatedData.remember ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60 // 30 days or 7 days
    response.cookies.set('auth-token', token, {
      httpOnly: true, // ป้องกัน XSS จากการรั่วไหลข้อมูล
      secure: process.env.NODE_ENV === 'production', // ป้องกันการรั่วไหลข้อมูล ถ้าเป็น production จะต้องเป็น https ถ้าเป็น development จะเป็น http
      sameSite: 'lax', // ป้องกัน CSRF จากการรั่วไหลข้อมูล ถ้าเป็น lax จะสามารถเข้าถึงจากหน้าเว็บได้ ถ้าเป็น strict จะต้องเข้าผ่านหน้าเว็บเท่านั้น ถ้าเป็น none จะสามารถเข้าถึงจากหน้าเว็บได้ แต่จะต้องเป็น https
      maxAge, // ตั้งค่า maxAge สำหรับการยืนยันตัวตน ถ้าเป็น 30 วัน จะต้องเข้าถึงจากหน้าเว็บได้ ถ้าเป็น 7 วัน จะต้องเข้าถึงจากหน้าเว็บได้
      path: '/',
    })
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    
    // ถ้ามีข้อผิดพลาดจาก zod จะส่งข้อมูลกลับไปยัง client
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ถูกต้อง", details: error.errors },
        { status: 400 }
      )
    }
    
    // ถ้ามีข้อผิดพลาดจากการเข้าสู่ระบบ จะส่งข้อมูลกลับไปยัง client
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" },
      { status: 500 }
    )
  }
} 