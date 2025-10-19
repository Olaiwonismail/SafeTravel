"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, MapPin, AlertTriangle, Info, Plus } from "lucide-react"
import { SafetyMap } from "@/components/safety-map"
import { AreaDetails } from "@/components/area-details"
import { ReportIncidentDialog } from "@/components/report-incident-dialog"

export type SafetyArea = {
  id: string
  name: string
  safetyScore: number
  lat: number
  lng: number
  incidents: number
  commonCrimes: string[]
  tips: string[]
}

// Mock data for demonstration
// Mock data for demonstration
const safetyAreas: SafetyArea[] = [
  {
    id: "downtown",
    name: "Downtown District",
    safetyScore: 85,
    lat: 40.7589,
    lng: -73.9851,
    incidents: 12,
    commonCrimes: ["Pickpocketing", "Tourist scams"],
    tips: ["Keep valuables secure", "Stay in well-lit areas", "Use official taxis"],
  },
  {
    id: "tourist-zone",
    name: "Tourist Zone",
    safetyScore: 92,
    lat: 40.7614,
    lng: -73.9776,
    incidents: 5,
    commonCrimes: ["Minor theft"],
    tips: ["Very safe area", "Police presence high", "Tourist-friendly"],
  },
  {
    id: "market-area",
    name: "Market District",
    safetyScore: 78,
    lat: 40.7549,
    lng: -73.984,
    incidents: 18,
    commonCrimes: ["Pickpocketing", "Bag snatching", "Overcharging"],
    tips: ["Watch your belongings", "Negotiate prices", "Avoid displaying expensive items"],
  },
  {
    id: "residential",
    name: "Residential Area",
    safetyScore: 88,
    lat: 40.7639,
    lng: -73.9808,
    incidents: 8,
    commonCrimes: ["Minor vandalism"],
    tips: ["Generally safe", "Quiet at night", "Respect local residents"],
  },
  {
    id: "nightlife",
    name: "Nightlife District",
    safetyScore: 72,
    lat: 40.7569,
    lng: -73.9903,
    incidents: 25,
    commonCrimes: ["Theft", "Assault", "Drink spiking"],
    tips: ["Stay in groups", "Watch your drinks", "Use licensed venues only"],
  },
  {
    id: "station",
    name: "Central Station",
    safetyScore: 80,
    lat: 40.7527,
    lng: -73.9772,
    incidents: 15,
    commonCrimes: ["Pickpocketing", "Luggage theft"],
    tips: ["Keep luggage close", "Be aware of surroundings", "Use official transport"],
  },
  // New additional areas
  {
    id: "university",
    name: "University Campus",
    safetyScore: 90,
    lat: 40.7505,
    lng: -73.9934,
    incidents: 6,
    commonCrimes: ["Bike theft", "Phone snatching"],
    tips: ["Use bike locks", "Campus security available 24/7", "Emergency phones throughout campus"],
  },
  {
    id: "park",
    name: "Central Park",
    safetyScore: 82,
    lat: 40.7829,
    lng: -73.9654,
    incidents: 10,
    commonCrimes: ["Theft from vehicles", "Mugging in isolated areas"],
    tips: ["Stay on main paths", "Avoid after dark", "Keep valuables hidden"],
  },
  {
    id: "shopping-mall",
    name: "Shopping Mall Area",
    safetyScore: 87,
    lat: 40.7685,
    lng: -73.9826,
    incidents: 7,
    commonCrimes: ["Shoplifting", "Purse snatching"],
    tips: ["Watch your bags", "Security cameras present", "Report suspicious activity"],
  },
  {
    id: "industrial",
    name: "Industrial Zone",
    safetyScore: 65,
    lat: 40.7420,
    lng: -74.0060,
    incidents: 22,
    commonCrimes: ["Vandalism", "Breaking and entering", "Theft of equipment"],
    tips: ["Avoid at night", "Travel in groups", "Well-lit areas only"],
  },
  {
    id: "waterfront",
    name: "Waterfront District",
    safetyScore: 88,
    lat: 40.7474,
    lng: -74.0041,
    incidents: 8,
    commonCrimes: ["Minor theft", "Public intoxication"],
    tips: ["Popular tourist area", "Police patrol regularly", "Stay in crowded areas"],
  },
  {
    id: "suburban-east",
    name: "East Suburbs",
    safetyScore: 94,
    lat: 40.7352,
    lng: -73.9554,
    incidents: 3,
    commonCrimes: ["Package theft", "Car break-ins"],
    tips: ["Very safe residential area", "Neighborhood watch active", "Low crime rate"],
  },
  {
    id: "suburban-west",
    name: "West Suburbs",
    safetyScore: 91,
    lat: 40.7789,
    lng: -74.0256,
    incidents: 4,
    commonCrimes: ["Petty theft", "Vandalism"],
    tips: ["Family-friendly area", "Good lighting at night", "Community patrols"],
  },
  {
    id: "financial-district",
    name: "Financial District",
    safetyScore: 89,
    lat: 40.7074,
    lng: -74.0113,
    incidents: 9,
    commonCrimes: ["Business theft", "Fraud", "Corporate espionage"],
    tips: ["Secure your documents", "Be aware during business hours", "High security presence"],
  },
  {
    id: "entertainment",
    name: "Entertainment Quarter",
    safetyScore: 79,
    lat: 40.7571,
    lng: -73.9859,
    incidents: 20,
    commonCrimes: ["Pickpocketing", "Ticket scams", "Overpriced services"],
    tips: ["Buy tickets from official sources", "Keep wallets in front pockets", "Be cautious of street vendors"],
  },
  {
    id: "hospital-area",
    name: "Medical District",
    safetyScore: 86,
    lat: 40.7414,
    lng: -73.9756,
    incidents: 11,
    commonCrimes: ["Theft from cars", "Scams targeting patients"],
    tips: ["Use hospital parking", "Security available 24/7", "Well-lit pathways"],
  },
  {
    id: "stadium",
    name: "Sports Stadium Area",
    safetyScore: 83,
    lat: 40.7505,
    lng: -73.9934,
    incidents: 14,
    commonCrimes: ["Theft during events", "Public disorder", "Counterfeit tickets"],
    tips: ["Arrive early", "Use designated parking", "Stay with your group"],
  },
  {
    id: "arts-district",
    name: "Arts District",
    safetyScore: 84,
    lat: 40.7486,
    lng: -73.9840,
    incidents: 9,
    commonCrimes: ["Art theft", "Vandalism", "Street harassment"],
    tips: ["Gallery security present", "Be aware in alleys", "Well-patrolled main streets"],
  },
  {
    id: "transport-hub",
    name: "Transport Hub",
    safetyScore: 77,
    lat: 40.7528,
    lng: -73.9772,
    incidents: 19,
    commonCrimes: ["Bag snatching", "Ticket fraud", "Distraction theft"],
    tips: ["Keep bags zipped", "Buy tickets from machines", "Be aware of crowded areas"],
  },
  {
    id: "historic",
    name: "Historic District",
    safetyScore: 88,
    lat: 40.7826,
    lng: -73.9656,
    incidents: 7,
    commonCrimes: ["Tourist scams", "Overpriced souvenirs"],
    tips: ["Guided tours available", "Police presence high", "Stick to main attractions"],
  }
]
 
export default function MapPage() {
  const [selectedArea, setSelectedArea] = useState<SafetyArea | null>(null)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

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
              <span className="text-lg font-bold text-foreground">Safety Map</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsReportDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Report Incident
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/emergency">Emergency</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Legend */}
        <Card className="border-border mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Safety Score Legend</CardTitle>
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#22c55e]" />
                <span className="text-sm text-foreground">90-100: Very Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#84cc16]" />
                <span className="text-sm text-foreground">80-89: Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#eab308]" />
                <span className="text-sm text-foreground">70-79: Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#f97316]" />
                <span className="text-sm text-foreground">60-69: Caution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#ef4444]" />
                <span className="text-sm text-foreground">Below 60: High Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardContent className="p-0">
                <SafetyMap areas={safetyAreas} onAreaSelect={setSelectedArea} selectedArea={selectedArea} />
              </CardContent>
            </Card>
          </div>

          {/* Area Details */}
          <div className="lg:col-span-1">
            {selectedArea ? (
              <AreaDetails area={selectedArea} />
            ) : (
              <Card className="border-border">
                <CardHeader>
                  <MapPin className="h-10 w-10 text-muted-foreground mb-2" />
                  <CardTitle className="text-foreground">Select an Area</CardTitle>
                  <CardDescription>Click on any area on the map to view detailed safety information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">You'll see:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 mt-0.5 text-primary" />
                        <span>Safety score and risk level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 mt-0.5 text-destructive" />
                        <span>Recent incidents and common crimes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 mt-0.5 text-accent" />
                        <span>Area-specific safety tips</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Areas</p>
                  <p className="text-2xl font-bold text-foreground">{safetyAreas.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Safety Score</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(safetyAreas.reduce((acc, area) => acc + area.safetyScore, 0) / safetyAreas.length)}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Incidents</p>
                  <p className="text-2xl font-bold text-foreground">
                    {safetyAreas.reduce((acc, area) => acc + area.incidents, 0)}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Report Incident Dialog */}
      <ReportIncidentDialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen} />
    </div>
  )
}
