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
