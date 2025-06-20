import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "ทำความรู้จักกับ BookGeek แพลตฟอร์มที่เชื่อมต่อคุณกับผู้เชี่ยวชาญชั้นนำ",
  keywords: "เกี่ยวกับเรา, BookGeek, ผู้เชี่ยวชาญ, จองคิว, ทีมงาน",
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden -mt-24">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600"
            style={{
              backgroundImage: `url('/images/front/about_hero.avif')`
            }}
          ></div>
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-6 leading-tight">
            เกี่ยวกับ <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">BookGeek</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            เราคือสะพานเชื่อมระหว่างคุณกับผู้เชี่ยวชาญ<br />
            เพื่อการเรียนรู้และพัฒนาที่ไม่มีขีดจำกัด
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                เรื่องราวของเรา
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p className="text-lg">
                  BookGeek เกิดขึ้นจากความเชื่อที่ว่า <span className="text-blue-400 font-semibold">ทุกคนควรมีโอกาสเข้าถึงความรู้จากผู้เชี่ยวชาญ</span> ไม่ว่าจะอยู่ที่ไหนในโลก
                </p>
                <p className="text-lg">
                  ด้วยประสบการณ์กว่า <span className="text-purple-400 font-semibold">10 ปีในวงการเทคโนโลยี</span> ทีมผู้ก่อตั้งของเราเห็นถึงความต้องการของผู้คนที่ต้องการพัฒนาตนเอง แต่ไม่รู้ว่าจะเริ่มต้นอย่างไร
                </p>
                <p className="text-lg">
                  เราจึงสร้าง BookGeek ขึ้นมาเพื่อเป็น <span className="text-pink-400 font-semibold">แพลตฟอร์มที่เชื่อมต่อผู้เรียนรู้กับผู้เชี่ยวชาญ</span> ในทุกสาขาวิชา
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
                <div className="relative">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">2019</div>
                      <div className="text-white/70 text-sm">ปีที่ก่อตั้ง</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">500+</div>
                      <div className="text-white/70 text-sm">ผู้เชี่ยวชาญ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">10K+</div>
                      <div className="text-white/70 text-sm">ผู้ใช้งาน</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">50+</div>
                      <div className="text-white/70 text-sm">ประเทศ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ค่านิยมของเรา
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              หลักการที่ขับเคลื่อนการทำงานของเราทุกวัน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">คุณภาพเป็นหลัก</h3>
                <p className="text-white/70 leading-relaxed">
                  เราคัดสรรผู้เชี่ยวชาญที่มีคุณภาพและประสบการณ์จริง เพื่อให้คุณได้รับความรู้ที่มีคุณค่า
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">ความไว้วางใจ</h3>
                <p className="text-white/70 leading-relaxed">
                  เราสร้างสภาพแวดล้อมที่ปลอดภัยและน่าเชื่อถือ เพื่อให้ทุกคนมั่นใจในการเรียนรู้
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">นวัตกรรม</h3>
                <p className="text-white/70 leading-relaxed">
                  เราพัฒนาเทคโนโลยีและวิธีการใหม่ๆ เพื่อทำให้การเรียนรู้เป็นเรื่องง่ายและสนุก
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ทีมงานของเรา
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              บุคคลที่อยู่เบื้องหลังความสำเร็จของ BookGeek
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "สมชาย ใจดี",
                position: "CEO & Co-Founder",
                image: "/images/front/about_team_somchai.avif",
                description: "ผู้ริเริ่มแนวคิด BookGeek ด้วยประสบการณ์ 15 ปีในวงการเทคโนโลยี"
              },
              {
                name: "สมหญิง รักเรียน",
                position: "CTO & Co-Founder",
                image: "/images/front/about_team_somying.avif",
                description: "ผู้เชี่ยวชาญด้านเทคโนโลยี นำทีมพัฒนาแพลตฟอร์มที่ทันสมัย"
              },
              {
                name: "สมศักดิ์ ใฝ่รู้",
                position: "Head of Product",
                image: "/images/front/about_team_somsak.avif",
                description: "ผู้ออกแบบประสบการณ์ผู้ใช้ให้ใช้งานง่ายและสะดวก"
              },
              {
                name: "สมใจ ช่วยเหลือ",
                position: "Head of Customer Success",
                image: "/images/front/about_team_somjai.avif",
                description: "ดูแลความพึงพอใจของลูกค้าและสร้างความสัมพันธ์ที่ยั่งยืน"
              }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/20">
                      <div 
                        className="w-full h-full bg-cover bg-center bg-gradient-to-br from-slate-600 to-slate-700"
                        style={{
                          backgroundImage: `url('${member.image}')`
                        }}
                      ></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-400 font-semibold mb-3">{member.position}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(30,58,138,0.8), rgba(124,58,237,0.8), rgba(236,72,153,0.8)), url('/images/front/about_mission.avif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
        ></div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            พันธกิจของเรา
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            "เราต้องการสร้างโลกที่ทุกคนสามารถเข้าถึงความรู้และทักษะได้อย่างเท่าเทียม 
            โดยการเชื่อมต่อผู้เรียนรู้กับผู้เชี่ยวชาญที่ดีที่สุดจากทั่วโลก"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-xl rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 font-semibold h-auto">
              <Link href="/service" className="inline-flex items-center justify-center">
                เริ่มเรียนรู้กับเรา
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 px-10 py-4 text-xl rounded-full backdrop-blur-md bg-white/10 h-auto">
              <Link href="/contact" className="inline-flex items-center justify-center text-white">
                ติดต่อเรา
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
