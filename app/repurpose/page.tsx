"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Facebook, Instagram, Loader2, Twitter, Laugh, ThumbsUp, Book} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { METHODS } from "http"

type PlatformResult = {
  twitter_result: string
  instagram_result: string
  facebook_result: string
  reddit_result: string
}

export default function RepurposePage() {
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<PlatformResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tone, setTone] = useState("casual")
  const [emojis, setEmojis] = useState("low")
  const [enhancements, setEnhancements] = useState("low")
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    // Reset error when user starts typing again
    if (error) setError(null)
  }

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setError("Please enter some content to repurpose")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Encode the text for URL
      const encodedText = encodeURIComponent(inputText.trim())
      const response = await fetch(`https://repuposing-tool-backend.vercel.app/results/${encodedText}/${tone}/${enhancements}`, {method: "POST"})
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setResults(null)
      } else {
        setResults(data)
      }
    } catch (err) {
      setError("Failed to generate content. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${platform} content copied to clipboard`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Content Repurposing Tool</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Your Content</CardTitle>
              <CardDescription>Type or paste your content idea below (1000 characters max)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your content idea here..."
                className="min-h-[120px]"
                value={inputText}
                onChange={handleInputChange}
                maxLength={1000}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{error && <p className="text-destructive">{error}</p>}</span>
                <span>{inputText.length}/1000</span>
              </div>
                <div className="space-y-4 mt-4">
                  {/* Tone Buttons */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Tone</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={tone === "casual" ? "default" : "outline"}
                        onClick={() => setTone("casual")}
                        className="flex items-center gap-2"
                      > 
                        <ThumbsUp className="h-4 w-4" />
                        Casual
                      </Button>
                      <Button 
                        variant={tone === "funny" ? "default" : "outline"}
                        onClick={() => setTone("funny")}
                        className="flex items-center gap-2"
                      > 
                        <Laugh className="h-4 w-4" />
                        Funny
                      </Button>
                      <Button
                        variant={tone === "professional" ? "default" : "outline"}
                        onClick={() => setTone("professional")}
                        className="flex items-center gap-2"
                      > 
                        <Book className="h-4 w-4" />
                        Professional 
                      </Button>
                    </div>
                  </div>

                  {/* Amount of Enhancements */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Enhancement Level</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={enhancements === "low" ? "default" : "outline"}
                        onClick={() => setEnhancements("low")}
                      > 
                        Low 
                      </Button>
                      <Button
                        variant={enhancements === "medium" ? "default" : "outline"}
                        onClick={() => setEnhancements("medium")}
                      >
                        Medium
                      </Button>
                      <Button
                        variant={enhancements === "high" ? "default" : "outline"}
                        onClick={() => setEnhancements("high")}
                      >
                        High
                      </Button>
                    </div>
                  </div>
                </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={isLoading || inputText.length === 0} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Content"
                )}
              </Button>
            </CardFooter>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>Your content repurposed for different platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="twitter" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="twitter">Twitter</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram</TabsTrigger>
                    <TabsTrigger value="facebook">Facebook</TabsTrigger>
                    <TabsTrigger value="reddit">Reddit</TabsTrigger>
                  </TabsList>

                  <TabsContent value="twitter">
                    <ResultCard
                      title="Twitter Post"
                      icon={<Twitter className="h-5 w-5" />}
                      content={results.twitter_result}
                      onCopy={() => copyToClipboard(results.twitter_result, "Twitter")}
                    />
                  </TabsContent>

                  <TabsContent value="instagram">
                    <ResultCard
                      title="Instagram Caption"
                      icon={<Instagram className="h-5 w-5" />}
                      content={results.instagram_result}
                      onCopy={() => copyToClipboard(results.instagram_result, "Instagram")}
                    />
                  </TabsContent>

                  <TabsContent value="facebook">
                    <ResultCard
                      title="Facebook Post"
                      icon={<Facebook className="h-5 w-5" />}
                      content={results.facebook_result}
                      onCopy={() => copyToClipboard(results.facebook_result, "Facebook")}
                    />
                  </TabsContent>

                  <TabsContent value="reddit">
                    <ResultCard
                      title="Reddit Post"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="9" r="3" />
                          <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
                        </svg>
                      }
                      content={results.reddit_result}
                      onCopy={() => copyToClipboard(results.reddit_result, "Reddit")}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 ReUseWrite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

interface ResultCardProps {
  title: string
  icon: React.ReactNode
  content: string
  onCopy: () => void
}

function ResultCard({ title, icon, content, onCopy }: ResultCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap rounded-md bg-muted p-4">{content}</div>
      </CardContent>
    </Card>
  )
}
