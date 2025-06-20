import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อทีมงาน BookGeek เพื่อปรึกษาและสอบถามข้อมูลเกี่ยวกับบริการของเรา",
  keywords: "ติดต่อเรา, BookGeek, สอบถาม, ปรึกษา, สนับสนุน, ช่วยเหลือ",
}

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden -mt-24">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600"
            style={{
              backgroundImage: `url('/images/front/contact_hero.avif')`
            }}
          ></div>
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              ติดต่อเรา
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            พร้อมให้คำปรึกษาและตอบทุกคำถาม<br />
            เพื่อช่วยให้คุณเริ่มต้นได้อย่างมั่นใจ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 h-auto">
              <Link href="#contact-form" className="inline-flex items-center justify-center">
                ส่งข้อความหาเรา
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-8 py-3 text-lg rounded-full backdrop-blur-md bg-white/10 h-auto">
              <Link href="tel:+66-2-123-4567" className="inline-flex items-center justify-center text-white">
                โทรเลย
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ช่องทางติดต่อ
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              เลือกช่องทางที่สะดวกสำหรับคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📍",
                title: "ที่อยู่",
                content: ["123 ถนนสุขุมวิท", "แขวงคลองเตย", "กรุงเทพฯ 10110"],
                action: "ดูแผนที่",
                link: "#map"
              },
              {
                icon: "📞",
                title: "โทรศัพท์",
                content: ["02-123-4567", "080-123-4567", "จันทร์-ศุกร์ 9:00-18:00"],
                action: "โทรเลย",
                link: "tel:+66-2-123-4567"
              },
              {
                icon: "✉️",
                title: "อีเมล",
                content: ["info@bookgeek.com", "support@bookgeek.com", "ตอบกลับภายใน 24 ชม."],
                action: "ส่งอีเมล",
                link: "mailto:info@bookgeek.com"
              },
              {
                icon: "💬",
                title: "แชทสด",
                content: ["พูดคุยกับทีมงาน", "ตอบคำถามทันที", "เปิด 24/7"],
                action: "เริ่มแชท",
                link: "#chat"
              }
            ].map((contact, index) => (
              <div key={index} className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{contact.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{contact.title}</h3>
                  <div className="space-y-2 mb-6">
                    {contact.content.map((line, idx) => (
                      <p key={idx} className="text-white/70 text-sm">{line}</p>
                    ))}
                  </div>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full h-auto">
                    <Link href={contact.link} className="inline-flex items-center justify-center py-3">
                      {contact.action}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Form */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold text-white mb-8">ส่งข้อความหาเรา</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">ชื่อ</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="ชื่อของคุณ"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">นามสกุล</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="นามสกุลของคุณ"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">อีเมล</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">เบอร์โทรศัพท์</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="08x-xxx-xxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">หัวข้อ</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm [&>option]:bg-slate-800 [&>option]:text-white">
                      <option value="">เลือกหัวข้อ</option>
                      <option value="general">สอบถามทั่วไป</option>
                      <option value="service">สอบถามบริการ</option>
                      <option value="booking">จองผู้เชี่ยวชาญ</option>
                      <option value="support">ขอความช่วยเหลือ</option>
                      <option value="partnership">ความร่วมมือ</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">ข้อความ</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                      placeholder="เขียนข้อความของคุณที่นี่..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 h-auto">
                    ส่งข้อความ
                  </Button>
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">พร้อมช่วยเหลือคุณ</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  ทีมงานของเราพร้อมให้คำปรึกษาและตอบทุกคำถามเกี่ยวกับบริการ BookGeek 
                  ไม่ว่าจะเป็นการเลือกผู้เชี่ยวชาญ การจองเวลา หรือข้อสงสัยอื่นๆ
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: "🚀",
                    title: "ตอบกลับเร็ว",
                    description: "เราตอบทุกข้อความภายใน 2 ชั่วโมงในเวลาทำการ"
                  },
                  {
                    icon: "🎯",
                    title: "คำปรึกษาฟรี",
                    description: "ปรึกษาการเลือกผู้เชี่ยวชาญและวางแผนการเรียนรู้ฟรี"
                  },
                  {
                    icon: "🤝",
                    title: "สนับสนุนตลอด",
                    description: "ทีมงานพร้อมช่วยเหลือตั้งแต่เริ่มต้นจนสำเร็จ"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
                <div className="relative">
                  <h4 className="text-lg font-semibold text-white mb-3">💡 เคล็ดลับ</h4>
                  <p className="text-white/70 text-sm">
                    หากคุณยังไม่แน่ใจว่าจะเลือกผู้เชี่ยวชาญคนไหน เราแนะนำให้ระบุเป้าหมายและความต้องการในข้อความ 
                    ทีมงานจะช่วยแนะนำผู้เชี่ยวชาญที่เหมาะสมที่สุดให้คุณ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              คำตอบสำหรับคำถามที่ลูกค้าถามบ่อยที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "วิธีการจองผู้เชี่ยวชาญทำอย่างไร?",
                answer: "เลือกหมวดหมู่บริการ → เลือกผู้เชี่ยวชาญ → เลือกวันเวลา → ชำระเงิน → เริ่มเรียนรู้"
              },
              {
                question: "สามารถยกเลิกหรือเปลี่ยนแปลงการจองได้หรือไม่?",
                answer: "สามารถยกเลิกหรือเปลี่ยนแปลงได้ก่อนเวลานัดหมาย 24 ชั่วโมง โดยไม่มีค่าธรรมเนียม"
              },
              {
                question: "ราคาบริการเป็นอย่างไร?",
                answer: "ราคาขึ้นอยู่กับผู้เชี่ยวชาญและประเภทบริการ เริ่มต้นที่ 1,000 บาท/ชั่วโมง"
              },
              {
                question: "มีการรับประกันคุณภาพหรือไม่?",
                answer: "เรามีนโยบายคืนเงิน 100% หากไม่พอใจในเซสชั่นแรก และมีระบบรีวิวจากผู้ใช้จริง"
              },
              {
                question: "สามารถเรียนออนไลน์ได้หรือไม่?",
                answer: "ได้ครับ เรามีทั้งแบบออนไลน์และออฟไลน์ ผ่านแพลตฟอร์มวิดีโอคอลคุณภาพสูง"
              },
              {
                question: "มีบริการหลังการขายหรือไม่?",
                answer: "มีครับ ทีมงานพร้อมให้คำปรึกษาและติดตามผลการเรียนรู้ของคุณตลอดเวลา"
              }
            ].map((faq, index) => (
              <div key={index} className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/70 mb-6">ยังมีคำถามอื่นๆ อีกหรือไม่?</p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 h-auto">
              <Link href="#contact-form" className="inline-flex items-center justify-center">
                ถามคำถามเพิ่มเติม
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(30,58,138,0.8), rgba(124,58,237,0.8), rgba(236,72,153,0.8)), url('/images/front/contact_cta.avif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
        ></div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            พร้อมเริ่มต้นแล้วใช่ไหม?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            อย่ารอช้า เริ่มต้นการเรียนรู้กับผู้เชี่ยวชาญ<br />
            และเปลี่ยนแปลงชีวิตของคุณให้ดีขึ้น
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-xl rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 font-semibold h-auto">
              <Link href="/service" className="inline-flex items-center justify-center">
                เลือกบริการ
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-10 py-4 text-xl rounded-full backdrop-blur-md bg-white/10 h-auto">
              <Link href="/about" className="inline-flex items-center justify-center text-white">
                เรียนรู้เพิ่มเติม
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
