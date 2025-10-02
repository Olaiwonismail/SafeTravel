import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, ArrowLeft } from "lucide-react"

export default function PoliceReportPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SafeTravel</span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Law Enforcement Portal</h1>
          <p className="text-muted-foreground">
            Submit official incident reports and safety alerts to help keep travelers informed and safe
          </p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Submit Incident Report</CardTitle>
            <CardDescription>
              This form is for verified law enforcement personnel only. All submissions are reviewed before publication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="officer-name">Officer Name</Label>
                  <Input id="officer-name" placeholder="Full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge-number">Badge Number</Label>
                  <Input id="badge-number" placeholder="Badge ID" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Police department" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Email</Label>
                  <Input id="contact" type="email" placeholder="official@department.gov" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incident-type">Incident Type</Label>
                <Select>
                  <SelectTrigger id="incident-type">
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft / Pickpocketing</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="scam">Tourist Scam</SelectItem>
                    <SelectItem value="vandalism">Vandalism</SelectItem>
                    <SelectItem value="traffic">Traffic Incident</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Incident Location</Label>
                <Input id="location" placeholder="Street address or area name" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date of Incident</Label>
                  <Input id="date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time of Incident</Label>
                  <Input id="time" type="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level</Label>
                <Select>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Minor incident</SelectItem>
                    <SelectItem value="medium">Medium - Moderate concern</SelectItem>
                    <SelectItem value="high">High - Serious incident</SelectItem>
                    <SelectItem value="critical">Critical - Immediate danger</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Incident Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the incident, including any relevant context for travelers..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="safety-advice">Safety Advice for Travelers</Label>
                <Textarea
                  id="safety-advice"
                  placeholder="What precautions should travelers take in this area? Any specific advice?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="case-number">Case Number (Optional)</Label>
                <Input id="case-number" placeholder="Official case reference number" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1">
                  Submit Report
                </Button>
                <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this report, you confirm that you are an authorized law enforcement officer and that the
                information provided is accurate and official.
              </p>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border mt-8 bg-muted/50">
          <CardContent className="py-6">
            <h3 className="font-semibold text-foreground mb-2">Important Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• All reports are verified before being published to the platform</li>
              <li>• Reports help travelers make informed decisions about their safety</li>
              <li>• Personal information of victims is never shared publicly</li>
              <li>• For urgent matters, please use official emergency channels</li>
              <li>• Contact support@safetravel.com for technical assistance</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
