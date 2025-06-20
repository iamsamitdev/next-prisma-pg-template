import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description: "นโยบายความเป็นส่วนตัวของ BookGeek เกี่ยวกับการเก็บรักษาและใช้ข้อมูลส่วนบุคคล",
  keywords: "นโยบายความเป็นส่วนตัว, BookGeek, ข้อมูลส่วนบุคคล, PDPA",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden -mt-24">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600"
            style={{
              backgroundImage: `url('/images/front/service_hero.avif')`
            }}
          ></div>
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              นโยบายความเป็นส่วนตัว
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ<br />
            และมุ่งมั่นปกป้องข้อมูลส่วนบุคคลของคุณ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 h-auto">
              <Link href="#policy-content" className="inline-flex items-center justify-center">
                อ่านนโยบาย
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-8 py-3 text-lg rounded-full backdrop-blur-md bg-white/10 h-auto">
              <Link href="/contact" className="inline-flex items-center justify-center text-white">
                สอบถามเพิ่มเติม
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Policy Content Section */}
      <section id="policy-content" className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            
            {/* Introduction */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ข้อมูลทั่วไป</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    นโยบายความเป็นส่วนตัวนี้อธิบายวิธีที่ BookGeek ("เรา", "บริษัท") เก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณ
                    เมื่อคุณใช้บริการของเรา
                  </p>
                  <p>
                    เราให้ความสำคัญกับความเป็นส่วนตัวของคุณและมุ่งมั่นที่จะปกป้องข้อมูลส่วนบุคคลของคุณตามกฎหมายคุมครองข้อมูลส่วนบุคคล
                    พ.ศ. 2562 (PDPA)
                  </p>
                </div>
              </div>
            </div>

            {/* Data Collection */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ข้อมูลที่เราเก็บรวบรวม</h2>
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">ข้อมูลส่วนบุคคล</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>ชื่อ นามสกุล</li>
                      <li>ที่อยู่อีเมล</li>
                      <li>หมายเลขโทรศัพท์</li>
                      <li>ข้อมูลการชำระเงิน</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">ข้อมูลการใช้งาน</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>ประวัติการจองบริการ</li>
                      <li>การโต้ตอบกับผู้เชี่ยวชาญ</li>
                      <li>ข้อมูลการเข้าใช้งานเว็บไซต์</li>
                      <li>คุกกี้และเทคโนโลยีติดตาม</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Usage */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">การใช้ข้อมูล</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>เราใช้ข้อมูลส่วนบุคคลของคุณเพื่อ:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>ให้บริการจองผู้เชี่ยวชาญและวิทยากร</li>
                    <li>ประมวลผลการชำระเงิน</li>
                    <li>ส่งการแจ้งเตือนและข้อมูลสำคัญ</li>
                    <li>ปรับปรุงคุณภาพบริการ</li>
                    <li>วิเคราะห์พฤติกรรมการใช้งาน</li>
                    <li>ป้องกันการทุจริตและรักษาความปลอดภัย</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">การปกป้องข้อมูล</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสม:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>การเข้ารหัสข้อมูลด้วย SSL/TLS</li>
                    <li>การควบคุมการเข้าถึงข้อมูล</li>
                    <li>การสำรองข้อมูลอย่างสม่ำเสมอ</li>
                    <li>การตรวจสอบความปลอดภัยเป็นประจำ</li>
                    <li>การฝึกอบรมพนักงานเรื่องความปลอดภัยข้อมูล</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Rights */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">สิทธิของเจ้าของข้อมูล</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>คุณมีสิทธิ์ในการ:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>เข้าถึงและขอสำเนาข้อมูลส่วนบุคคล</li>
                    <li>แก้ไขข้อมูลส่วนบุคคลที่ไม่ถูกต้อง</li>
                    <li>ลบหรือทำลายข้อมูลส่วนบุคคล</li>
                    <li>ระงับการใช้ข้อมูลส่วนบุคคล</li>
                    <li>โอนย้ายข้อมูลส่วนบุคคล</li>
                    <li>คัดค้านการประมวลผลข้อมูล</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ติดต่อเรา</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่:</p>
                  <div className="space-y-2">
                    <p><strong>อีเมล:</strong> privacy@bookgeek.com</p>
                    <p><strong>โทรศัพท์:</strong> 02-123-4567</p>
                    <p><strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.8), rgba(59,130,246,0.8), rgba(147,51,234,0.8)), url('/images/front/service_cta.avif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
        ></div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            ความเป็นส่วนตัวของคุณสำคัญ
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            เรามุ่งมั่นปกป้องข้อมูลของคุณด้วยมาตรฐานสูงสุด<br />
            เพื่อให้คุณใช้บริการได้อย่างมั่นใจ
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-xl rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 font-semibold h-auto">
              <Link href="/service" className="inline-flex items-center justify-center">
                เริ่มใช้บริการ
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-10 py-4 text-xl rounded-full backdrop-blur-md bg-white/10 h-auto">
              <Link href="/contact" className="inline-flex items-center justify-center text-white">
                สอบถามเพิ่มเติม
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
