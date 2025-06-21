'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number with Animation */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-400 animate-pulse">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">หน้าที่คุณหาไม่พบ</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-2">
            ขออภัย อาจจะมีการย้ายหน้า หรือลิงก์ที่คุณคลิกอาจจะผิด
          </p>
          <p className="text-gray-500">
            ไม่ต้องกังวล เรามีทางเลือกอื่นให้คุณ!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            กลับสู่หน้าหลัก
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับหน้าก่อนหน้า
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
    </div>
  )
}