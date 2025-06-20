import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "นโยบายการใช้คุกกี้",
  description: "นโยบายการใช้คุกกี้ของ BookGeek เพื่อปรับปรุงประสบการณ์การใช้งาน",
  keywords: "นโยบายคุกกี้, BookGeek, cookies, ความเป็นส่วนตัว",
}

export default function CookiePolicy() {
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              นโยบายการใช้คุกกี้
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน<br />
            และให้บริการที่ดีที่สุดแก่คุณ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 h-auto">
              <Link href="#cookie-content" className="inline-flex items-center justify-center">
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

      {/* Cookie Content Section */}
      <section id="cookie-content" className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            
            {/* Introduction */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">คุกกี้คืออะไร</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    คุกกี้ (Cookies) คือไฟล์ข้อความขนาดเล็กที่เก็บไว้ในอุปกรณ์ของคุณเมื่อคุณเข้าชมเว็บไซต์
                    คุกกี้ช่วยให้เว็บไซต์จดจำข้อมูลเกี่ยวกับการเข้าชมของคุณ
                  </p>
                  <p>
                    เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ วิเคราะห์การใช้งาน และให้บริการที่เหมาะสมกับความต้องการของคุณ
                  </p>
                </div>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-red-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ประเภทของคุกกี้ที่เราใช้</h2>
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">คุกกี้ที่จำเป็น</h3>
                    <p className="mb-2">คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>การเข้าสู่ระบบและการรักษาเซสชัน</li>
                      <li>การจดจำการตั้งค่าของผู้ใช้</li>
                      <li>การรักษาความปลอดภัย</li>
                      <li>การทำงานของฟอร์มและการชำระเงิน</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">คุกกี้วิเคราะห์</h3>
                    <p className="mb-2">ช่วยให้เราเข้าใจการใช้งานเว็บไซต์:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>การนับจำนวนผู้เข้าชม</li>
                      <li>การวัดประสิทธิภาพของหน้าเว็บ</li>
                      <li>การวิเคราะห์พฤติกรรมผู้ใช้</li>
                      <li>การปรับปรุงเว็บไซต์</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">คุกกี้การตลาด</h3>
                    <p className="mb-2">ใช้เพื่อแสดงโฆษณาที่เหมาะสม:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>การแสดงเนื้อหาที่เหมาะสมกับความสนใจ</li>
                      <li>การติดตามประสิทธิภาพโฆษณา</li>
                      <li>การป้องกันการแสดงโฆษณาซ้ำ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">วิธีการใช้คุกกี้</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>เราใช้คุกกี้เพื่อวัตถุประสงค์ต่อไปนี้:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>ปรับปรุงประสบการณ์:</strong> จดจำการตั้งค่าและความชอบของคุณ</li>
                    <li><strong>วิเคราะห์การใช้งาน:</strong> เข้าใจว่าผู้ใช้ใช้เว็บไซต์อย่างไร</li>
                    <li><strong>ความปลอดภัย:</strong> ป้องกันการเข้าถึงที่ไม่ได้รับอนุญาต</li>
                    <li><strong>การตลาด:</strong> แสดงเนื้อหาและโฆษณาที่เกี่ยวข้อง</li>
                    <li><strong>การทำงานของเว็บไซต์:</strong> รับประกันการทำงานที่ถูกต้อง</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Third Party Cookies */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">คุกกี้จากบุคคลที่สาม</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>เราอาจใช้บริการจากบุคคลที่สามที่ตั้งคุกกี้บนเว็บไซต์ของเรา:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Google Analytics:</strong> วิเคราะห์การใช้งานเว็บไซต์</li>
                    <li><strong>Facebook Pixel:</strong> วัดประสิทธิภาพโฆษณา</li>
                    <li><strong>Payment Processors:</strong> ประมวลผลการชำระเงิน</li>
                    <li><strong>Social Media:</strong> การแชร์เนื้อหาบนโซเชียลมีเดีย</li>
                  </ul>
                  <p>
                    คุกกี้เหล่านี้อยู่ภายใต้นโยบายความเป็นส่วนตัวของบริษัทที่เกี่ยวข้อง
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-green-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">การจัดการคุกกี้</h2>
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">การควบคุมคุกกี้</h3>
                    <p className="mb-2">คุณสามารถควบคุมคุกกี้ได้หลายวิธี:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>ตั้งค่าเบราว์เซอร์เพื่อปฏิเสธคุกกี้</li>
                      <li>ลบคุกกี้ที่มีอยู่</li>
                      <li>ใช้โหมดการท่องเว็บแบบส่วนตัว</li>
                      <li>ปิดการใช้งานคุกกี้เฉพาะประเภท</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">ผลกระทบของการปิดคุกกี้</h3>
                    <p className="mb-2">หากคุณปิดคุกกี้ อาจส่งผลต่อ:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>การทำงานของเว็บไซต์อาจไม่สมบูรณ์</li>
                      <li>ไม่สามารถจดจำการตั้งค่าได้</li>
                      <li>ประสบการณ์การใช้งานอาจลดลง</li>
                      <li>ฟีเจอร์บางอย่างอาจไม่ทำงาน</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Consent */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">การยินยอมใช้คุกกี้</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    เมื่อคุณเข้าใช้เว็บไซต์ครั้งแรก เราจะขอความยินยอมในการใช้คุกกี้
                    คุณสามารถเลือกได้ว่าจะยอมรับคุกกี้ประเภทใด
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>คุกกี้ที่จำเป็น: ไม่สามารถปฏิเสธได้</li>
                    <li>คุกกี้วิเคราะห์: สามารถเลือกได้</li>
                    <li>คุกกี้การตลาด: สามารถเลือกได้</li>
                    <li>คุณสามารถเปลี่ยนการตั้งค่าได้ตลอดเวลา</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">การอัปเดตนโยบาย</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    เราอาจปรับปรุงนโยบายการใช้คุกกี้นี้เป็นครั้งคราว เพื่อให้สอดคล้องกับการเปลี่ยนแปลงของเทคโนโลยี
                    และกฎหมายที่เกี่ยวข้อง
                  </p>
                  <p>
                    การเปลี่ยนแปลงจะมีผลทันทีเมื่อเผยแพร่บนเว็บไซต์ เราแนะนำให้คุณตรวจสอบนโยบายนี้เป็นประจำ
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ติดต่อเรา</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>หากคุณมีคำถามเกี่ยวกับนโยบายการใช้คุกกี้นี้ กรุณาติดต่อเราที่:</p>
                  <div className="space-y-2">
                    <p><strong>อีเมล:</strong> cookies@bookgeek.com</p>
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
      <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(147,51,234,0.8), rgba(236,72,153,0.8), rgba(239,68,68,0.8)), url('/images/front/service_cta.avif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
        ></div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            เข้าใจคุกกี้แล้ว เริ่มใช้งานเลย
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            เราใช้คุกกี้เพื่อมอบประสบการณ์ที่ดีที่สุดให้คุณ<br />
            พร้อมที่จะเริ่มต้นการเรียนรู้กับผู้เชี่ยวชาญ
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
