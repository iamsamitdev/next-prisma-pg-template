"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Edit } from "lucide-react"
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

import { useUser, type User, type UpdateUserData } from "@/hooks/useUser"

const FormSchema = z.object({
  fullName: z.string().min(2, { message: "ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  phoneNumber: z.string().min(10, { message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 หลัก" }),
})

interface EditUserDialogProps {
  user: User
  onUserUpdated?: (user: User) => void
  trigger?: React.ReactNode
}

export function EditUserDialog({ user, onUserUpdated, trigger }: EditUserDialogProps) {
  const [open, setOpen] = React.useState(false)
  const { updateUser } = useUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const updatedUser = await updateUser(user.id, values)
      if (updatedUser) {
        toast.success(`แก้ไขข้อมูล ${values.fullName} สำเร็จ`, {
          style: {
            background: "#10b981",
            color: "white",
            border: "none",
          },
        })
        onUserUpdated?.(updatedUser)
        form.reset()
        setOpen(false)
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล", {
        style: {
          background: "#ef4444",
          color: "white",
          border: "none",
        },
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
            แก้ไข
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลผู้ใช้</DialogTitle>
          <DialogDescription>
            แก้ไขข้อมูลของ {user.fullName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ-นามสกุล</FormLabel>
                    <FormControl>
                      <Input placeholder="เช่น สมชาย ใจดี" {...field} />
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
                      <Input type="email" placeholder="เช่น somchai@example.com" {...field} />
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
                      <Input placeholder="เช่น 081-234-5678" {...field} />
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 