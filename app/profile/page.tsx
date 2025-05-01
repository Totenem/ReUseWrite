"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GeneratedPostsDialog } from "@/components/generated-posts-dialog"
import { Idea, GroupedPosts } from "@/types/posts"

interface User {
  id: string
  email: string
  username: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [generatedPosts, setGeneratedPosts] = useState<Record<string, GroupedPosts>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [openDialogId, setOpenDialogId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        console.log('Parsed user:', parsedUser) // Log parsed user data
        
        // Fetch user's ideas
        fetch(`https://repuposing-tool-backend.vercel.app/ideas/${parsedUser.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data)) {
              console.log('Fetched ideas:', data) // Log fetched ideas
              setIdeas(data)
              // Fetch generated posts for each idea
              return Promise.all(
                data.map(idea =>
                  fetch(`https://repuposing-tool-backend.vercel.app/generated_posts/${idea.id}`, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                  }).then(response => response.json())
                    .then(postsData => {
                      // console.log(`Generated posts for idea ${idea.id}:`, postsData) // Log posts data for each idea
                      return { ideaId: idea.id, posts: postsData }
                    })
                )
              )
            }
            return []
          })
          .then(allPosts => {
            console.log('All posts before mapping:', allPosts) // Log all posts before processing
            const postsMap = allPosts.reduce<Record<string, GroupedPosts>>((acc, { ideaId, posts }) => {
              // Check if posts is already in the correct format
              if (posts && typeof posts === 'object' && !Array.isArray(posts)) {
                acc[ideaId] = {
                  facebook_posts: posts.facebook_posts || [],
                  twitter_posts: posts.twitter_posts || [],
                  instagram_posts: posts.instagram_posts || [],
                  reddit_posts: posts.reddit_posts || []
                }
              } else {
                // Fallback to array processing if needed
                const postsArray = Array.isArray(posts) ? posts : [];
                acc[ideaId] = {
                  facebook_posts: postsArray.filter(post => post.platform === 'facebook'),
                  twitter_posts: postsArray.filter(post => post.platform === 'twitter'),
                  instagram_posts: postsArray.filter(post => post.platform === 'instagram'),
                  reddit_posts: postsArray.filter(post => post.platform === 'reddit')
                }
              }
              return acc
            }, {})
            console.log('Final posts map:', postsMap) // Log final processed posts
            setGeneratedPosts(postsMap)
          })
          .catch(error => {
            console.error('Error fetching data:', error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } catch (error) {
        console.error("Error parsing user data from localStorage", error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center">
            <p>Loading profile...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Username</p>
                  <p className="text-lg">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Account status</p>
                  <p className="text-lg">FREE</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {/* <Button className="w-full bg-green-500 hover:bg-green-600">
                  Upgrade to pro
                </Button> */}
                <Button onClick={handleLogout} className="w-full" variant="destructive">
                  Log out account
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* History Section */}
          <div className="md:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Your ideas and generated posts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 max-h-[600px] overflow-y-auto pr-4">
                {ideas.length === 0 ? (
                  <p className="text-center text-muted-foreground">No ideas found. Start creating some!</p>
                ) : (
                  ideas.map((idea) => (
                    <div key={idea.id}>
                      <Card 
                        className="border-2 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => setOpenDialogId(idea.id)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">Original Idea</CardTitle>
                          <CardDescription>
                            Tone: {idea.tone} | Enhancement Level: {idea.level_of_ench}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-4">{decodeURIComponent(idea.raw_text)}</p>
                          {idea.image_url && (
                            <img src={idea.image_url} alt="Idea image" className="rounded-md max-w-full h-auto" />
                          )}
                          <p className="text-sm text-muted-foreground mt-4">
                            Click to view generated posts
                          </p>
                        </CardContent>
                      </Card>

                      {generatedPosts[idea.id] && (
                        <GeneratedPostsDialog
                          isOpen={openDialogId === idea.id}
                          onClose={() => setOpenDialogId(null)}
                          posts={generatedPosts[idea.id]}
                          ideaText={idea.raw_text}
                          tone={idea.tone}
                          enhancementLevel={idea.level_of_ench}
                        />
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
