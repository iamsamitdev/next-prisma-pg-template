"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
})

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast.success("ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว", {
      description: `เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมล: ${data.email} กรุณาตรวจสอบอีเมลของคุณ`,
      style: {
        background: "#10b981",
        color: "#ffffff",
        border: "1px solid #059669",
      },
      descriptionClassName: "!text-white",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่อีเมล</FormLabel>
              <FormControl>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@example.com" 
                  autoComplete="email" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button className="w-full" type="submit">
          ส่งลิงก์รีเซ็ตรหัสผ่าน
        </Button>
      </form>
    </Form>
  )
}
