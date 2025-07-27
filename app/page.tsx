import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <section className="py-16 px-4 md:py-24 bg-muted/50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to secure your digital legacy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Create your Legacy Vault today and ensure your digital assets reach your loved ones.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="font-medium">
                Launch App
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
