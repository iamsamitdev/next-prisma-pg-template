"use client"

import * as React from "react"
import { Eye, Mail, Phone, User, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

import { type User as UserType } from "@/hooks/useUser"

interface ViewUserDialogProps {
  user: UserType
  trigger?: React.ReactNode
}

export function ViewUserDialog({ user, trigger }: ViewUserDialogProps) {
  const [open, setOpen] = React.useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
            ดูรายละเอียด
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            รายละเอียดผู้ใช้
          </DialogTitle>
          <DialogDescription>
            ข้อมูลรายละเอียดของผู้ใช้ในระบบ
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">ชื่อ-นามสกุล:</span>
              <span className="col-span-2 font-medium">{user.fullName}</span>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">อีเมล:</span>
              <div className="col-span-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">เบอร์โทรศัพท์:</span>
              <div className="col-span-2 flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phoneNumber}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">สถานะ:</span>
              <div className="col-span-2">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  ใช้งาน
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">วันที่สร้าง:</span>
              <div className="col-span-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(user.createdAt)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">อัพเดทล่าสุด:</span>
              <div className="col-span-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            ปิด
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 