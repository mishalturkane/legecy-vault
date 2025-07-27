"use client"

import type React from "react"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { mockUpdateNominee, mockUpdateInactivityPeriod } from "@/lib/mock-data"

interface NomineeFormProps {
  vaultData: any
  setVaultData: (data: any) => void
}

export function NomineeForm({ vaultData, setVaultData }: NomineeFormProps) {
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const [nomineeAddress, setNomineeAddress] = useState(vaultData.nomineeAddress || "")
  const [inactivityPeriod, setInactivityPeriod] = useState(vaultData.inactivityPeriod.toString() || "12")
  const [loading, setLoading] = useState(false)

  const handleUpdateNominee = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nomineeAddress) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid Solana wallet address.",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      // In a real implementation, this would call the smart contract
      await mockUpdateNominee(publicKey?.toString(), nomineeAddress)

      // Update the local state to simulate the change
      setVaultData({
        ...vaultData,
        nomineeAddress,
      })

      toast({
        title: "Nominee updated",
        description: "Your nominee wallet address has been updated.",
      })
    } catch (error) {
      console.error("Error updating nominee:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating your nominee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateInactivityPeriod = async (value: string) => {
    try {
      setLoading(true)
      setInactivityPeriod(value)

      // In a real implementation, this would call the smart contract
      await mockUpdateInactivityPeriod(publicKey?.toString(), Number.parseInt(value))

      // Update the local state to simulate the change
      setVaultData({
        ...vaultData,
        inactivityPeriod: Number.parseInt(value),
      })

      toast({
        title: "Inactivity period updated",
        description: "Your inactivity period has been updated.",
      })
    } catch (error) {
      console.error("Error updating inactivity period:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating your inactivity period. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nominee Settings</CardTitle>
        <CardDescription>Configure your nominee and inactivity period</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleUpdateNominee} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nominee">Nominee Wallet Address</Label>
            <Input
              id="nominee"
              placeholder="Solana wallet address"
              value={nomineeAddress}
              onChange={(e) => setNomineeAddress(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              This wallet will receive your funds after the inactivity period.
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Nominee"}
          </Button>
        </form>

        <div className="space-y-2">
          <Label htmlFor="inactivity-period">Inactivity Period</Label>
          <Select value={inactivityPeriod} onValueChange={handleUpdateInactivityPeriod} disabled={loading}>
            <SelectTrigger id="inactivity-period">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 month</SelectItem>
              <SelectItem value="3">3 months</SelectItem>
              <SelectItem value="6">6 months</SelectItem>
              <SelectItem value="12">1 year</SelectItem>
              <SelectItem value="24">2 years</SelectItem>
              <SelectItem value="36">3 years</SelectItem>
              <SelectItem value="60">5 years</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            If you don't click "I'm Alive" for this period, funds will transfer to your nominee.
          </p>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Make sure your nominee is aware of this arrangement and has access to their wallet.
      </CardFooter>
    </Card>
  )
}
