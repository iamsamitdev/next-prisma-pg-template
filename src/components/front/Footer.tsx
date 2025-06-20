import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="w-full pt-20 px-4 pb-8 bg-slate-900">
      <div className="max-w-screen-2xl mx-auto">
        {/* Liquid Glass Container */}
        <div className="relative backdrop-blur-3xl bg-white/8 border border-white/20 rounded-3xl shadow-2xl shadow-black/25 p-8">
          {/* Multi-layer Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-white/10 rounded-3xl"></div>
          
          {/* Inner Glow */}
          <div className="absolute inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              
              {/* Brand Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
                    BookGeek
                  </span>
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  เราเป็นผู้เชี่ยวชาญด้านการพัฒนาเว็บไซต์ ออกแบบกราฟิก และการตลาดออนไลน์ พร้อมมอบบริการที่ดีที่สุดให้กับลูกค้า
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  <Link 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10 backdrop-blur-sm group"
                  >
                    <span className="text-white/80 group-hover:text-white text-lg">📘</span>
                  </Link>
                  <Link 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10 backdrop-blur-sm group"
                  >
                    <span className="text-white/80 group-hover:text-white text-lg">📷</span>
                  </Link>
                  <Link 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10 backdrop-blur-sm group"
                  >
                    <span className="text-white/80 group-hover:text-white text-lg">🐦</span>
                  </Link>
                  <Link 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10 backdrop-blur-sm group"
                  >
                    <span className="text-white/80 group-hover:text-white text-lg">💼</span>
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white/90">ลิงก์ด่วน</h4>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/" 
                      className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      หน้าแรก
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      เกี่ยวกับเรา
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/service" 
                      className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      บริการของเรา
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      ติดต่อเรา
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white/90">บริการของเรา</h4>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/service" 
                      className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      🌐 พัฒนาเว็บไซต์
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/graphic" 
                      className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      🎨 ออกแบบกราฟิก
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/marketing" 
                      className="text-white/70 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      📈 การตลาดออนไลน์
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white/90">ติดต่อเรา</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-white/80 text-sm">📍</span>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">123 ถนนสุขุมวิท</p>
                      <p className="text-white/70 text-sm">กรุงเทพฯ 10110</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-white/80 text-sm">📞</span>
                    </div>
                    <p className="text-white/70 text-sm">02-123-4567</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-white/80 text-sm">✉️</span>
                    </div>
                    <p className="text-white/70 text-sm">info@bookgeek.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-8"></div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © 2024 BookGeek. สงวนลิขสิทธิ์ทุกการใช้งาน
              </div>
              
              <div className="flex space-x-6">
                <Link 
                  href="/privacy-policy" 
                  className="text-white/60 hover:text-white/90 text-sm transition-all duration-300"
                >
                  นโยบายความเป็นส่วนตัว
                </Link>
                <Link 
                  href="/terms-of-service" 
                  className="text-white/60 hover:text-white/90 text-sm transition-all duration-300"
                >
                  เงื่อนไขการใช้งาน
                </Link>
                <Link 
                  href="/cookie-policy" 
                  className="text-white/60 hover:text-white/90 text-sm transition-all duration-300"
                >
                  คุกกี้
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer