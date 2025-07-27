"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Dashboard } from "@/components/dashboard"
import { WalletConnect } from "@/components/wallet-connect"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const { connected } = useWallet()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {connected ? (
          <Dashboard />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-6">Connect Your Wallet</h1>
            <p className="text-muted-foreground max-w-md text-center mb-8">
              Connect your Solana wallet to access your Legacy Vault dashboard.
            </p>
            <WalletConnect />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
