# การตั้งค่าระบบ Authentication

## ขั้นตอนการติดตั้งและตั้งค่า

### 1. ติดตั้ง Dependencies
```bash
npm install prisma @prisma/client bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` ในโฟลเดอร์ root ของโปรเจ็กต์:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/booking_app_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"
```

### 3. ตั้งค่า PostgreSQL Database
1. ติดตั้ง PostgreSQL บนเครื่องของคุณ
2. สร้างฐานข้อมูลใหม่ชื่อ `booking_app_db`
3. แก้ไข `DATABASE_URL` ใน `.env` ให้ตรงกับการตั้งค่าของคุณ

### 4. รัน Prisma Migration
```bash
npx prisma migrate dev --name init
```

### 5. สร้าง Prisma Client
```bash
npx prisma generate
```

### 6. ทดสอบระบบ
```bash
npm run dev
```

## API Endpoints ที่สร้างขึ้น

- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - เข้าสู่ระบบ
- `POST /api/auth/logout` - ออกจากระบบ
- `GET /api/auth/me` - ตรวจสอบสถานะการเข้าสู่ระบบ

## การใช้งาน

### Frontend Components
- ใช้ `useAuth()` hook เพื่อเข้าถึงฟังก์ชัน authentication
- Forms ได้ถูกอัปเดตให้เชื่อมต่อกับ API แล้ว

### ตัวอย่างการใช้งาน
```tsx
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  
  if (user) {
    return (
      <div>
        <p>สวัสดี {user.fullName}</p>
        <button onClick={logout}>ออกจากระบบ</button>
      </div>
    )
  }
  
  return <div>กรุณาเข้าสู่ระบบ</div>
}
```

## Security Features

- ✅ Password hashing ด้วย bcryptjs
- ✅ JWT tokens สำหรับ authentication
- ✅ HTTP-only cookies
- ✅ Input validation ด้วย Zod
- ✅ CSRF protection (SameSite cookies)
- ✅ Secure cookies ใน production

## Database Schema

```prisma
model User {
  id          String   @id @default(cuid())
  fullName    String
  email       String   @unique
  phoneNumber String   @unique
  password    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("users")
}
``` 