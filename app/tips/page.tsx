"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Shield, ArrowLeft, AlertTriangle, Clock, MapPin, Search, TrendingUp, Users } from "lucide-react"

type Incident = {
  id: string
  type: string
  location: string
  date: string
  time: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  source: string
}

type SafetyTip = {
  id: string
  category: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  source: string
}

const incidents: Incident[] = [
  {
    id: "1",
    type: "Pickpocketing",
    location: "Market District",
    date: "2025-01-08",
    time: "14:30",
    severity: "medium",
    description: "Tourist reported wallet stolen from back pocket in crowded market area. No violence involved.",
    source: "Local Police",
  },
  {
    id: "2",
    type: "Tourist Scam",
    location: "Tourist Zone",
    date: "2025-01-08",
    time: "11:15",
    severity: "low",
    description: "Fake tour guide attempted to overcharge tourists. Incident resolved by authorities.",
    source: "Tourist Report",
  },
  {
    id: "3",
    type: "Assault",
    location: "Nightlife District",
    date: "2025-01-07",
    time: "23:45",
    severity: "high",
    description: "Physical altercation outside nightclub. Victim received medical attention. Suspect apprehended.",
    source: "Local Police",
  },
  {
    id: "4",
    type: "Theft",
    location: "Central Station",
    date: "2025-01-07",
    time: "18:20",
    severity: "medium",
    description: "Unattended luggage stolen from waiting area. Remind travelers to keep belongings secure.",
    source: "Station Security",
  },
  {
    id: "5",
    type: "Drink Spiking",
    location: "Nightlife District",
    date: "2025-01-06",
    time: "22:00",
    severity: "critical",
    description: "Suspected drink tampering reported. Victim safe. Investigation ongoing. Extra caution advised.",
    source: "Local Police",
  },
]

const safetyTips: SafetyTip[] = [
  {
    id: "1",
    category: "General Safety",
    title: "Keep Valuables Secure",
    description:
      "Use anti-theft bags, keep wallets in front pockets, and avoid displaying expensive jewelry or electronics in public areas.",
    priority: "high",
    source: "Local Authorities",
  },
  {
    id: "2",
    category: "Transportation",
    title: "Use Official Taxis Only",
    description:
      "Always use licensed taxi services or ride-sharing apps. Verify the driver's credentials before entering the vehicle.",
    priority: "high",
    source: "Verified Locals",
  },
  {
    id: "3",
    category: "Nightlife",
    title: "Never Leave Drinks Unattended",
    description:
      "Watch your drinks at all times in bars and clubs. If you leave your drink, order a new one. Stay with trusted friends.",
    priority: "high",
    source: "Local Police",
  },
  {
    id: "4",
    category: "General Safety",
    title: "Stay in Well-Lit Areas",
    description:
      "Especially at night, stick to well-populated and well-lit streets. Avoid shortcuts through dark alleys or isolated areas.",
    priority: "medium",
    source: "Past Travelers",
  },
  {
    id: "5",
    category: "Money",
    title: "Be Aware of Common Scams",
    description:
      "Research common tourist scams in the area. Be cautious of overly friendly strangers offering unsolicited help or deals.",
    priority: "medium",
    source: "Verified Locals",
  },
  {
    id: "6",
    category: "Communication",
    title: "Share Your Itinerary",
    description:
      "Let family or friends know your plans and check in regularly. Keep emergency contacts easily accessible.",
    priority: "medium",
    source: "Travel Experts",
  },
  {
    id: "7",
    category: "Documentation",
    title: "Keep Copies of Important Documents",
    description:
      "Store digital and physical copies of your passport, visa, and travel insurance separately from the originals.",
    priority: "low",
    source: "Travel Experts",
  },
  {
    id: "8",
    category: "Health",
    title: "Know Local Emergency Numbers",
    description:
      "Save local emergency numbers in your phone. Know the location of the nearest hospital and your country's embassy.",
    priority: "high",
    source: "Local Authorities",
  },
]

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-[#ef4444] text-white"
    case "high":
      return "bg-[#f97316] text-white"
    case "medium":
      return "bg-[#eab308] text-white"
    case "low":
      return "bg-[#84cc16] text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "border-[#ef4444] text-[#ef4444]"
    case "medium":
      return "border-[#eab308] text-[#eab308]"
    case "low":
      return "border-[#84cc16] text-[#84cc16]"
    default:
      return "border-muted text-muted-foreground"
  }
}

export default function TipsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTips = safetyTips.filter(
    (tip) =>
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Safety Tips & Incidents</span>
            </div>
          </div>
          <Button variant="outline" asChild className="bg-transparent">
            <Link href="/emergency">Emergency</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tips or incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tips" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="tips">Safety Tips</TabsTrigger>
            <TabsTrigger value="incidents">Recent Incidents</TabsTrigger>
          </TabsList>

          {/* Safety Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tips</p>
                      <p className="text-2xl font-bold text-foreground">{safetyTips.length}</p>
                    </div>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">High Priority</p>
                      <p className="text-2xl font-bold text-foreground">
                        {safetyTips.filter((t) => t.priority === "high").length}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Categories</p>
                      <p className="text-2xl font-bold text-foreground">
                        {new Set(safetyTips.map((t) => t.category)).size}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredTips.map((tip) => (
                <Card key={tip.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">
                          {tip.category}
                        </Badge>
                        <CardTitle className="text-lg text-foreground">{tip.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className={getPriorityColor(tip.priority)}>
                        {tip.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>Source: {tip.source}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTips.length === 0 && (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No safety tips found matching your search.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Incidents</p>
                      <p className="text-2xl font-bold text-foreground">{incidents.length}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Last 24 Hours</p>
                      <p className="text-2xl font-bold text-foreground">
                        {incidents.filter((i) => i.date === "2025-01-08").length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">High Severity</p>
                      <p className="text-2xl font-bold text-foreground">
                        {incidents.filter((i) => i.severity === "high" || i.severity === "critical").length}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <Card key={incident.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                          <Badge variant="outline">{incident.type}</Badge>
                        </div>
                        <CardTitle className="text-lg text-foreground">{incident.type}</CardTitle>
                        <CardDescription className="mt-1">{incident.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(incident.date).toLocaleDateString()} at {incident.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Source: {incident.source}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIncidents.length === 0 && (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No incidents found matching your search.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
