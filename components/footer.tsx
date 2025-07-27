import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Legacy Vault</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Secure your Solana assets with nominee transfer capabilities
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <nav className="flex gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Legacy Vault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
