import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Clock, Wallet, User } from "lucide-react"

interface VaultInfoProps {
  vaultData: {
    balance: number
    lastSeen: string
    nomineeAddress: string
    inactivityPeriod: number
  }
}

export function VaultInfo({ vaultData }: VaultInfoProps) {
  const { balance, lastSeen, nomineeAddress, inactivityPeriod } = vaultData

  const formatAddress = (address: string) => {
    if (!address) return "Not set"
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: number) => {
    return balance.toFixed(4)
  }

  const formatLastSeen = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (e) {
      return "Unknown"
    }
  }

  const formatInactivityPeriod = (months: number) => {
    if (months === 1) return "1 month"
    if (months < 12) return `${months} months`
    if (months === 12) return "1 year"
    return `${months / 12} years`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vault Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatBalance(balance)} SOL</div>
          <p className="text-xs text-muted-foreground">Current value in your vault</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Seen</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatLastSeen(lastSeen)}</div>
          <p className="text-xs text-muted-foreground">Last time you confirmed you're alive</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nominee</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatAddress(nomineeAddress)}</div>
          <p className="text-xs text-muted-foreground">Wallet that will receive funds</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactivity Period</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatInactivityPeriod(inactivityPeriod)}</div>
          <p className="text-xs text-muted-foreground">Time before funds transfer to nominee</p>
        </CardContent>
      </Card>
    </div>
  )
}
