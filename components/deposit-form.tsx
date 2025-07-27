"use client"

import type React from "react"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { mockDepositToVault } from "@/lib/mock-data"

interface DepositFormProps {
  vaultData: any
  setVaultData: (data: any) => void
}

export function DepositForm({ vaultData, setVaultData }: DepositFormProps) {
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      // In a real implementation, this would call the smart contract
      await mockDepositToVault(publicKey?.toString(), Number.parseFloat(amount))

      // Update the local state to simulate the deposit
      setVaultData({
        ...vaultData,
        balance: vaultData.balance + Number.parseFloat(amount),
      })

      toast({
        title: "Deposit successful",
        description: `${amount} SOL has been added to your vault.`,
      })

      setAmount("")
    } catch (error) {
      console.error("Error depositing to vault:", error)
      toast({
        title: "Deposit failed",
        description: "There was an error depositing to your vault. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit SOL</CardTitle>
        <CardDescription>Add SOL to your Legacy Vault</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDeposit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (SOL)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></span>
                Processing...
              </span>
            ) : (
              "Deposit SOL"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Your funds will be securely stored in the Legacy Vault smart contract.
      </CardFooter>
    </Card>
  )
}
