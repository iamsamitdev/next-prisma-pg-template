import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "บริการของเรา",
  description: "ค้นพบบริการครบครันจาก BookGeek เชื่อมต่อกับผู้เชี่ยวชาญในทุกสาขา",
  keywords: "บริการ, ผู้เชี่ยวชาญ, จองคิว, คอนซัลติ้ง, อบรม, โค้ชชิ่ง",
}

export default function Service() {
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              บริการของเรา
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            ค้นพบบริการครบครันที่จะช่วยพัฒนาคุณ<br />
            ไปสู่ระดับที่คุณต้องการ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 h-auto">
              <Link href="#services" className="inline-flex items-center justify-center">
                ดูบริการทั้งหมด
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-8 py-3 text-lg rounded-full backdrop-blur-md bg-white/10 h-auto">
              <Link href="/contact" className="inline-flex items-center justify-center text-white">
                ปรึกษาฟรี
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              บริการที่เราให้
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              เลือกบริการที่ตรงกับความต้องการของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "เทคโนโลยี",
                description: "พัฒนาทักษะด้าน AI, Web Development, Mobile App และเทคโนโลยีล้ำสมัย",
                features: ["AI & Machine Learning", "Web Development", "Mobile App Development", "Cloud Computing"],
                price: "เริ่มต้น ฿1,500/ชั่วโมง",
                popular: false
              },
              {
                icon: "📈",
                title: "ธุรกิจ",
                description: "เรียนรู้กลยุทธ์ทางธุรกิจ การตลาด และการบริหารจัดการ",
                features: ["Business Strategy", "Digital Marketing", "Sales & Negotiation", "Leadership"],
                price: "เริ่มต้น ฿2,000/ชั่วโมง",
                popular: true
              },
              {
                icon: "🎨",
                title: "ดิจิทัล",
                description: "ออกแบบ UX/UI, กราฟิก และสร้างแบรนด์ที่โดดเด่น",
                features: ["UX/UI Design", "Graphic Design", "Branding", "Digital Art"],
                price: "เริ่มต้น ฿1,800/ชั่วโมง",
                popular: false
              },
              {
                icon: "💰",
                title: "การเงิน",
                description: "เรียนรู้การลงทุน การเทรด และการวางแผนทางการเงิน",
                features: ["Investment Planning", "Stock Trading", "Cryptocurrency", "Financial Planning"],
                price: "เริ่มต้น ฿2,500/ชั่วโมง",
                popular: false
              },
              {
                icon: "🏥",
                title: "สุขภาพ",
                description: "พัฒนาสุขภาพกาย ใจ และไลฟ์สไตล์ที่ดี",
                features: ["Fitness Training", "Nutrition Planning", "Mental Health", "Wellness Coaching"],
                price: "เริ่มต้น ฿1,200/ชั่วโมง",
                popular: false
              },
              {
                icon: "🎓",
                title: "การศึกษา",
                description: "เรียนภาษา พัฒนาทักษะ และโค้ชชิ่งส่วนตัว",
                features: ["Language Learning", "Academic Tutoring", "Life Coaching", "Skill Development"],
                price: "เริ่มต้น ฿1,000/ชั่วโมง",
                popular: false
              }
            ].map((service, index) => (
              <div key={index} className={`relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group ${service.popular ? 'ring-2 ring-purple-500/50' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      ยอดนิยม
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center">
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6 text-left">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-white/60 text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-4">{service.price}</div>
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full h-auto">
                      <Link href="/contact" className="inline-flex items-center justify-center py-3">
                        จองเลย
                      </Link>
                    </Button>
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
            backgroundImage: `linear-gradient(rgba(30,58,138,0.8), rgba(124,58,237,0.8), rgba(236,72,153,0.8)), url('/images/front/service_cta.avif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
        ></div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            เริ่มต้นวันนี้
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            ไม่ต้องรอ เริ่มพัฒนาตัวเองกับผู้เชี่ยวชาญที่ดีที่สุด<br />
            และก้าวไปสู่เป้าหมายที่คุณต้องการ
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-xl rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 font-semibold h-auto">
              <Link href="/contact" className="inline-flex items-center justify-center">
                เริ่มจองเลย
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-10 py-4 text-xl rounded-full backdrop-blur-md bg-white/10 h-auto">
              <Link href="/about" className="inline-flex items-center justify-center text-white">
                เรียนรู้เพิ่มเติม
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-white/60">
            <p className="text-lg">🎁 จองภายในสัปดาห์นี้ รับส่วนลดพิเศษ 30%</p>
          </div>
        </div>
      </section>
    </div>
  )
}
