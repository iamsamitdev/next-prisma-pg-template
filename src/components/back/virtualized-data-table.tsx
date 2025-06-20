'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@/hooks/useOptimizedUsers'

interface Column {
  key: string
  header: string
  width?: number
  render?: (user: User) => React.ReactNode
}

interface VirtualizedDataTableProps {
  users: User[]
  columns: Column[]
  loading?: boolean
  height?: number
  rowHeight?: number
  overscan?: number
}

export function VirtualizedDataTable({
  users,
  columns,
  loading = false,
  height = 600,
  rowHeight = 50,
  overscan = 10
}: VirtualizedDataTableProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  // 🚀 Virtual scrolling สำหรับ performance
  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan,
  })

  const virtualItems = virtualizer.getVirtualItems()

  // Memoized column widths
  const columnWidths = useMemo(() => {
    return columns.map(col => col.width || 150)
  }, [columns])

  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0)

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      {/* Header */}
      <div className="border-b bg-muted/50">
        <div 
          className="flex"
          style={{ width: totalWidth }}
        >
          {columns.map((column, index) => (
            <div
              key={column.key}
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground border-r last:border-r-0"
              style={{ width: columnWidths[index] }}
            >
              {column.header}
            </div>
          ))}
        </div>
      </div>

      {/* Virtual scrollable body */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualRow) => {
            const user = users[virtualRow.index]
            
            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full border-b hover:bg-muted/50 transition-colors"
                style={{
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: totalWidth,
                }}
              >
                <div className="flex h-full items-center">
                  {columns.map((column, colIndex) => (
                    <div
                      key={column.key}
                      className="px-4 py-2 text-sm border-r last:border-r-0 truncate"
                      style={{ width: columnWidths[colIndex] }}
                    >
                      {column.render ? column.render(user) : user[column.key as keyof User]}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer info */}
      <div className="px-4 py-2 text-sm text-muted-foreground border-t bg-muted/20">
        แสดง {virtualItems.length} จาก {users.length} รายการ
      </div>
    </div>
  )
}

// 🚀 Optimized Table Row Component
interface VirtualTableRowProps {
  user: User
  columns: Column[]
  columnWidths: number[]
  style: React.CSSProperties
}

function VirtualTableRow({ user, columns, columnWidths, style }: VirtualTableRowProps) {
  return (
    <div
      className="absolute top-0 left-0 w-full border-b hover:bg-muted/50 transition-colors"
      style={style}
    >
      <div className="flex h-full items-center">
        {columns.map((column, colIndex) => (
          <div
            key={column.key}
            className="px-4 py-2 text-sm border-r last:border-r-0 truncate"
            style={{ width: columnWidths[colIndex] }}
          >
            {column.render ? column.render(user) : user[column.key as keyof User]}
          </div>
        ))}
      </div>
    </div>
  )
} 