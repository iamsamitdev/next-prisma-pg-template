import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// สร้าง schema สำหรับการลงทะเบียน ที่มีการตรวจสอบข้อมูลที่กรอกเข้ามา
const RegisterSchema = z.object({
  fullName: z.string().min(2, { message: "กรุณากรอกชื่อ-สกุลอย่างน้อย 2 ตัวอักษร" }),
  phoneNumber: z.string().min(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)" }).regex(/^[0-9]+$/, { message: "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  password: z.string().min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
})

// สร้าง route สำหรับการลงทะเบียน ที่มีการตรวจสอบข้อมูลที่กรอกเข้ามา 
// URL: /api/auth/register
// Method: POST
// Body: { fullName: string, phoneNumber: string, email: string, password: string }
// Response: { message: string, user: { id: string, fullName: string, email: string, phoneNumber: string, createdAt: string } }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // รับข้อมูลจาก request body
    const validatedData = RegisterSchema.parse(body)
    
    // ตรวจสอบว่ามีผู้ใช้งานที่มีอีเมลหรือเบอร์โทรศัพท์นี้อยู่ในระบบหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { phoneNumber: validatedData.phoneNumber }
        ]
      }
    })
    
    // ถ้ามีผู้ใช้งานที่มีอีเมลหรือเบอร์โทรศัพท์นี้อยู่ในระบบ จะส่งข้อมูลกลับไปยัง client
    if (existingUser) {
      return NextResponse.json(
        { 
          error: existingUser.email === validatedData.email 
            ? "อีเมลนี้ถูกใช้งานแล้ว" 
            : "เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว"
        },
        { status: 400 }
      )
    }
    
    // รหัสผ่านจะถูก hash ก่อนบันทึกลงฐานข้อมูล
    const hashedPassword = await hashPassword(validatedData.password)
    
    // สร้างผู้ใช้งานใหม่
    const user = await prisma.user.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        password: hashedPassword,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
      }
    })
    
    // ส่งข้อมูลกลับไปยัง client
    const response = NextResponse.json({
      message: "สมัครสมาชิกสำเร็จ",
      user,
    }, { status: 201 })
    
    return response
    
  } catch (error) {
    console.error('Registration error:', error)
    
    // ถ้ามีข้อผิดพลาดจาก zod จะส่งข้อมูลกลับไปยัง client
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ถูกต้อง", details: error.errors },
        { status: 400 }
      )
    }
    
    // ถ้ามีข้อผิดพลาดจากการสร้างผู้ใช้งานใหม่ จะส่งข้อมูลกลับไปยัง client
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสมัครสมาชิก" },
      { status: 500 }
    )
  }
} 