"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useUser, type User, type CreateUserData } from "@/hooks/useUser"

const FormSchema = z.object({
  fullName: z.string().min(2, { message: "ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  phoneNumber: z.string().min(10, { message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 หลัก" }),
  password: z.string().min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
})

interface AddUserDialogProps {
  onUserAdded?: (user: User) => void
}

export function AddUserDialog({ onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = React.useState(false)
  const { createUser, loading } = useUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const newUser = await createUser(data as CreateUserData)
      
      if (newUser) {
        toast.success(`เพิ่มผู้ใช้ ${data.fullName} สำเร็จ`, {
          style: {
            background: "#10b981",
            color: "#ffffff",
            border: "1px solid #059669",
          },
        })
        
        setOpen(false)
        form.reset()
        
        // เรียก callback ถ้ามี
        onUserAdded?.(newUser)
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้", {
        description: error instanceof Error ? error.message : "กรุณาลองใหม่อีกครั้ง",
        style: {
          background: "#ef4444",
          color: "#ffffff",
          border: "1px solid #dc2626",
        },
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">เพิ่มผู้ใช้</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มผู้ใช้ใหม่</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลผู้ใช้ใหม่ที่ต้องการเพิ่มเข้าสู่ระบบ
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ-นามสกุล</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="เช่น สมชาย ใจดี"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="เช่น somchai@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="เช่น 081-234-5678"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="รหัสผ่านสำหรับเข้าสู่ระบบ"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                ยกเลิก
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "กำลังเพิ่ม..." : "เพิ่มผู้ใช้"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 