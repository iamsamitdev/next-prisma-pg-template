import { useState, useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'

export interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
}

interface PaginationInfo {
  type: 'offset' | 'cursor'
  limit: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

interface UsersResponse {
  users: User[]
  total?: number
  page?: number
  totalPages?: number
  hasNext: boolean
  hasPrev?: boolean
  nextCursor?: string | null
  pagination: PaginationInfo
  meta?: {
    isApproximate: boolean
    queryTime: number
  }
}

interface UseOptimizedUsersOptions {
  initialLimit?: number
  useCursorPagination?: boolean
  enableVirtualization?: boolean
  cacheSize?: number
}

interface UseOptimizedUsersReturn {
  // Data
  users: User[]
  loading: boolean
  error: string | null
  
  // Pagination
  currentPage: number
  totalPages: number
  total: number
  hasNext: boolean
  hasPrev: boolean
  
  // Search
  searchTerm: string
  handleSearch: (term: string) => void
  clearSearch: () => void
  
  // Sort
  sortBy: string
  sortOrder: 'asc' | 'desc'
  handleSort: (column: string) => void
  
  // Navigation
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPrevPage: () => void
  
  // Actions
  refresh: () => void
  bulkCreateUsers: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[]) => Promise<any>
  setLimit: (limit: number) => void // เพิ่ม function สำหรับเปลี่ยน limit
  
  // Utils
  isSearching: boolean
  loadTime: number | null // เพิ่ม loadTime ใน return type
}

export function useOptimizedUsers(options: UseOptimizedUsersOptions = {}): UseOptimizedUsersReturn {
  const {
    initialLimit = 50,
    useCursorPagination = true,
    enableVirtualization = true,
    cacheSize = 10
  } = options

  // State
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true) // Start with loading = true
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [initialized, setInitialized] = useState(false) // Track if data has been fetched
  const [limit, setLimit] = useState(initialLimit) // เพิ่ม state สำหรับ limit
  const [loadTime, setLoadTime] = useState<number | null>(null) // เพิ่ม state สำหรับเวลาโหลด
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  
  // Sort states
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  // Cache และ optimization
  const cache = useRef(new Map<string, UsersResponse>())
  const abortController = useRef<AbortController | null>(null)
  const lastFetchTime = useRef(0)
  
  // 🚀 Optimization 1: Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [searchTerm])

  // 🚀 Optimization 2: Cache Key Generation
  const getCacheKey = useCallback((
    search: string,
    page: number,
    cursor: string | null,
    sort: string,
    order: string,
    limit: number
  ) => {
    return `${search}-${page}-${cursor}-${sort}-${order}-${limit}`
  }, [])

  // 🚀 Optimization 3: Fetch with Caching and Request Deduplication
  const fetchUsers = useCallback(async (
    page: number = 1,
    search: string = '',
    cursor: string | null = null,
    useCache: boolean = true
  ) => {
    console.log('🔍 fetchUsers called:', { page, search, cursor, useCache })
    const startTime = Date.now() // เริ่มจับเวลา
    const now = Date.now()
    
    // Prevent rapid consecutive requests (ชั่วคราวปิด throttle เพื่อ debug)
    // if (now - lastFetchTime.current < 50) {
    //   console.log('⏱️ Request throttled')
    //   return
    // }
    lastFetchTime.current = now

    // Cancel previous request
    if (abortController.current) {
      abortController.current.abort()
    }
    abortController.current = new AbortController()

    const cacheKey = getCacheKey(search, page, cursor, sortBy, sortOrder, limit)
    
    // Check cache first
    if (useCache && cache.current.has(cacheKey)) {
      const cachedData = cache.current.get(cacheKey)!
      setUsers(cachedData.users)
      setTotal(cachedData.total || 0)
      setCurrentPage(cachedData.page || page)
      setTotalPages(cachedData.totalPages || 0)
      setHasNext(cachedData.hasNext)
      setHasPrev(cachedData.hasPrev || false)
      setNextCursor(cachedData.nextCursor || null)
      setLoadTime(Date.now() - startTime) // คำนวณเวลาสำหรับ cache hit
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        sortBy,
        sortOrder: sortOrder as string,
      })

      // ใช้ cursor pagination หรือ offset pagination
      if (useCursorPagination && cursor && !search) {
        params.append('cursor', cursor)
      } else {
        params.append('page', page.toString())
      }

      if (search) {
        params.append('search', search)
      }

      console.log('📡 Fetching:', `/api/users/optimized?${params}`)
      
      const response = await fetch(`/api/users/optimized?${params}`, {
        signal: abortController.current.signal,
        headers: {
          'Cache-Control': 'no-cache',
        }
      })

      console.log('📡 Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Error:', errorText)
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล')
      }

      const data: UsersResponse = await response.json()
      console.log('📦 Response data:', data)

      // Update states
      setUsers(data.users)
      setTotal(data.total || 0)
      setCurrentPage(data.page || page)
      setTotalPages(data.totalPages || 0)
      setHasNext(data.hasNext)
      setHasPrev(data.hasPrev || false)
      setNextCursor(data.nextCursor || null)
      setInitialized(true) // Mark as initialized after first successful fetch
      setLoadTime(Date.now() - startTime) // คำนวณเวลาโหลดจริง

      // Cache the result
      cache.current.set(cacheKey, data)
      
      // Limit cache size
      if (cache.current.size > cacheSize) {
        const firstKey = cache.current.keys().next().value
        if (firstKey) {
          cache.current.delete(firstKey)
        }
      }

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setError(error.message)
        toast.error('เกิดข้อผิดพลาดในการดึงข้อมูล')
      }
    } finally {
      setLoading(false)
    }
  }, [sortBy, sortOrder, limit, useCursorPagination, getCacheKey, cacheSize])

  // 🚀 Initial load
  useEffect(() => {
    console.log('🎯 Initial load effect')
    fetchUsers(1, '')
  }, []) // Empty dependency - run only once

  // 🚀 Auto-fetch data based on search and sort changes
  useEffect(() => {
    console.log('🔄 Search/Sort effect triggered:', { debouncedSearchTerm, sortBy, sortOrder })
    // Skip initial empty search to avoid duplicate calls
    if (debouncedSearchTerm !== '' || searchTerm !== '') {
      fetchUsers(1, debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, sortBy, sortOrder]) // Remove fetchUsers to prevent infinite loop

  // 🚀 Refetch when limit changes
  useEffect(() => {
    console.log('📏 Limit changed:', limit)
    if (initialized) {
      setCurrentPage(1) // รีเซ็ตไปหน้าแรก
      cache.current.clear() // เคลียร์ cache
      fetchUsers(1, debouncedSearchTerm)
    }
  }, [limit, initialized, debouncedSearchTerm, fetchUsers])

  // 🚀 Optimization 5: Navigation functions
  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return
    fetchUsers(page, debouncedSearchTerm)
  }, [fetchUsers, debouncedSearchTerm, totalPages])

  const goToNextPage = useCallback(() => {
    if (useCursorPagination && nextCursor) {
      fetchUsers(currentPage + 1, debouncedSearchTerm, nextCursor)
    } else if (hasNext) {
      goToPage(currentPage + 1)
    }
  }, [useCursorPagination, nextCursor, hasNext, currentPage, fetchUsers, debouncedSearchTerm, goToPage])

  const goToPrevPage = useCallback(() => {
    if (hasPrev) {
      goToPage(currentPage - 1)
    }
  }, [hasPrev, currentPage, goToPage])

  // 🚀 Optimization 6: Sort functions
  const handleSort = useCallback((column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
    setCurrentPage(1)
    setNextCursor(null)
  }, [sortBy, sortOrder])

  // 🚀 Optimization 7: Search functions
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
    setNextCursor(null)
    // Clear cache when searching
    cache.current.clear()
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setCurrentPage(1)
    setNextCursor(null)
  }, [])

  // 🚀 Optimization 8: Refresh function
  const refresh = useCallback(() => {
    cache.current.clear()
    fetchUsers(currentPage, debouncedSearchTerm, nextCursor, false)
  }, [fetchUsers, currentPage, debouncedSearchTerm, nextCursor])

  // 🚀 Optimization 9: Bulk operations
  const bulkCreateUsers = useCallback(async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    setLoading(true)
    try {
      const response = await fetch('/api/users/optimized', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'bulk_create',
          data: userData
        })
      })

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการสร้างข้อมูล')
      }

      const result = await response.json()
      toast.success(`สร้างข้อมูลสำเร็จ ${result.totalCreated} รายการ`)
      
      // Refresh data
      refresh()
      
      return result
    } catch (error: any) {
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [refresh])

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [])

  return {
    // Data
    users,
    loading,
    error,
    
    // Pagination
    currentPage,
    totalPages,
    total,
    hasNext,
    hasPrev,
    
    // Search
    searchTerm,
    handleSearch,
    clearSearch,
    
    // Sort
    sortBy,
    sortOrder,
    handleSort,
    
    // Navigation
    goToPage,
    goToNextPage,
    goToPrevPage,
    
    // Actions
    refresh,
    bulkCreateUsers,
    setLimit, // เพิ่ม setLimit function
    
    // Utils
    isSearching: searchTerm !== debouncedSearchTerm,
    loadTime, // เพิ่ม loadTime ใน return object
  }
} 