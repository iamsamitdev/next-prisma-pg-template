import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "เงื่อนไขการใช้งาน",
  description: "เงื่อนไขการใช้งานบริการ BookGeek สำหรับการจองผู้เชี่ยวชาญและวิทยากร",
  keywords: "เงื่อนไขการใช้งาน, BookGeek, ข้อกำหนด, บริการ",
}

export default function TermsOfService() {
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
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              เงื่อนไขการใช้งาน
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            ข้อกำหนดและเงื่อนไขในการใช้บริการ BookGeek<br />
            โปรดอ่านอย่างละเอียดก่อนใช้งาน
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 text-lg rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 h-auto">
              <Link href="#terms-content" className="inline-flex items-center justify-center">
                อ่านเงื่อนไข
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

      {/* Terms Content Section */}
      <section id="terms-content" className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            
            {/* Introduction */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ข้อมูลทั่วไป</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    เงื่อนไขการใช้งานนี้ใช้บังคับกับการใช้บริการ BookGeek ซึ่งเป็นแพลตฟอร์มจองผู้เชี่ยวชาญและวิทยากร
                    โดยการใช้บริการของเรา คุณตกลงที่จะปฏิบัติตามเงื่อนไขเหล่านี้
                  </p>
                  <p>
                    เราขอสงวนสิทธิ์ในการแก้ไขเงื่อนไขการใช้งานนี้ได้ตลอดเวลา โดยจะแจ้งให้ทราบล่วงหน้าผ่านเว็บไซต์
                  </p>
                </div>
              </div>
            </div>

            {/* Account Terms */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-pink-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">การสมัครสมาชิกและบัญชีผู้ใช้</h2>
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">ข้อกำหนดการสมัคร</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>ต้องมีอายุ 18 ปีขึ้นไป หรือได้รับอนุญาตจากผู้ปกครอง</li>
                      <li>ต้องให้ข้อมูลที่ถูกต้องและครบถ้วน</li>
                      <li>ต้องรักษาความปลอดภัยของรหัสผ่าน</li>
                      <li>รับผิดชอบการใช้งานในบัญชีของตนเอง</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">การยกเลิกบัญชี</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>สามารถยกเลิกบัญชีได้ตลอดเวลา</li>
                      <li>ต้องชำระค่าบริการที่ค้างชำระก่อนยกเลิก</li>
                      <li>ข้อมูลจะถูกลบตามนโยบายความเป็นส่วนตัว</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Terms */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">การใช้บริการ</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>การใช้บริการต้องปฏิบัติตามกฎเกณฑ์ดังนี้:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>ใช้บริการเพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมายเท่านั้น</li>
                    <li>ไม่ใช้บริการเพื่อกิจกรรมที่ผิดกฎหมายหรือไม่เหมาะสม</li>
                    <li>เคารพสิทธิของผู้เชี่ยวชาญและผู้ใช้อื่น</li>
                    <li>ไม่ส่งข้อมูลที่เป็นอันตรายหรือไม่เหมาะสม</li>
                    <li>ปฏิบัติตามข้อกำหนดการจองและการชำระเงิน</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Booking Terms */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">เงื่อนไขการจอง</h2>
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">การจองและการชำระเงิน</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>ต้องชำระเงินเต็มจำนวนเพื่อยืนยันการจอง</li>
                      <li>การจองจะสมบูรณ์เมื่อได้รับการยืนยันจากระบบ</li>
                      <li>ราคาบริการอาจเปลี่ยนแปลงตามความเหมาะสม</li>
                      <li>ค่าธรรมเนียมเพิ่มเติมอาจมีตามลักษณะบริการ</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">การยกเลิกและการคืนเงิน</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>ยกเลิกได้ก่อนกำหนด 24 ชั่วโมง - คืนเงิน 100%</li>
                      <li>ยกเลิกก่อนกำหนด 12 ชั่วโมง - คืนเงิน 50%</li>
                      <li>ยกเลิกน้อยกว่า 12 ชั่วโมง - ไม่คืนเงิน</li>
                      <li>กรณีผู้เชี่ยวชาญยกเลิก - คืนเงิน 100%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ทรัพย์สินทางปัญญา</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>เนื้อหาและทรัพย์สินทางปัญญาในเว็บไซต์:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>เป็นลิขสิทธิ์ของ BookGeek หรือผู้ที่ได้รับอนุญาต</li>
                    <li>ห้ามคัดลอก ดัดแปลง หรือใช้เพื่อการค้าโดยไม่ได้รับอนุญาต</li>
                    <li>สามารถใช้เพื่อการศึกษาส่วนบุคคลได้</li>
                    <li>ต้องระบุแหล่งที่มาเมื่อใช้งาน</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-green-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ข้อจำกัดความรับผิดชอบ</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>BookGeek จะไม่รับผิดชอบต่อ:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>ความเสียหายที่เกิดจากการใช้บริการ</li>
                    <li>ข้อมูลที่สูญหายหรือไม่ถูกต้อง</li>
                    <li>การหยุดชะงักของบริการ</li>
                    <li>การกระทำของผู้เชี่ยวชาญภายนอก</li>
                    <li>ความเสียหายทางอ้อมหรือผลตามมา</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-orange-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">กฎหมายที่ใช้บังคับ</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>เงื่อนไขการใช้งานนี้:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>อยู่ภายใต้กฎหมายไทย</li>
                    <li>ข้อพิพาทจะได้รับการพิจารณาโดยศาลไทย</li>
                    <li>ใช้ภาษาไทยเป็นหลักในการตีความ</li>
                    <li>หากมีข้อความขัดแย้ง ให้ใช้ฉบับภาษาไทย</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 rounded-3xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-6">ติดต่อเรา</h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>หากคุณมีคำถามเกี่ยวกับเงื่อนไขการใช้งานนี้ กรุณาติดต่อเราที่:</p>
                  <div className="space-y-2">
                    <p><strong>อีเมล:</strong> legal@bookgeek.com</p>
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
      <section className="py-20 bg-gradient-to-r from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(251,146,60,0.8), rgba(239,68,68,0.8), rgba(236,72,153,0.8)), url('/images/front/service_cta.avif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
        ></div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            เริ่มใช้บริการได้เลย
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            เมื่อคุณเข้าใจเงื่อนไขการใช้งานแล้ว<br />
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
