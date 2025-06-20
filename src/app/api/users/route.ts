import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET /api/users - ดึงรายการ users ทั้งหมด
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // ดึง query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const isActive = searchParams.get('isActive')
    
    // คำนวณ offset สำหรับ pagination
    const offset = (page - 1) * limit
    
    // สร้าง where condition
    const where: any = {}
    
    // ถ้ามีการค้นหา
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    // ดึงข้อมูล users
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          createdAt: true,
          updatedAt: true,
          // ไม่ select password เพื่อความปลอดภัย
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.user.count({ where })
    ])
    
    // คำนวณ pagination info
    const totalPages = Math.ceil(total / limit)
    
    return NextResponse.json({
      users,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    })
    
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' },
      { status: 500 }
    )
  }
}

// POST /api/users - สร้าง user ใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phoneNumber, password } = body
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!fullName || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      )
    }
    
    // ตรวจสอบ email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'รูปแบบอีเมลไม่ถูกต้อง' },
        { status: 400 }
      )
    }
    
    // ตรวจสอบว่า email หรือ phoneNumber ซ้ำหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phoneNumber: phoneNumber }
        ]
      }
    })
    
    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
          { status: 409 }
        )
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return NextResponse.json(
          { error: 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว' },
          { status: 409 }
        )
      }
    }
    
    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // สร้าง user ใหม่
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
      },
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
    
    return NextResponse.json(newUser, { status: 201 })
    
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้' },
      { status: 500 }
    )
  }
} 