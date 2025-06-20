'use client'

import { useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { VirtualizedDataTable } from '@/components/back/virtualized-data-table'
import { useOptimizedUsers, User } from '@/hooks/useOptimizedUsers'
import { Search, X, RefreshCw, Database, Zap, TrendingUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function OptimizedUsersPage() {
  const [pageSize, setPageSize] = useState(100)
  
  const {
    users,
    loading,
    error,
    currentPage,
    totalPages,
    total,
    hasNext,
    hasPrev,
    searchTerm,
    handleSearch,
    clearSearch,
    sortBy,
    sortOrder,
    handleSort,
    goToPage,
    goToNextPage,
    goToPrevPage,
    refresh,
    isSearching,
    setLimit,
    loadTime,
  } = useOptimizedUsers({
    initialLimit: pageSize, // ใช้ pageSize ที่ผู้ใช้เลือก
    useCursorPagination: false, // ใช้ offset pagination เพื่อให้เห็นเลขหน้าชัดเจน
    enableVirtualization: true,
    cacheSize: 20
  })

  // 🚀 Memoized columns configuration
  const columns = useMemo(() => [
    {
      key: 'fullName',
      header: 'ชื่อ-นามสกุล',
      width: 200,
      render: (user: User) => (
        <div className="font-medium">{user.fullName}</div>
      )
    },
    {
      key: 'email',
      header: 'อีเมล',
      width: 250,
      render: (user: User) => (
        <div className="text-muted-foreground">{user.email}</div>
      )
    },
    {
      key: 'phoneNumber',
      header: 'เบอร์โทรศัพท์',
      width: 150,
      render: (user: User) => (
        <div>{user.phoneNumber}</div>
      )
    },
    {
      key: 'createdAt',
      header: 'วันที่สร้าง',
      width: 150,
      render: (user: User) => (
        <div className="text-sm">
          {new Date(user.createdAt).toLocaleDateString('th-TH')}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'การดำเนินการ',
      width: 120,
      render: (user: User) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewUser(user)}
          >
            ดู
          </Button>
        </div>
      )
    }
  ], [])

  const handleViewUser = useCallback((user: User) => {
    toast.info(`ดูข้อมูลผู้ใช้: ${user.fullName}`)
  }, [])

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            🚀 Optimized Users Management
          </h1>
          <p className="text-muted-foreground">
            ระบบจัดการผู้ใช้ที่ optimize สำหรับข้อมูลหลักล้าน records
          </p>
        </div>
        <Button onClick={refresh} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          รีเฟรช
        </Button>
      </div>

      {/* Performance Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ผู้ใช้ทั้งหมด</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(total)}</div>
            <p className="text-xs text-muted-foreground">
              records ในฐานข้อมูล
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">แสดงในหน้านี้</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              records ที่โหลดแล้ว
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">หน้าปัจจุบัน</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentPage} / {formatNumber(totalPages)}
            </div>
            <p className="text-xs text-muted-foreground">
              pagination
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Badge variant={loading ? "destructive" : "default"}>
              {loading ? "Loading..." : "Ready"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {isSearching && (
                <div className="text-orange-600 text-sm">🔍 กำลังค้นหา...</div>
              )}
              {!loading && !isSearching && (
                <div className="text-green-600 text-sm">✅ พร้อมใช้งาน</div>
              )}
              {loadTime !== null && (
                <div className="text-xs text-muted-foreground">
                  ⚡ โหลดใน {formatLoadTime(loadTime)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
          <CardDescription>
            ใช้ debounced search และ server-side filtering สำหรับ performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, อีเมล, หรือเบอร์โทรศัพท์..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-7 w-7 p-0"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Sort Controls */}
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'createdAt' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSort('createdAt')}
              >
                วันที่ {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant={sortBy === 'fullName' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSort('fullName')}
              >
                ชื่อ {sortBy === 'fullName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>

          {searchTerm && (
            <div className="mt-2">
              <Badge variant="secondary">
                ค้นหา: "{searchTerm}" - พบ {formatNumber(total)} รายการ
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Virtualized Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการผู้ใช้</CardTitle>
          <CardDescription>
            ใช้ Virtual Scrolling สำหรับแสดงข้อมูลจำนวนมากได้อย่างลื่นไหล
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
              <Button onClick={refresh} className="mt-2">
                ลองใหม่
              </Button>
            </div>
          ) : (
            <VirtualizedDataTable
              users={users}
              columns={columns}
              loading={loading}
              height={450} // ลดความสูงเพราะมีข้อมูลน้อยลง
              rowHeight={60}
              overscan={5} // ลด overscan เพราะข้อมูลน้อย
            />
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
            แสดง {users.length} จาก {formatNumber(total)} รายการ
            {totalPages > 0 && (
              <span>
                {' '}(หน้า {currentPage} จาก {formatNumber(totalPages)} หน้า)
                {' '}• รายการที่ {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, total)}
              </span>
            )}
          </div>
            
            <div className="flex items-center space-x-4">
              {/* Page Size Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">แสดง</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => {
                    const newSize = parseInt(value)
                    setPageSize(newSize)
                    setLimit(newSize) // อัพเดท limit ใน hook
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">รายการ</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={!hasPrev || loading}
                >
                  ก่อนหน้า
                </Button>
              
              {/* Simple pagination info */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  หน้า {currentPage} จาก {formatNumber(totalPages)}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={!hasNext || loading}
              >
                ถัดไป
              </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Performance Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div>🚀 <strong>Cursor Pagination:</strong> ใช้สำหรับข้อมูลขนาดใหญ่</div>
            <div>🔍 <strong>Debounced Search:</strong> ลดการ request ขณะพิมพ์</div>
            <div>📊 <strong>Virtual Scrolling:</strong> แสดงเฉพาะ rows ที่เห็น</div>
            <div>💾 <strong>Smart Caching:</strong> cache results เพื่อลด API calls</div>
            <div>🎯 <strong>Database Indexes:</strong> optimize query performance</div>
            <div>📈 <strong>Approximate Count:</strong> ใช้ estimate สำหรับตารางใหญ่</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 