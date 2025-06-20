"use client"

import * as React from "react"
import { toast } from "sonner"
import { useUser } from "@/hooks/useUser"

import { UsersDataTable } from "@/app/(back)/admin/users/_components/data-table"
import { type User } from "@/hooks/useUser"

export default function UsersPage() {
  const [currentSearch, setCurrentSearch] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(100) // เพิ่มจำนวนเริ่มต้น
  const {
    users,
    loading,
    error,
    fetchUsers,
    clearError,
    pagination,
    loadTime
  } = useUser()

  // ดึงข้อมูล users เมื่อ component mount หรือเมื่อ page/pageSize เปลี่ยน
  React.useEffect(() => {
    fetchUsers({ page: currentPage, limit: pageSize, search: currentSearch })
  }, [fetchUsers, currentPage, pageSize, currentSearch])

  // แสดง error message เมื่อมี error
  React.useEffect(() => {
    if (error) {
      toast.error(error)
      // เคลียร์ error หลังจากแสดงแล้ว
      setTimeout(() => {
        clearError()
      }, 5000)
    }
  }, [error, clearError])

  const handleUserAdded = (newUser: User) => {
    // รีเฟรชข้อมูล users หลังจากเพิ่มผู้ใช้สำเร็จ
    fetchUsers({ page: currentPage, limit: pageSize, search: currentSearch })
  }

  const handleUserUpdated = (updatedUser: User) => {
    // รีเฟรชข้อมูล users หลังจากแก้ไขผู้ใช้สำเร็จ
    fetchUsers({ page: currentPage, limit: pageSize, search: currentSearch })
  }

  const handleUserDeleted = (deletedUser: User) => {
    // รีเฟรชข้อมูล users หลังจากลบผู้ใช้สำเร็จ
    fetchUsers({ page: currentPage, limit: pageSize, search: currentSearch })
  }

  const handleSearch = React.useCallback((searchTerm: string) => {
    setCurrentSearch(searchTerm)
    setCurrentPage(1) // รีเซ็ตไปหน้าแรกเมื่อค้นหา
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1) // รีเซ็ตไปหน้าแรกเมื่อเปลี่ยนขนาดหน้า
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('th-TH').format(num)
  }

  const formatLoadTime = (timeMs: number | null) => {
    if (timeMs === null) return null
    
    if (timeMs >= 1000) {
      const seconds = (timeMs / 1000).toFixed(1)
      return `${seconds}s`
    } else {
      return `${timeMs}ms`
    }
  }

  // แสดง loading state
  if (loading && users.length === 0) {
    return (
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">จัดการผู้ใช้</h1>
          <p className="text-muted-foreground">กำลังโหลดข้อมูล...</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">จัดการผู้ใช้</h1>
          <p className="text-muted-foreground">
            แสดง {formatNumber(users.length)} จาก {formatNumber(pagination.total)} รายการ 
            (หน้า {currentPage} จาก {formatNumber(pagination.totalPages)})
          </p>
        </div>
        
        {/* Performance Display */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2">
            {loading ? (
              <>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-orange-600">กำลังโหลด...</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">โหลดเสร็จ</span>
              </>
            )}
          </div>
          {loadTime !== null && !loading && (
            <div className="text-xs text-muted-foreground border-l pl-2 ml-2">
              ⚡ {formatLoadTime(loadTime)}
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <UsersDataTable 
        data={users} 
        onUserAdded={handleUserAdded}
        onUserUpdated={handleUserUpdated}
        onUserDeleted={handleUserDeleted}
        onSearch={handleSearch}
        pagination={pagination}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />


    </div>
  )
}