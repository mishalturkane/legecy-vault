import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, Users, Wallet } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your SOL is securely stored in a Solana smart contract with robust security measures.",
    },
    {
      icon: Clock,
      title: "Configurable Timeouts",
      description: "Set custom inactivity periods from 1 month to 5 years before automatic transfer.",
    },
    {
      icon: Users,
      title: "Nominee System",
      description: "Designate a trusted nominee to receive your assets if you're unable to access them.",
    },
    {
      icon: Wallet,
      title: "Easy Management",
      description: "Simple dashboard to manage your vault, check balances, and update settings.",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Legacy Vault Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A secure, smart contract-based solution for ensuring your digital assets reach your loved ones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/40">
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
