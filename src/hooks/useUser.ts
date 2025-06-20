'use client'

import { useState, useCallback } from 'react'

// กำหนด interface สำหรับ User
export interface User {
  id: string
  email: string
  fullName: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
}

// กำหนด interface สำหรับการสร้าง User ใหม่
export interface CreateUserData {
  email: string
  fullName: string
  phoneNumber: string
  password: string
}

// กำหนด interface สำหรับการอัพเดต User
export interface UpdateUserData {
  email?: string
  fullName?: string
  phoneNumber?: string
  password?: string
}

// กำหนด interface สำหรับ response ที่มี pagination
export interface UsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// กำหนด interface สำหรับ query parameters
export interface UserQueryParams {
  page?: number
  limit?: number
  search?: string
}

export function useUser() {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })

  // ฟังก์ชันสำหรับจัดการ error
  const handleError = (error: any) => {
    const message = error?.response?.data?.message || error?.message || 'เกิดข้อผิดพลาด'
    setError(message)
    console.error('User API Error:', error)
  }

  // ฟังก์ชันสำหรับดึงรายการ users ทั้งหมด
  const fetchUsers = useCallback(async (params: UserQueryParams = {}) => {
    const startTime = Date.now() // เริ่มจับเวลา
    setLoading(true)
    setError(null)
    
    try {
      const queryString = new URLSearchParams()
      
      if (params.page) queryString.append('page', params.page.toString())
      if (params.limit) queryString.append('limit', params.limit.toString())
      if (params.search) queryString.append('search', params.search)

      const response = await fetch(`/api/users?${queryString.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: UsersResponse = await response.json()
      
      setUsers(data.users)
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages
      })
      setLoadTime(Date.now() - startTime) // คำนวณเวลาโหลด
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  // ฟังก์ชันสำหรับดึงข้อมูล user เฉพาะคน
  const fetchUserById = useCallback(async (userId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const user: User = await response.json()
      setCurrentUser(user)
      return user
    } catch (error) {
      handleError(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // ฟังก์ชันสำหรับสร้าง user ใหม่
  const createUser = useCallback(async (userData: CreateUserData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const newUser: User = await response.json()
      
      // อัพเดต state โดยเพิ่ม user ใหม่เข้าไป
      setUsers(prevUsers => [newUser, ...prevUsers])
      
      return newUser
    } catch (error) {
      handleError(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // ฟังก์ชันสำหรับอัพเดต user
  const updateUser = useCallback(async (userId: string, userData: UpdateUserData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedUser: User = await response.json()
      
      // อัพเดต state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? updatedUser : user
        )
      )
      
      // ถ้า current user คือ user ที่อัพเดต ก็อัพเดต current user ด้วย
      if (currentUser?.id === userId) {
        setCurrentUser(updatedUser)
      }
      
      return updatedUser
    } catch (error) {
      handleError(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // ฟังก์ชันสำหรับลบ user
  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // อัพเดต state โดยลบ user ออก
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
      
      // ถ้า current user คือ user ที่ลบ ก็เคลียร์ current user
      if (currentUser?.id === userId) {
        setCurrentUser(null)
      }
      
      return true
    } catch (error) {
      handleError(error)
      return false
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // ฟังก์ชันสำหรับอัพเดตข้อมูล user เฉพาะ
  const updateUserProfile = useCallback(async (userId: string, userData: UpdateUserData) => {
    return await updateUser(userId, userData)
  }, [updateUser])

  // ฟังก์ชันสำหรับค้นหา users
  const searchUsers = useCallback(async (searchTerm: string, filters: Omit<UserQueryParams, 'search'> = {}) => {
    return await fetchUsers({ ...filters, search: searchTerm })
  }, [fetchUsers])

  // ฟังก์ชันสำหรับเคลียร์ error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // ฟังก์ชันสำหรับรีเซ็ต state
  const resetState = useCallback(() => {
    setUsers([])
    setCurrentUser(null)
    setError(null)
    setPagination({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    })
  }, [])

  return {
    // States
    users,
    currentUser,
    loading,
    error,
    pagination,
    loadTime,
    
    // Actions
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    updateUserProfile,
    searchUsers,
    clearError,
    resetState,
    
    // Helper functions
    setCurrentUser,
    setUsers
  }
}