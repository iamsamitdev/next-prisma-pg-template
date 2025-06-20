"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

// สร้าง component สำหรับการสร้าง Navbar
function Navbar() {

  const { user, logout, isLoading } = useAuth() // เรียกใช้งาน hook สำหรับการจัดการการยืนยันตัวตน
  const pathname = usePathname() // เรียกใช้ usePathname สำหรับกำหนดเส้นทางของหน้านั้นๆ
  const router = useRouter() // เรียกใช้ useRouter สำหรับกำหนดเส้นทางของหน้านั้นๆ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // สร้างฟังก์ชันสำหรับการสลับการเปิดปิดหน้าต่างของระบบ
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false) // สร้างฟังก์ชันสำหรับการสลับการเปิดปิดหน้าต่างของระบบ
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false) // สร้างฟังก์ชันสำหรับการสลับการเปิดปิดหน้าต่างของระบบ
  const profileMenuRef = useRef<HTMLDivElement>(null) // สร้างฟังก์ชันสำหรับการสลับการเปิดปิดหน้าต่างของระบบ

  // สร้างฟังก์ชันสำหรับการตรวจสอบว่าหน้านั้นๆ ถูกเลือกหรือไม่
  const isActive = (path: string) => {
    return pathname === path
  }

  // สร้างฟังก์ชันสำหรับการตรวจสอบว่าหน้านั้นๆ ถูกเลือกหรือไม่
  const isServiceActive = () => {
    return pathname === '/service' || pathname === '/graphic' || pathname === '/marketing'
  }

  // สร้างฟังก์ชันสำหรับการสลับการเปิดปิดหน้าต่างของระบบ
  const toggleMobileMenu = () => {
    console.log('toggleMobileMenu called, current state:', isMobileMenuOpen)
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // สร้างฟังก์ชันสำหรับการสลับการเปิดปิดหน้าต่างของระบบ
  const toggleServiceMenu = () => {
    setIsServiceMenuOpen(!isServiceMenuOpen)
  }

  // สร้างฟังก์ชันสำหรับการปิดหน้าต่างของระบบ
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsServiceMenuOpen(false)
  }

  // สร้างฟังก์ชันสำหรับการสลับการเปิดปิดหน้าต่างของระบบ
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  // สร้างฟังก์ชันสำหรับการออกจากระบบ
  const handleLogout = async () => {
    try {
      await logout()
      setIsProfileMenuOpen(false)
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // สร้างฟังก์ชันสำหรับการปิดหน้าต่างของระบบ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // สร้างฟังก์ชันสำหรับการสร้าง Navbar
  return (
    <nav className='w-full fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4'>
      <div className="max-w-screen-2xl mx-auto">
        {/* Liquid Glass Container */}
        <div className="relative backdrop-blur-3xl bg-white/8 border border-white/20 rounded-full shadow-2xl shadow-black/25 px-8 py-4">
          {/* Multi-layer Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-full"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-white/10 rounded-full"></div>
          
          {/* Inner Glow */}
          <div className="absolute inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-full"></div>
          
          {/* Content */}
          <div className="relative flex items-center justify-between h-12">
            {/* Brand Name - ทางซ้าย */}
            <div className="flex items-center gap-3 group">
              <Link href="/" className="text-white font-bold text-xl tracking-wide hover:scale-110 transition-all duration-300">
                <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent hover:from-white hover:to-white/80 transition-all duration-300 drop-shadow-lg">
                  BookGeek
                </span>
              </Link>
            </div>

            {/* Navigation Menu - ตรงกลาง (Desktop) */}
            <div className="hidden lg:flex">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-3">
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/" 
                        className={cn(
                          "relative px-8 text-white/85 hover:text-white transition-all duration-300 text-sm font-medium overflow-hidden group min-w-[100px] text-center h-12 flex items-center justify-center",
                          "!rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/10 hover:scale-105",
                          "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                          "hover:before:translate-x-[100%]",
                          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0",
                          isActive('/') && "!rounded-full bg-white/15 border border-white/25 shadow-lg shadow-white/10 scale-105 text-white font-semibold backdrop-blur-sm"
                        )}
                      >
                        <span className="relative z-10 drop-shadow-sm">หน้าแรก</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/about" 
                        className={cn(
                          "relative px-8 text-white/85 hover:text-white transition-all duration-300 text-sm font-medium overflow-hidden group min-w-[120px] text-center h-12 flex items-center justify-center",
                          "!rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/10 hover:scale-105",
                          "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                          "hover:before:translate-x-[100%]",
                          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0",
                          isActive('/about') && "!rounded-full bg-white/15 border border-white/25 shadow-lg shadow-white/10 scale-105 text-white font-semibold backdrop-blur-sm"
                        )}
                      >
                        <span className="relative z-10 drop-shadow-sm">เกี่ยวกับเรา</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="relative">
                    <NavigationMenuTrigger className={cn(
                      "relative px-8 text-white/85 hover:text-white transition-all duration-300 text-sm font-medium overflow-hidden group min-w-[120px] text-center h-12 flex items-center justify-center",
                      "!rounded-full !hover:bg-white/15 !hover:backdrop-blur-sm !hover:shadow-lg !hover:shadow-white/10 !hover:scale-105",
                      "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                      "hover:before:translate-x-[100%]",
                      "data-[state=open]:!rounded-full data-[state=open]:!bg-white/15 data-[state=open]:!border data-[state=open]:!border-white/25 data-[state=open]:!shadow-lg data-[state=open]:!shadow-white/10 data-[state=open]:!scale-105 data-[state=open]:!text-white data-[state=open]:!font-semibold data-[state=open]:!backdrop-blur-sm",
                      "data-[state=closed]:!text-white/85 data-[state=closed]:!bg-transparent data-[state=closed]:!border-0 data-[state=closed]:!shadow-none data-[state=closed]:!scale-100 data-[state=closed]:!font-medium",
                      "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0",
                      "!bg-transparent !border-0 !shadow-none",
                      isServiceActive() && "!rounded-full !bg-white/15 !border !border-white/25 !shadow-lg !shadow-white/10 !scale-105 !text-white !font-semibold !backdrop-blur-sm"
                    )}>
                      <span className="relative z-10 drop-shadow-sm">บริการของเรา</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute top-full left-1/2 transform -translate-x-1/2 !mt-6 z-50 !bg-transparent !border-0 !shadow-none !p-0">
                      {/* Enhanced Glass Dropdown */}
                      <div className="relative backdrop-blur-3xl bg-slate-800/80 border border-white/25 rounded-3xl shadow-2xl shadow-black/50 p-6 w-[280px]">
                        {/* Multi-layer Glass Effect with Dark Base */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/60 via-slate-800/80 to-slate-900/90 rounded-3xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-slate-800/40 to-slate-700/30 rounded-3xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-bl from-slate-900/50 via-slate-800/30 to-black/40 rounded-3xl"></div>
                        
                        {/* White Glass Overlay */}
                        <div className="absolute inset-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent rounded-3xl"></div>
                        <div className="absolute inset-[2px] bg-gradient-to-t from-transparent to-white/10 rounded-3xl"></div>
                        
                        {/* Subtle Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent rounded-3xl animate-pulse"></div>
                        
                        <ul className="relative grid gap-3">
                          <li>
                            <Link 
                              href="/service" 
                              className={cn(
                                "block px-6 py-4 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group",
                                "rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15 hover:scale-[1.02] hover:border hover:border-white/25",
                                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                                "hover:before:translate-x-[100%]",
                                "focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0",
                                isActive('/service') && "bg-white/15 border border-white/25 shadow-lg shadow-white/15 scale-[1.02] text-white font-semibold backdrop-blur-sm"
                              )}
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">💻</span>
                                <span>เทคโนโลยี</span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/service#business" 
                              className={cn(
                                "block px-6 py-4 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group",
                                "rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15 hover:scale-[1.02] hover:border hover:border-white/25",
                                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                                "hover:before:translate-x-[100%]",
                                "focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
                              )}
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">📈</span>
                                <span>ธุรกิจ</span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/service#design" 
                              className={cn(
                                "block px-6 py-4 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group",
                                "rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15 hover:scale-[1.02] hover:border hover:border-white/25",
                                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                                "hover:before:translate-x-[100%]",
                                "focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
                              )}
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">🎨</span>
                                <span>ดิจิทัล</span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/service#finance" 
                              className={cn(
                                "block px-6 py-4 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group",
                                "rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15 hover:scale-[1.02] hover:border hover:border-white/25",
                                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                                "hover:before:translate-x-[100%]",
                                "focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
                              )}
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">💰</span>
                                <span>การเงิน</span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/service#health" 
                              className={cn(
                                "block px-6 py-4 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group",
                                "rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15 hover:scale-[1.02] hover:border hover:border-white/25",
                                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                                "hover:before:translate-x-[100%]",
                                "focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
                              )}
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">🏥</span>
                                <span>สุขภาพ</span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/service#education" 
                              className={cn(
                                "block px-6 py-4 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group",
                                "rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15 hover:scale-[1.02] hover:border hover:border-white/25",
                                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                                "hover:before:translate-x-[100%]",
                                "focus-visible:outline-none focus-visible:ring-0 focus:outline-none focus:ring-0"
                              )}
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">🎓</span>
                                <span>การศึกษา</span>
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/contact" 
                        className={cn(
                          "relative px-8 text-white/85 hover:text-white transition-all duration-300 text-sm font-medium overflow-hidden group min-w-[100px] text-center h-12 flex items-center justify-center",
                          "!rounded-full hover:bg-white/15 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/10 hover:scale-105",
                          "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700",
                          "hover:before:translate-x-[100%]",
                          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0",
                          isActive('/contact') && "!rounded-full bg-white/15 border border-white/25 shadow-lg shadow-white/10 scale-105 text-white font-semibold backdrop-blur-sm"
                        )}
                      >
                        <span className="relative z-10 drop-shadow-sm">ติดต่อเรา</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoading ? (
                <div className="relative overflow-hidden !rounded-full bg-white/15 border border-white/25 shadow-lg backdrop-blur-sm !h-12 !px-8 !py-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
                             ) : user ? (
                 <div className="relative" ref={profileMenuRef}>
                   <button
                    onClick={toggleProfileMenu}
                    className="relative overflow-hidden !rounded-full bg-white/15 hover:bg-white/20 border border-white/25 hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-white/10 hover:scale-105 transition-all duration-300 group backdrop-blur-sm !h-12 !px-4 !py-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 flex items-center gap-3"
                  >
                    {/* Profile Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    
                    {/* User Name */}
                    <span className="relative z-10 font-medium text-white/90 hover:text-white drop-shadow-sm max-w-[120px] truncate">
                      {user.fullName.split(' ')[0]}
                    </span>
                    
                    {/* Dropdown Arrow */}
                    <svg 
                      className={cn("w-4 h-4 text-white/70 transition-transform duration-200", isProfileMenuOpen && "rotate-180")} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute top-full right-0 !mt-6 z-50">
                      <div className="relative backdrop-blur-3xl bg-slate-800/80 border border-white/25 rounded-3xl shadow-2xl shadow-black/50 p-4 w-[240px]">
                        {/* Multi-layer Glass Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/60 via-slate-800/80 to-slate-900/90 rounded-3xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-slate-800/40 to-slate-700/30 rounded-3xl"></div>
                        <div className="absolute inset-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent rounded-3xl"></div>
                        
                        <div className="relative space-y-2">
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                {user.fullName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">{user.fullName}</p>
                                <p className="text-white/60 text-xs truncate max-w-[140px]">{user.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="space-y-1">
                            <Link
                              href="/admin/dashboard"
                              onClick={() => setIsProfileMenuOpen(false)}
                              className="block px-4 py-3 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15"
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">📊</span>
                                <span>แดชบอร์ด</span>
                              </span>
                            </Link>

                            <Link
                              href="/profile"
                              onClick={() => setIsProfileMenuOpen(false)}
                              className="block px-4 py-3 text-white/90 hover:text-white transition-all duration-300 text-sm relative overflow-hidden group rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/15"
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">👤</span>
                                <span>โปรไฟล์</span>
                              </span>
                            </Link>

                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-3 text-red-300 hover:text-red-200 transition-all duration-300 text-sm relative overflow-hidden group rounded-xl hover:bg-red-500/20 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/15"
                            >
                              <span className="relative z-10 drop-shadow-sm flex items-center gap-3">
                                <span className="text-lg">🚪</span>
                                <span>ออกจากระบบ</span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button asChild className="relative overflow-hidden !rounded-full bg-white/15 hover:bg-white/20 border border-white/25 hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-white/10 hover:scale-110 transition-all duration-300 group backdrop-blur-sm !h-12 !px-8 !py-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0">
                  <Link href="/auth/login" className="relative z-10 font-medium text-white/90 hover:text-white flex items-center justify-center !h-12 !px-8 !py-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0">
                    <span className="relative drop-shadow-sm">
                      เข้าสู่ระบบ
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </span>
                  </Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="relative p-3 rounded-full bg-white/15 hover:bg-white/20 border border-white/25 hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-sm focus:outline-none"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={cn(
                    "block w-5 h-0.5 bg-white/90 transition-all duration-300",
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : "mb-1"
                  )}></span>
                  <span className={cn(
                    "block w-5 h-0.5 bg-white/90 transition-all duration-300",
                    isMobileMenuOpen ? "opacity-0" : "mb-1"
                  )}></span>
                  <span className={cn(
                    "block w-5 h-0.5 bg-white/90 transition-all duration-300",
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  )}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Screen */}
        {isMobileMenuOpen && (
          <div className="fixed left-0 right-0 top-0 bottom-0 z-[9999] bg-gray-50 flex flex-col h-screen w-screen !m-0 !p-0" style={{ position: 'fixed', inset: '0', margin: '0', padding: '0', borderRadius: '0' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 pt-safe-or-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex-shrink-0" style={{ paddingTop: 'max(env(safe-area-inset-top), 1.5rem)' }}>
              <Link href="/" onClick={closeMobileMenu} className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BookGeek
                </span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 !bg-transparent">
              {/* หน้าแรก */}
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  isActive('/')
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="text-xl">🏠</span>
                <span>หน้าแรก</span>
              </Link>

              {/* เกี่ยวกับเรา */}
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  isActive('/about')
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="text-xl">ℹ️</span>
                <span>เกี่ยวกับเรา</span>
              </Link>

              {/* บริการ */}
              <div className="space-y-2">
                <button
                  onClick={toggleServiceMenu}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 p-4 rounded-xl transition-all duration-300",
                    (isServiceActive() || isServiceMenuOpen)
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl">💼</span>
                    <span>บริการ</span>
                  </div>
                  <svg className={cn("w-5 h-5 transition-transform", isServiceMenuOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServiceMenuOpen && (
                  <div className="pl-8 space-y-2">
                    {[
                      { href: "/service", icon: "💻", label: "เทคโนโลยี" },
                      { href: "/service#business", icon: "📈", label: "ธุรกิจ" },
                      { href: "/service#design", icon: "🎨", label: "ดิจิทัล" },
                      { href: "/service#finance", icon: "💰", label: "การเงิน" },
                      { href: "/service#health", icon: "🏥", label: "สุขภาพ" },
                      { href: "/service#education", icon: "🎓", label: "การศึกษา" }
                    ].map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                          pathname === item.href
                            ? "bg-green-100 text-green-800 font-semibold border-l-4 border-green-500"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        )}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ติดต่อเรา */}
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  isActive('/contact')
                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="text-xl">📞</span>
                <span>ติดต่อเรา</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu - Outside Nav Container */}
      {isMobileMenuOpen && (
        <div 
          className="z-[9999] bg-gray-50 flex flex-col fixed top-[-20px] inset-0 w-screen h-screen m-0 p-0 rounded-none border-none outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex-shrink-0" style={{ paddingTop: 'max(env(safe-area-inset-top), 1.5rem)' }}>
            <Link href="/" onClick={closeMobileMenu} className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                BookGeek
              </span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 !bg-transparent">

            {/* Footer Auth Section */}
            <div className="p-0 bg-white/80 backdrop-blur-sm flex-shrink-0">
              {user ? (
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-semibold text-lg truncate">{user.fullName}</p>
                      <p className="text-gray-500 text-sm truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    <Link
                      href="/admin/dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-4 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-300"
                    >
                      <span className="text-xl">📊</span>
                      <span className="font-medium">แดชบอร์ด</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-4 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-300"
                    >
                      <span className="text-xl">👤</span>
                      <span className="font-medium">โปรไฟล์</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-4 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      <span className="text-xl">🚪</span>
                      <span className="font-medium">ออกจากระบบ</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-0 bg-white/80 backdrop-blur-sm flex-shrink-0">
                  <Button asChild className="w-full h-14 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
                    <Link href="/auth/login" onClick={closeMobileMenu} className="flex items-center justify-center gap-3">
                      <span>🚀</span>
                      <span>เข้าสู่ระบบ</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            
            {/* หน้าแรก */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                isActive('/')
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <span className="text-xl">🏠</span>
              <span>หน้าแรก</span>
            </Link>

            {/* เกี่ยวกับเรา */}
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                isActive('/about')
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <span className="text-xl">ℹ️</span>
              <span>เกี่ยวกับเรา</span>
            </Link>

            {/* บริการ */}
            <div className="space-y-2">
              <button
                onClick={toggleServiceMenu}
                className={cn(
                  "w-full flex items-center justify-between gap-4 p-4 rounded-xl transition-all duration-300",
                  (isServiceActive() || isServiceMenuOpen)
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">💼</span>
                  <span>บริการ</span>
                </div>
                <svg className={cn("w-5 h-5 transition-transform", isServiceMenuOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServiceMenuOpen && (
                <div className="pl-8 space-y-2">
                  {[
                    { href: "/service", icon: "💻", label: "เทคโนโลยี" },
                    { href: "/service#business", icon: "📈", label: "ธุรกิจ" },
                    { href: "/service#design", icon: "🎨", label: "ดิจิทัล" },
                    { href: "/service#finance", icon: "💰", label: "การเงิน" },
                    { href: "/service#health", icon: "🏥", label: "สุขภาพ" },
                    { href: "/service#education", icon: "🎓", label: "การศึกษา" }
                  ].map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                        pathname === item.href
                          ? "bg-green-100 text-green-800 font-semibold border-l-4 border-green-500"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      )}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ติดต่อเรา */}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                isActive('/contact')
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <span className="text-xl">📞</span>
              <span>ติดต่อเรา</span>
            </Link>


          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar