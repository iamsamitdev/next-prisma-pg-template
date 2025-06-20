import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET /api/users/[id] - ดึงข้อมูล user เฉพาะคน
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        // ไม่ select password เพื่อความปลอดภัย
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(user)
    
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - อัพเดตข้อมูล user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { fullName, email, phoneNumber, password } = body
    
    // ตรวจสอบว่า user มีอยู่หรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })
    
    if (!existingUser) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      )
    }
    
    // ตรวจสอบ email format ถ้ามีการอัพเดต email
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'รูปแบบอีเมลไม่ถูกต้อง' },
          { status: 400 }
        )
      }
      
      // ตรวจสอบว่า email ซ้ำกับคนอื่นหรือไม่
      const emailExists = await prisma.user.findFirst({
        where: {
          email: email,
          id: { not: id } // ไม่รวม user ปัจจุบัน
        }
      })
      
      if (emailExists) {
        return NextResponse.json(
          { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
          { status: 409 }
        )
      }
    }
    
    // ตรวจสอบว่า phoneNumber ซ้ำกับคนอื่นหรือไม่
    if (phoneNumber) {
      const phoneExists = await prisma.user.findFirst({
        where: {
          phoneNumber: phoneNumber,
          id: { not: id } // ไม่รวม user ปัจจุบัน
        }
      })
      
      if (phoneExists) {
        return NextResponse.json(
          { error: 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว' },
          { status: 409 }
        )
      }
    }
    
    // เตรียมข้อมูลสำหรับอัพเดต
    const updateData: any = {}
    
    if (fullName) updateData.fullName = fullName
    if (email) updateData.email = email
    if (phoneNumber) updateData.phoneNumber = phoneNumber
    
    // ถ้ามีการอัพเดตรหัสผ่าน
    if (password) {
      updateData.password = await bcrypt.hash(password, 12)
    }
    
    // อัพเดต user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        // ไม่ return password
      }
    })
    
    return NextResponse.json(updatedUser)
    
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัพเดตผู้ใช้' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - ลบ user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // ตรวจสอบว่า user มีอยู่หรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })
    
    if (!existingUser) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      )
    }
    
    // ลบ user
    await prisma.user.delete({
      where: { id }
    })
    
    return NextResponse.json(
      { message: 'ลบผู้ใช้สำเร็จ' },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการลบผู้ใช้' },
      { status: 500 }
    )
  }
} 