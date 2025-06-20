import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "หน้าแรก",
  description: "จองคิวผู้เชี่ยวชาญและวิทยากรอบรมได้ง่ายๆ ในคลิกเดียว",
  keywords: "จองคิว, ผู้เชี่ยวชาญ, วิทยากร, อบรม, คอนซัลติ้ง, booking",
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-24">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600"
            style={{
              backgroundImage: `url('/images/front/home_hero.avif')`
            }}
          ></div>
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mt-6 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              จองผู้เชี่ยวชาญ
            </span>
            <br />
            <span className="text-white/90">ได้ง่ายๆ ในคลิกเดียว</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            เชื่อมต่อกับผู้เชี่ยวชาญและวิทยากรมืออาชีพ<br />
            เพื่อพัฒนาทักษะและความรู้ของคุณ
          </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 h-auto">
               <Link href="/service" className="inline-flex items-center justify-center">
                 เริ่มจองเลย
               </Link>
             </Button>
             
             <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-8 py-3 text-lg rounded-full backdrop-blur-md bg-white/10 h-auto">
               <Link href="/about" className="inline-flex items-center justify-center text-white">
                 เรียนรู้เพิ่มเติม
               </Link>
             </Button>
           </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/70 text-sm md:text-base">ผู้เชี่ยวชาญ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/70 text-sm md:text-base">การจองสำเร็จ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/70 text-sm md:text-base">คะแนนเฉลี่ย</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ทำไมต้องเลือก <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">BookGeek</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              เราคือแพลตฟอร์มที่เชื่อมต่อคุณกับผู้เชี่ยวชาญชั้นนำ เพื่อการเรียนรู้และพัฒนาที่มีประสิทธิภาพ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">จองได้ตรงใจ</h3>
                <p className="text-white/70 leading-relaxed">
                  ค้นหาผู้เชี่ยวชาญที่ตรงกับความต้องการของคุณ พร้อมระบบกรองที่ละเอียด
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">รวดเร็วทันใจ</h3>
                <p className="text-white/70 leading-relaxed">
                  จองและชำระเงินได้ในคลิกเดียว พร้อมการยืนยันแบบเรียลไทม์
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">ปลอดภัยมั่นใจ</h3>
                <p className="text-white/70 leading-relaxed">
                  ระบบรักษาความปลอดภัยระดับธนาคาร พร้อมการคุมครองข้อมูลส่วนตัว
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              การใช้งานง่ายๆ <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">เพียง 3 ขั้นตอน</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              เริ่มต้นการเรียนรู้กับผู้เชี่ยวชาญได้ง่ายๆ ไม่ซับซ้อน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-blue-500/25">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">เลือกผู้เชี่ยวชาญ</h3>
              <p className="text-white/70 leading-relaxed">
                ค้นหาและเลือกผู้เชี่ยวชาญที่ตรงกับความต้องการของคุณจากฐานข้อมูลที่หลากหลาย
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-green-500/25">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-green-500/50 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">จองเวลาที่สะดวก</h3>
              <p className="text-white/70 leading-relaxed">
                เลือกวันและเวลาที่เหมาะสม พร้อมชำระเงินผ่านระบบที่ปลอดภัย
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-purple-500/25">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">เริ่มเรียนรู้</h3>
              <p className="text-white/70 leading-relaxed">
                พบกับผู้เชี่ยวชาญในเวลาที่กำหนด และเริ่มต้นการเรียนรู้ที่มีคุณภาพ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              หมวดหมู่ <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">ผู้เชี่ยวชาญ</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              เลือกสาขาที่คุณสนใจและพบกับผู้เชี่ยวชาญที่เหมาะสมที่สุด
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "💻", title: "เทคโนโลยี", desc: "AI, Web Dev, Mobile" },
              { icon: "📈", title: "ธุรกิจ", desc: "Marketing, Sales, Strategy" },
              { icon: "🎨", title: "ดิจิทัล", desc: "Design, UX/UI, Branding" },
              { icon: "💰", title: "การเงิน", desc: "Investment, Trading, Crypto" },
              { icon: "🏥", title: "สุขภาพ", desc: "Fitness, Nutrition, Wellness" },
              { icon: "🎓", title: "การศึกษา", desc: "Language, Skills, Coaching" },
              { icon: "🏠", title: "ไลฟ์สไตล์", desc: "Cooking, Travel, Hobby" },
              { icon: "⚖️", title: "กฎหมาย", desc: "Legal, Tax, Compliance" }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-white/60 text-sm">{category.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(30,58,138,0.8), rgba(124,58,237,0.8), rgba(236,72,153,0.8)), url('/images/front/home_cta.avif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.6
          }}
        ></div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            เข้าร่วมกับผู้คนหลายพันคนที่เลือกใช้ BookGeek เพื่อพัฒนาตนเอง<br />
            และเติบโตไปกับผู้เชี่ยวชาญระดับโลก
          </p>
          
                     <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-xl rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 font-semibold h-auto">
               <Link href="/service" className="inline-flex items-center justify-center">
                 เริ่มจองเลย - ฟรี!
               </Link>
             </Button>
             
             <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-10 py-4 text-xl rounded-full backdrop-blur-md bg-white/10 h-auto">
               <Link href="/contact" className="inline-flex items-center justify-center text-white">
                 ติดต่อสอบถาม
               </Link>
             </Button>
           </div>

          <div className="mt-12 text-white/60">
            <p className="text-lg">🎉 สมัครสมาชิกใหม่รับส่วนลด 50% สำหรับการจองครั้งแรก</p>
          </div>
        </div>
      </section>
    </div>
  )
}
