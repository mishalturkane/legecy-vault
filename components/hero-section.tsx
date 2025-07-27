import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Secure Your Digital Legacy</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Legacy Vault ensures your Solana assets reach your loved ones if you're unable to access them.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="font-medium">
              Launch App
            </Button>
          </Link>
          <Button variant="outline" size="lg" asChild>
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
