"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"

export function WalletConnect() {
  const { wallet, connect, connecting, connected } = useWallet()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center gap-4">
      <WalletMultiButton className="wallet-adapter-button-trigger" />
      <p className="text-sm text-muted-foreground mt-2">
        {connected ? "Wallet connected!" : connecting ? "Connecting..." : "Connect your wallet to continue"}
      </p>
    </div>
  )
}
