import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MapPin, AlertTriangle, Phone, Languages, Bell } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SafeTravel</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/map" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Safety Map
            </Link>
            <Link href="/tips" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Safety Tips
            </Link>
            <Link href="/emergency" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Emergency
            </Link>
          </nav>
          <Button asChild>
            <Link href="/map">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Travel Safely with Real-Time Local Intelligence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Access verified safety data from local authorities, experienced travelers, and verified locals. Stay
            informed with area-specific tips, incident reports, and emergency resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <Link href="/map">Explore Safety Map</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
              <Link href="/tips">View Safety Tips</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border">
            <CardHeader>
              <MapPin className="h-10 w-10 text-accent mb-4" />
              <CardTitle className="text-foreground">Interactive Safety Map</CardTitle>
              <CardDescription>
                Color-coded heatmap showing real-time safety scores for different areas based on verified data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
              <CardTitle className="text-foreground">Incident Reports</CardTitle>
              <CardDescription>
                View reported incidents and common crimes in specific areas to stay informed and prepared
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Area-Specific Tips</CardTitle>
              <CardDescription>
                Get practical safety advice tailored to your location from verified locals and authorities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <Phone className="h-10 w-10 text-accent mb-4" />
              <CardTitle className="text-foreground">Emergency Contacts</CardTitle>
              <CardDescription>
                Quick access to local emergency numbers, embassies, and essential services
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <Languages className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Translation Support</CardTitle>
              <CardDescription>
                Communicate effectively with built-in translation for emergency phrases and common situations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <Bell className="h-10 w-10 text-destructive mb-4" />
              <CardTitle className="text-foreground">SOS Button</CardTitle>
              <CardDescription>
                One-tap emergency alert system to quickly contact authorities and share your location
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 text-balance">
            How SafeTravel Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Check Your Location</h3>
                <p className="text-muted-foreground">
                  View the interactive safety map to see color-coded safety scores for different areas in real-time
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Get Informed</h3>
                <p className="text-muted-foreground">
                  Access area-specific safety tips, incident reports, and practical advice from verified sources
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Stay Safe</h3>
                <p className="text-muted-foreground">
                  Use emergency contacts, translation tools, and the SOS button for quick help when needed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-border bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl text-foreground mb-4">Trusted Data Sources</CardTitle>
            <CardDescription className="text-base max-w-2xl mx-auto">
              Our platform aggregates safety information from multiple verified sources to provide you with the most
              accurate and up-to-date intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 mt-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Local Authorities</h4>
                <p className="text-sm text-muted-foreground">
                  Official crime statistics and safety alerts from police departments
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Verified Locals</h4>
                <p className="text-sm text-muted-foreground">Insights and tips from residents who know the area best</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Past Travelers</h4>
                <p className="text-sm text-muted-foreground">
                  Real experiences and safety reports from fellow tourists
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Police Report Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-border bg-muted/50">
          <CardContent className="py-12">
            <div className="max-w-2xl mx-auto text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">For Law Enforcement</h3>
              <p className="text-muted-foreground mb-6">
                Are you a law enforcement officer? Help keep travelers safe by submitting official incident reports and
                safety alerts directly to our platform.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link href="/police-report">Submit Police Report</Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Secure portal for verified law enforcement personnel only
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground">SafeTravel</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering tourists with real-time safety intelligence for safer travels worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/map" className="hover:text-foreground transition-colors">
                    Safety Map
                  </Link>
                </li>
                <li>
                  <Link href="/tips" className="hover:text-foreground transition-colors">
                    Safety Tips
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-foreground transition-colors">
                    Emergency
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/police-report" className="hover:text-foreground transition-colors">
                    Police Portal
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 SafeTravel. Demo platform with mock data for demonstration purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
