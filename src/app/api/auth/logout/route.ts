import { NextResponse } from 'next/server'

// สร้าง route สำหรับการออกจากระบบ
// URL: /api/auth/logout
// Method: POST
// Response: { message: string }
export async function POST() {
  try {
    // ส่งข้อมูลกลับไปยัง client
    const response = NextResponse.json({
      message: "ออกจากระบบสำเร็จ"
    }, { status: 200 })
    
    // ลบ token การยืนยันตัวตนออกจาก cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true, // ป้องกัน XSS จากการรั่วไหลข้อมูล
      secure: process.env.NODE_ENV === 'production', // ป้องกันการรั่วไหลข้อมูล ถ้าเป็น production จะต้องเป็น https ถ้าเป็น development จะเป็น http
      sameSite: 'lax', // ป้องกัน CSRF จากการรั่วไหลข้อมูล ถ้าเป็น lax จะสามารถเข้าถึงจากหน้าเว็บได้ ถ้าเป็น strict จะต้องเข้าผ่านหน้าเว็บเท่านั้น ถ้าเป็น none จะสามารถเข้าถึงจากหน้าเว็บได้ แต่จะต้องเป็น https
      maxAge: 0, // ตั้งค่า maxAge เป็น 0 เพื่อลบ token การยืนยันตัวตนออกจาก cookie
      path: '/',
    })
    
    return response
    
  } catch (error) {

    console.error('การออกจากระบบ error:', error)
    // ถ้ามีข้อผิดพลาดจากการออกจากระบบ จะส่งข้อมูลกลับไปยัง client
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการออกจากระบบ" },
      { status: 500 }
    )
  }
} 