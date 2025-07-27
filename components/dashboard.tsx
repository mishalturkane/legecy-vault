"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { VaultInfo } from "@/components/vault-info"
import { DepositForm } from "@/components/deposit-form"
import { NomineeForm } from "@/components/nominee-form"
import { ImAliveButton } from "@/components/im-alive-button"
import { mockFetchVaultData } from "@/lib/mock-data"

export function Dashboard() {
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const [vaultData, setVaultData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real implementation, this would fetch data from the Solana blockchain
        // For now, we'll use mock data
        const data = await mockFetchVaultData(publicKey?.toString())
        setVaultData(data)
      } catch (error) {
        console.error("Error fetching vault data:", error)
        toast({
          title: "Error",
          description: "Failed to load vault data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (publicKey) {
      fetchData()
    }
  }, [publicKey, toast])

  const handleImAlive = async () => {
    try {
      // In a real implementation, this would call the smart contract
      toast({
        title: "Success",
        description: "You've confirmed you're alive! Last seen time updated.",
      })

      // Update the local state to simulate the change
      setVaultData({
        ...vaultData,
        lastSeen: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error updating alive status:", error)
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Legacy Vault Dashboard</h1>
          <p className="text-muted-foreground">Manage your vault and nominee settings</p>
        </div>
        <ImAliveButton onImAlive={handleImAlive} />
      </div>

      <VaultInfo vaultData={vaultData} />

      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="deposit">Deposit SOL</TabsTrigger>
          <TabsTrigger value="settings">Nominee Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit" className="mt-6">
          <DepositForm vaultData={vaultData} setVaultData={setVaultData} />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <NomineeForm vaultData={vaultData} setVaultData={setVaultData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
