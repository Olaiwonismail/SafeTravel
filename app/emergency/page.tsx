"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  ArrowLeft,
  Phone,
  MapPin,
  Hospital,
  Building2,
  Languages,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react"
import { SOSButton } from "@/components/sos-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type EmergencyContact = {
  id: string
  name: string
  number: string
  type: "police" | "medical" | "fire" | "embassy" | "other"
  available: string
  description: string
}

type Translation = {
  id: string
  english: string
  local: string
  pronunciation: string
  category: string
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Emergency Services (Police)",
    number: "911",
    type: "police",
    available: "24/7",
    description: "For immediate police assistance, crimes in progress, or urgent safety concerns",
  },
  {
    id: "2",
    name: "Medical Emergency / Ambulance",
    number: "911",
    type: "medical",
    available: "24/7",
    description: "For medical emergencies, accidents, or urgent health issues requiring immediate attention",
  },
  {
    id: "3",
    name: "Fire Department",
    number: "911",
    type: "fire",
    available: "24/7",
    description: "For fires, gas leaks, or other emergency situations requiring fire services",
  },
  {
    id: "4",
    name: "Tourist Police Hotline",
    number: "+1-555-TOURIST",
    type: "police",
    available: "24/7",
    description: "Specialized police unit for tourist-related issues, multilingual support available",
  },
  {
    id: "5",
    name: "US Embassy",
    number: "+1-555-0100",
    type: "embassy",
    available: "Mon-Fri 9AM-5PM",
    description: "For US citizens: passport issues, legal assistance, emergency services",
  },
  {
    id: "6",
    name: "UK Embassy",
    number: "+1-555-0200",
    type: "embassy",
    available: "Mon-Fri 9AM-5PM",
    description: "For UK citizens: consular services, emergency assistance, document support",
  },
  {
    id: "7",
    name: "Central Hospital Emergency",
    number: "+1-555-HOSPITAL",
    type: "medical",
    available: "24/7",
    description: "Main city hospital with English-speaking staff and tourist medical services",
  },
  {
    id: "8",
    name: "Poison Control Center",
    number: "1-800-222-1222",
    type: "medical",
    available: "24/7",
    description: "For poisoning emergencies, drug overdoses, or toxic substance exposure",
  },
]

const translations: Translation[] = [
  {
    id: "1",
    english: "Help!",
    local: "¡Ayuda!",
    pronunciation: "ah-YOO-dah",
    category: "Emergency",
  },
  {
    id: "2",
    english: "I need a doctor",
    local: "Necesito un médico",
    pronunciation: "neh-seh-SEE-toh oon MEH-dee-koh",
    category: "Medical",
  },
  {
    id: "3",
    english: "Call the police",
    local: "Llame a la policía",
    pronunciation: "YAH-meh ah lah poh-lee-SEE-ah",
    category: "Emergency",
  },
  {
    id: "4",
    english: "Where is the hospital?",
    local: "¿Dónde está el hospital?",
    pronunciation: "DOHN-deh ehs-TAH ehl ohs-pee-TAHL",
    category: "Medical",
  },
  {
    id: "5",
    english: "I've been robbed",
    local: "Me han robado",
    pronunciation: "meh ahn roh-BAH-doh",
    category: "Emergency",
  },
  {
    id: "6",
    english: "I'm lost",
    local: "Estoy perdido/a",
    pronunciation: "ehs-TOY pehr-DEE-doh/dah",
    category: "General",
  },
  {
    id: "7",
    english: "I don't understand",
    local: "No entiendo",
    pronunciation: "noh ehn-tee-EHN-doh",
    category: "General",
  },
  {
    id: "8",
    english: "Do you speak English?",
    local: "¿Habla inglés?",
    pronunciation: "AH-blah een-GLEHS",
    category: "General",
  },
  {
    id: "9",
    english: "I need help",
    local: "Necesito ayuda",
    pronunciation: "neh-seh-SEE-toh ah-YOO-dah",
    category: "Emergency",
  },
  {
    id: "10",
    english: "Emergency!",
    local: "¡Emergencia!",
    pronunciation: "eh-mehr-HEHN-see-ah",
    category: "Emergency",
  },
]

function getContactIcon(type: string) {
  switch (type) {
    case "police":
      return <Shield className="h-5 w-5" />
    case "medical":
      return <Hospital className="h-5 w-5" />
    case "fire":
      return <AlertCircle className="h-5 w-5" />
    case "embassy":
      return <Building2 className="h-5 w-5" />
    default:
      return <Phone className="h-5 w-5" />
  }
}

function getContactColor(type: string) {
  switch (type) {
    case "police":
      return "text-primary"
    case "medical":
      return "text-destructive"
    case "fire":
      return "text-[#f97316]"
    case "embassy":
      return "text-accent"
    default:
      return "text-muted-foreground"
  }
}

export default function EmergencyPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredContacts = emergencyContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTranslations = translations.filter(
    (translation) =>
      translation.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.local.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.category.toLowerCase().includes(searchQuery.toLowerCase()),
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
              <AlertCircle className="h-6 w-6 text-destructive" />
              <span className="text-lg font-bold text-foreground">Emergency</span>
            </div>
          </div>
          <Button variant="outline" asChild className="bg-transparent">
            <Link href="/map">Safety Map</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* SOS Alert */}
        <Alert className="mb-6 border-destructive bg-destructive/10">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <AlertTitle className="text-destructive">Emergency Assistance</AlertTitle>
          <AlertDescription className="text-foreground">
            In case of immediate danger, use the SOS button below to alert authorities and share your location.
          </AlertDescription>
        </Alert>

        {/* SOS Button */}
        <div className="mb-8">
          <SOSButton />
        </div>

        {/* Current Location */}
        <Card className="border-border mb-6">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Your Current Location</p>
                <p className="text-sm text-muted-foreground">Demo City Center, Main Street</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="translation">Translation</TabsTrigger>
          </TabsList>

          {/* Emergency Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`mt-1 ${getContactColor(contact.type)}`}>{getContactIcon(contact.type)}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground mb-1">{contact.name}</CardTitle>
                          <CardDescription>{contact.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-accent text-accent">
                        {contact.available}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Button asChild className="flex-1" size="lg">
                        <a href={`tel:${contact.number}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call {contact.number}
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => copyToClipboard(contact.number, contact.id)}
                        className="bg-transparent"
                      >
                        {copiedId === contact.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredContacts.length === 0 && (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No emergency contacts found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Translation Tab */}
          <TabsContent value="translation" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Emergency Phrases</CardTitle>
                </div>
                <CardDescription>
                  Essential phrases in the local language to help you communicate in emergency situations
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {filteredTranslations.map((translation) => (
                <Card key={translation.id} className="border-border">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{translation.category}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">English</p>
                            <p className="text-base font-medium text-foreground">{translation.english}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Local Language</p>
                            <p className="text-lg font-semibold text-foreground">{translation.local}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pronunciation</p>
                            <p className="text-sm text-accent italic">{translation.pronunciation}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(translation.local, translation.id)}
                        className="bg-transparent flex-shrink-0"
                      >
                        {copiedId === translation.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTranslations.length === 0 && (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No translations found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Important Notice */}
        <Card className="border-border mt-8 bg-muted/50">
          <CardContent className="py-6">
            <h3 className="font-semibold text-foreground mb-3">Important Safety Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Always call local emergency services (911) for immediate life-threatening situations</li>
              <li>• Keep your phone charged and have a backup power bank when traveling</li>
              <li>• Save important numbers in your phone contacts before you need them</li>
              <li>• Know your exact location or nearby landmarks when calling for help</li>
              <li>• Contact your embassy for non-emergency consular assistance</li>
              <li>• Keep a copy of emergency phrases written down in case your phone is unavailable</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
