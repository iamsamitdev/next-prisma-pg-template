import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// สร้าง route สำหรับการตรวจสอบการยืนยันตัวตน
// URL: /api/auth/me
// Method: GET
// Response: { user: { id: string, fullName: string, email: string, phoneNumber: string, createdAt: string } }
export async function GET(request: NextRequest) {
  try {
    // รับ token จาก cookie
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: "ไม่พบ token การยืนยันตัวตน" },
        { status: 401 }
      )
    }
    
    // ตรวจสอบ token
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json(
        { error: "Token ไม่ถูกต้องหรือหมดอายุ" },
        { status: 401 }
      )
    }
    
    // ตรวจสอบว่ามีผู้ใช้งานที่มี id นี้อยู่ในระบบหรือไม่
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    
    // ถ้ามีผู้ใช้งานที่มี id นี้อยู่ในระบบ จะส่งข้อมูลผู้ใช้งานกลับไปยัง client
    if (!user) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลผู้ใช้" },
        { status: 404 }
      )
    }
    
    // ส่งข้อมูลผู้ใช้งานกลับไปยัง client
    return NextResponse.json({
      user
    }, { status: 200 })
    
  } catch (error) {
    console.error('การตรวจสอบการยืนยันตัวตน error:', error)

    // ถ้ามีข้อผิดพลาดจากการตรวจสอบการยืนยันตัวตน จะส่งข้อมูลกลับไปยัง client
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการตรวจสอบการยืนยันตัวตน" },
      { status: 500 }
    )
  }
} 