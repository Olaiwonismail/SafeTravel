"use client"

import type { SafetyArea } from "@/app/map/page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Info, TrendingUp, TrendingDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type AreaDetailsProps = {
  area: SafetyArea
}

function getSafetyLevel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Very Safe", color: "bg-[#22c55e] text-white" }
  if (score >= 80) return { label: "Safe", color: "bg-[#84cc16] text-white" }
  if (score >= 70) return { label: "Moderate", color: "bg-[#eab308] text-white" }
  if (score >= 60) return { label: "Caution", color: "bg-[#f97316] text-white" }
  return { label: "High Risk", color: "bg-[#ef4444] text-white" }
}

export function AreaDetails({ area }: AreaDetailsProps) {
  const safetyLevel = getSafetyLevel(area.safetyScore)

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-foreground">{area.name}</CardTitle>
              <CardDescription className="mt-1">Safety Overview</CardDescription>
            </div>
            <Badge className={safetyLevel.color}>{safetyLevel.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Safety Score</span>
              <span className="text-2xl font-bold text-foreground">{area.safetyScore}/100</span>
            </div>
            <Progress value={area.safetyScore} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Recent Incidents</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">{area.incidents}</span>
              {area.incidents > 15 ? (
                <TrendingUp className="h-4 w-4 text-destructive" />
              ) : (
                <TrendingDown className="h-4 w-4 text-accent" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-lg text-foreground">Common Crimes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {area.commonCrimes.map((crime, index) => (
              <Badge key={index} variant="outline" className="border-destructive/50 text-destructive">
                {crime}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            <CardTitle className="text-lg text-foreground">Safety Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {area.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <Info className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-border bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground text-center">
            Data updated 2 hours ago • Based on verified reports from local authorities and travelers
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
