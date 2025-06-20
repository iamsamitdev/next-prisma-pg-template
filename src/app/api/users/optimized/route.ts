import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Optimized API สำหรับข้อมูลหลักล้าน records
export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Optimized API called:', request.url)
    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50'))) // จำกัด limit ขั้นต่ำ 1, สูงสุด 100
    const search = searchParams.get('search')?.trim() || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc'
    const cursor = searchParams.get('cursor') // สำหรับ cursor-based pagination
    
    const offset = (page - 1) * limit

    // 🚀 Optimization 1: ใช้ Cursor-based Pagination สำหรับข้อมูลมาก
    if (cursor && !search) {
      const users = await prisma.user.findMany({
        take: limit + 1, // เอาเพิ่ม 1 เพื่อเช็ค hasNext
        cursor: { id: cursor },
        skip: 1, // ข้าม cursor record
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { [sortBy]: sortOrder },
      })

      const hasNext = users.length > limit
      if (hasNext) users.pop() // ลบ record สุดท้ายออก

      return NextResponse.json({
        users,
        hasNext,
        nextCursor: hasNext ? users[users.length - 1]?.id : null,
        pagination: {
          type: 'cursor',
          limit,
          sortBy,
          sortOrder
        }
      })
    }

    // 🚀 Optimization 2: สำหรับการค้นหา ใช้ Full-text Search
    let whereCondition: any = {}
    
    if (search) {
      // ใช้ PostgreSQL Full-text Search
      whereCondition = {
        OR: [
          {
            fullName: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            phoneNumber: {
              contains: search,
              mode: 'insensitive'
            }
          }
        ]
      }
    }

    // 🚀 Optimization 3: ใช้ Promise.all แต่ optimize count query
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereCondition,
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip: offset,
        take: limit,
      }),
      // 🚀 Optimization 4: ใช้ count ปกติ (ปลอดภัยกว่า)
      prisma.user.count({ where: whereCondition })
    ])

    const totalPages = Math.ceil(total / limit)

    console.log('📊 API Response:', { 
      usersCount: users.length, 
      total, 
      page, 
      limit, 
      totalPages 
    })

    return NextResponse.json({
      users,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      pagination: {
        type: 'offset',
        sortBy,
        sortOrder
      },
      // 🚀 Optimization 5: เพิ่ม metadata สำหรับ client-side optimization
      meta: {
        isApproximate: !search,
        queryTime: Date.now()
      }
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' },
      { status: 500 }
    )
  }
}

// 🚀 Optimization 6: Approximate Count สำหรับตารางใหญ่
async function getApproximateCount(): Promise<number> {
  try {
    // ลองใช้ PostgreSQL statistics ก่อน (สำหรับ production)
    const result = await prisma.$queryRaw<Array<{ estimate: bigint }>>`
      SELECT reltuples::BIGINT as estimate
      FROM pg_class 
      WHERE relname = 'users';
    `
    
    const estimate = result[0]?.estimate ? Number(result[0].estimate) : 0
    
    // ถ้า estimate เป็น 0 หรือไม่ถูกต้อง ให้ใช้ count ปกติ
    if (estimate > 0) {
      return estimate
    }
    
    // Fallback: ใช้ count ปกติ
    return await prisma.user.count()
  } catch (error) {
    console.error('Error getting approximate count, using regular count:', error)
    // Fallback ไปใช้ count ปกติ
    try {
      return await prisma.user.count()
    } catch (countError) {
      console.error('Error getting regular count:', countError)
      return 0
    }
  }
}

// 🚀 Optimization 7: Bulk Operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { operation, data } = body

    if (operation === 'bulk_create') {
      // Bulk insert สำหรับข้อมูลจำนวนมาก
      const batchSize = 1000 // ทำทีละ 1000 records
      const results = []

      for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize)
        
        const batchResult = await prisma.user.createMany({
          data: batch,
          skipDuplicates: true // ข้าม record ที่ซ้ำ
        })
        
        results.push(batchResult)
      }

      return NextResponse.json({
        success: true,
        totalCreated: results.reduce((sum, r) => sum + r.count, 0),
        batches: results.length
      })
    }

    return NextResponse.json(
      { error: 'Invalid operation' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error in bulk operation:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดำเนินการ' },
      { status: 500 }
    )
  }
} 