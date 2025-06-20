import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVertical, Mail, Phone, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "@/components/back/data-table/data-table-column-header"
import { ViewUserDialog } from "@/app/(back)/admin/users/_components/view-user-dialog"
import { EditUserDialog } from "@/app/(back)/admin/users/_components/edit-user-dialog"
import { DeleteUserDialog } from "@/app/(back)/admin/users/_components/delete-user-dialog"

export type User = {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
}

interface UserColumnsProps {
  onUserUpdated: (user: User) => void
  onUserDeleted: (user: User) => void
}

export const createUserColumns = ({ onUserUpdated, onUserDeleted }: UserColumnsProps): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ชื่อ-นามสกุล" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4" />
        </div>
        <div className="font-medium">{row.getValue("fullName")}</div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="อีเมล" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <div className="text-sm">{row.getValue("email")}</div>
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="เบอร์โทรศัพท์" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <div className="text-sm">{row.getValue("phoneNumber")}</div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="วันที่สร้าง" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="สถานะ" />,
    cell: () => (
      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
        ใช้งาน
      </Badge>
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">เปิดเมนู</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <EditUserDialog
            user={row.original}
            onUserUpdated={onUserUpdated}
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                แก้ไข
              </DropdownMenuItem>
            }
          />
          <ViewUserDialog
            user={row.original}
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                ดูรายละเอียด
              </DropdownMenuItem>
            }
          />
          <DropdownMenuSeparator />
          <DeleteUserDialog
            user={row.original}
            onUserDeleted={onUserDeleted}
            trigger={
              <DropdownMenuItem 
                variant="destructive" 
                onSelect={(e) => e.preventDefault()}
              >
                ลบ
              </DropdownMenuItem>
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
] 