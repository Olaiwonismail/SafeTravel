"use client"

import { useEffect, useRef, useState } from "react"
import type { SafetyArea } from "@/app/map/page"

type SafetyMapProps = {
  areas: SafetyArea[]
  onAreaSelect: (area: SafetyArea) => void
  selectedArea: SafetyArea | null
}

function getSafetyColor(score: number): string {
  if (score >= 90) return "#22c55e"
  if (score >= 80) return "#84cc16"
  if (score >= 70) return "#eab308"
  if (score >= 60) return "#f97316"
  return "#ef4444"
}

export function SafetyMap({ areas, onAreaSelect, selectedArea }: SafetyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const loadLeaflet = async () => {
      const L = (await import("leaflet")).default

      // Load Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize map centered on New York (Times Square area)
        const map = L.map(mapRef.current).setView([40.7589, -73.9851], 14)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map)

        mapInstanceRef.current = map

        // Add markers for each area
        areas.forEach((area) => {
          const color = getSafetyColor(area.safetyScore)

          // Create custom icon with safety score
          const icon = L.divIcon({
            className: "custom-marker",
            html: `
              <div style="position: relative;">
                <div style="
                  position: absolute;
                  width: 60px;
                  height: 60px;
                  background: ${color};
                  border-radius: 50%;
                  opacity: 0.3;
                  filter: blur(15px);
                  transform: translate(-50%, -50%);
                  top: 50%;
                  left: 50%;
                "></div>
                <div style="
                  position: relative;
                  width: 40px;
                  height: 40px;
                  background: ${color};
                  border: 3px solid white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: 12px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  cursor: pointer;
                  transition: transform 0.2s;
                ">${area.safetyScore}</div>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          })

          const marker = L.marker([area.lat, area.lng], { icon })
            .addTo(map)
            .bindPopup(
              `<div style="font-family: system-ui; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${area.name}</h3>
                <p style="margin: 4px 0; font-size: 14px;"><strong>Safety Score:</strong> ${area.safetyScore}/100</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>Incidents:</strong> ${area.incidents}</p>
                <p style="margin: 4px 0; font-size: 12px; color: #666;">Click marker for details</p>
              </div>`,
            )
            .on("click", () => {
              onAreaSelect(area)
            })

          markersRef.current.push({ marker, area })
        })

        setIsLoaded(true)
      }
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [areas])

  useEffect(() => {
    if (!isLoaded) return

    markersRef.current.forEach(({ marker, area }) => {
      const isSelected = selectedArea?.id === area.id
      const color = getSafetyColor(area.safetyScore)

      const icon = (window as any).L.divIcon({
        className: "custom-marker",
        html: `
          <div style="position: relative;">
            <div style="
              position: absolute;
              width: ${isSelected ? "80px" : "60px"};
              height: ${isSelected ? "80px" : "60px"};
              background: ${color};
              border-radius: 50%;
              opacity: ${isSelected ? "0.5" : "0.3"};
              filter: blur(15px);
              transform: translate(-50%, -50%);
              top: 50%;
              left: 50%;
              transition: all 0.3s;
            "></div>
            <div style="
              position: relative;
              width: ${isSelected ? "48px" : "40px"};
              height: ${isSelected ? "48px" : "40px"};
              background: ${color};
              border: ${isSelected ? "4px" : "3px"} solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: ${isSelected ? "14px" : "12px"};
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              cursor: pointer;
              transition: all 0.3s;
              transform: scale(${isSelected ? "1.1" : "1"});
            ">${area.safetyScore}</div>
          </div>
        `,
        iconSize: [isSelected ? 48 : 40, isSelected ? 48 : 40],
        iconAnchor: [isSelected ? 24 : 20, isSelected ? 24 : 20],
      })

      marker.setIcon(icon)
    })
  }, [selectedArea, isLoaded])

  return (
    <div className="relative w-full h-[600px] bg-muted/30 rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
