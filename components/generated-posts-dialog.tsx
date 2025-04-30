"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Facebook, Twitter, Instagram, MessageSquare } from "lucide-react"
import { GroupedPosts } from "@/types/posts"

interface GeneratedPostsDialogProps {
  isOpen: boolean
  onClose: () => void
  posts: GroupedPosts
  ideaText: string
  tone: string
  enhancementLevel: string
}

export function GeneratedPostsDialog({
  isOpen,
  onClose,
  posts,
  ideaText,
  tone,
  enhancementLevel,
}: GeneratedPostsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generated Posts</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original Idea */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Original Idea</CardTitle>
              <p className="text-sm text-muted-foreground">
                Tone: {tone} | Enhancement Level: {enhancementLevel}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{decodeURIComponent(ideaText)}</p>
            </CardContent>
          </Card>

          {/* Generated Posts */}
          <div className="space-y-4">
            {/* Facebook Posts */}
            {posts.facebook_posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Facebook className="h-5 w-5" />
                  <CardTitle className="text-sm">Facebook</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => navigator.clipboard.writeText(post.generated_text)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.generated_text}</p>
                </CardContent>
              </Card>
            ))}

            {/* Twitter Posts */}
            {posts.twitter_posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Twitter className="h-5 w-5" />
                  <CardTitle className="text-sm">Twitter</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => navigator.clipboard.writeText(post.generated_text)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.generated_text}</p>
                </CardContent>
              </Card>
            ))}

            {/* Instagram Posts */}
            {posts.instagram_posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Instagram className="h-5 w-5" />
                  <CardTitle className="text-sm">Instagram</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => navigator.clipboard.writeText(post.generated_text)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.generated_text}</p>
                </CardContent>
              </Card>
            ))}

            {/* Reddit Posts */}
            {posts.reddit_posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <CardTitle className="text-sm">Reddit</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => navigator.clipboard.writeText(post.generated_text)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.generated_text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}