"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"

const FormSchema = z.object({
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  password: z.string().min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
  remember: z.boolean().optional(),
})

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // ดึง callback URL จาก query parameters
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      await login(data.email, data.password, data.remember)

      toast.success("เข้าสู่ระบบสำเร็จ!", {
        description: "ยินดีต้อนรับกลับมา",
        style: {
          background: "#10b981",
          color: "#ffffff",
          border: "1px solid #059669",
        },
        descriptionClassName: "!text-white",
      })

      // Redirect to callback URL หรือ dashboard
      router.push(callbackUrl)
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด", {
        description: error instanceof Error ? error.message : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
        style: {
          background: "#ef4444",
          color: "#ffffff",
          border: "1px solid #dc2626",
        },
        descriptionClassName: "!text-white",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      {/* แสดงข้อความเตือนเมื่อมี callback URL */}
      {searchParams.get('callbackUrl') && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-amber-800 font-medium mb-1">
              กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้าดังกล่าว
            </p>
            <p className="text-amber-700">
              คุณจะถูกนำไปยัง <span className="font-mono text-xs bg-amber-100 px-1 py-0.5 rounded">{callbackUrl}</span> หลังจากเข้าสู่ระบบสำเร็จ
            </p>
          </div>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่อีเมล</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="your@example.com" autoComplete="email" {...field} />
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormControl>
                  <Checkbox
                    id="login-remember"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="size-4"
                  />
                </FormControl>
                <FormLabel htmlFor="login-remember" className="text-muted-foreground ml-1 text-sm font-medium">
                  จดจำฉันไว้ 30 วัน
                </FormLabel>
              </FormItem>
            )}
          />
          <Link href="/auth/forgotpassword" className="text-sm text-primary hover:underline">
            ลืมรหัสผ่าน?
          </Link>
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>
      </form>
    </Form>
  )
}