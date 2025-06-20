"use client"

import * as React from "react"

import { Search, X, Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useDataTableInstance } from "@/hooks/use-data-table-instance"

import { DataTable as DataTableNew } from "@/components/back/data-table/data-table"
import { DataTablePagination } from "@/components/back/data-table/data-table-pagination"
import { DataTableViewOptions } from "@/components/back/data-table/data-table-view-options"

import { createUserColumns, type User } from "@/app/(back)/admin/users/_components/columns"
import { AddUserDialog } from "@/app/(back)/admin/users/_components/add-user-dialog"

interface UsersDataTableProps {
  data: User[]
  onUserAdded?: (user: User) => void
  onUserUpdated?: (user: User) => void
  onUserDeleted?: (user: User) => void
  onSearch?: (searchTerm: string) => void
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  currentPage?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function UsersDataTable({ 
  data, 
  onUserAdded, 
  onUserUpdated, 
  onUserDeleted, 
  onSearch,
  pagination,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}: UsersDataTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("")
  const [shouldFocusAfterSearch, setShouldFocusAfterSearch] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  
  // ฟังก์ชันสำหรับเคลียร์การค้นหา
  const handleClearSearch = () => {
    setSearchTerm("")
    setDebouncedSearchTerm("")
    setIsSearching(false)
    setShouldFocusAfterSearch(true)
    // Focus ทันทีสำหรับการกดปุ่ม X
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
  }

  // ฟังก์ชัน wrapper สำหรับ callback ที่ต้อง focus กลับ
  const handleUserAddedWithFocus = React.useCallback((user: any) => {
    onUserAdded?.(user)
    // Focus กลับไปที่ช่องค้นหาหลังเพิ่มผู้ใช้
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }, [onUserAdded])

  const handleUserUpdatedWithFocus = React.useCallback((user: any) => {
    onUserUpdated?.(user)
    // Focus กลับไปที่ช่องค้นหาหลังแก้ไขผู้ใช้
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }, [onUserUpdated])

  const handleUserDeletedWithFocus = React.useCallback((user: any) => {
    onUserDeleted?.(user)
    // Focus กลับไปที่ช่องค้นหาหลังลบผู้ใช้
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }, [onUserDeleted])

  const columns = createUserColumns({ 
    onUserUpdated: handleUserUpdatedWithFocus, 
    onUserDeleted: handleUserDeletedWithFocus
  })
  
  const table = useDataTableInstance({ 
    data, 
    columns, 
    getRowId: (row) => row.id,
    defaultPageSize: data.length, // ให้แสดงข้อมูลทั้งหมดที่ส่งมา
  })

  // useEffect สำหรับ debounce searchTerm
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      // ถ้าเป็นการเคลียร์ค้นหา (ลบข้อความทั้งหมด) ให้ตั้งค่าให้ focus หลังค้นหา
      if (searchTerm === "") {
        setShouldFocusAfterSearch(true)
      }
    }, 800) // หน่วงเวลา 800ms

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  // useEffect สำหรับเรียก API เมื่อ debouncedSearchTerm เปลี่ยน
  React.useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setIsSearching(true)
    }

    const performSearch = async () => {
      onSearch?.(debouncedSearchTerm)
      setIsSearching(false)
      
      // ถ้าต้อง focus หลังค้นหา (เช่น เคลียร์ค้นหา)
      if (shouldFocusAfterSearch) {
        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 50)
        setShouldFocusAfterSearch(false)
      }
    }

    performSearch()
  }, [debouncedSearchTerm, onSearch, shouldFocusAfterSearch])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            {isSearching ? (
              <Loader2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              ref={searchInputRef}
              placeholder="ค้นหาชื่อ, อีเมล หรือเบอร์โทร..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-8 pr-8 w-64"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                type="button"
                aria-label="เคลียร์การค้นหา"
                disabled={isSearching}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <AddUserDialog onUserAdded={handleUserAddedWithFocus} />
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border">
        <DataTableNew
          table={table}
          columns={columns}
        />
      </div>
      
      {/* Custom Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            แสดง {((currentPage || 1) - 1) * (pageSize || 10) + 1} ถึง {Math.min((currentPage || 1) * (pageSize || 10), pagination.total)} 
            จาก {pagination.total.toLocaleString('th-TH')} รายการ
          </div>
          
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <select
                value={pageSize || 10}
                onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                className="h-8 w-[70px] border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={250}>250</option>
                <option value={500}>500</option>
                <option value={1000}>1,000</option>
              </select>
            </div>
            
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {currentPage || 1} of {pagination.totalPages.toLocaleString('th-TH')}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onPageChange?.(1)}
                disabled={currentPage === 1}
                className="hidden h-8 w-8 p-0 lg:flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="sr-only">Go to first page</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor"/>
                  <path d="M1.5 3C1.77614 3 2 3.22386 2 3.5V11.5C2 11.7761 1.77614 12 1.5 12C1.22386 12 1 11.7761 1 11.5V3.5C1 3.22386 1.22386 3 1.5 3Z" fill="currentColor"/>
                </svg>
              </button>
              
              <button
                onClick={() => onPageChange?.((currentPage || 1) - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="sr-only">Go to previous page</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor"/>
                </svg>
              </button>
              
              <button
                onClick={() => onPageChange?.((currentPage || 1) + 1)}
                disabled={currentPage === pagination.totalPages}
                className="h-8 w-8 p-0 flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="sr-only">Go to next page</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor"/>
                </svg>
              </button>
              
              <button
                onClick={() => onPageChange?.(pagination.totalPages)}
                disabled={currentPage === pagination.totalPages}
                className="hidden h-8 w-8 p-0 lg:flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                <span className="sr-only">Go to last page</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"/>
                  <path d="M13.5 12C13.2239 12 13 11.7761 13 11.5V3.5C13 3.22386 13.2239 3 13.5 3C13.7761 3 14 3.22386 14 3.5V11.5C14 11.7761 13.7761 12 13.5 12Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 