import Footer from "@/components/front/Footer"
import Navbar from "@/components/front/Navbar"

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
        <Navbar />
        <div className="pt-24">
          {children}
        </div>
        <Footer />
    </main>
  )
}