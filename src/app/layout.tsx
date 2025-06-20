import type { Metadata } from "next"
import { Inter, Anuphan } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { APP_CONFIG } from "@/config/app-config"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/hooks/useAuth"
import "./globals.css"

// กำหนด font ของระบบ
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})
const anuphan = Anuphan({ 
  subsets: ["latin"],
  variable: "--font-anuphan"
})

// กำหนด metadata ของระบบ
export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_CONFIG.appName}`,
    default: APP_CONFIG.appName,
  },
  description: APP_CONFIG.meta.description,
  keywords: APP_CONFIG.meta.keywords.join(", "),
}

// กำหนด layout ของระบบ
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body 
        className={`${anuphan.variable} ${inter.variable}`}
        style={{
          fontFamily: `var(--font-anuphan), var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
        }}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          forcedTheme="light"
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}