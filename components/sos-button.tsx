"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Phone, MapPin, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function SOSButton() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isActivated, setIsActivated] = useState(false)

  const handleSOSClick = () => {
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    setIsActivated(true)
    // In a real app, this would:
    // 1. Get user's GPS location
    // 2. Send alert to emergency services
    // 3. Notify emergency contacts
    // 4. Start recording location updates
    console.log(" SOS activated - would send location and alert authorities")

    setTimeout(() => {
      setShowConfirm(false)
    }, 3000)
  }

  const handleCancel = () => {
    setShowConfirm(false)
    setTimeout(() => {
      setIsActivated(false)
    }, 300)
  }

  return (
    <>
      <Card className="border-destructive bg-destructive/5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Emergency SOS</CardTitle>
          <CardDescription>Press the button below if you need immediate assistance</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={handleSOSClick}
            disabled={isActivated}
            className="w-48 h-48 rounded-full text-2xl font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl transition-all"
          >
            {isActivated ? (
              <div className="flex flex-col items-center gap-2">
                <Check className="h-12 w-12" />
                <span className="text-base">Activated</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <AlertCircle className="h-12 w-12" />
                <span>SOS</span>
              </div>
            )}
          </Button>

          {isActivated && (
            <div className="text-center space-y-2 animate-in fade-in duration-500">
              <p className="text-sm font-medium text-foreground">Emergency alert sent!</p>
              <p className="text-xs text-muted-foreground">Authorities have been notified of your location</p>
            </div>
          )}

          <div className="w-full max-w-md space-y-3 text-sm text-muted-foreground">
            <p className="text-center font-medium text-foreground">When you press SOS:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
                <span>Emergency services will be contacted immediately</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
                <span>Your exact GPS location will be shared with authorities</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
                <span>Your emergency contacts will be notified</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-foreground">Confirm Emergency Alert</DialogTitle>
            <DialogDescription>
              Are you sure you want to activate the SOS alert? This will immediately contact emergency services and
              share your location.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
              <p className="text-sm text-foreground">
                Only use this feature if you are in immediate danger or need urgent assistance.
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCancel} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="bg-destructive hover:bg-destructive/90">
              Confirm SOS Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
