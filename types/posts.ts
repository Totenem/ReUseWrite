export interface GeneratedPost {
  id: string
  idea_id: string
  platform: string
  generated_text: string
  created_at: string
}

export interface GroupedPosts {
  twitter_posts: GeneratedPost[]
  instagram_posts: GeneratedPost[]
  facebook_posts: GeneratedPost[]
  reddit_posts: GeneratedPost[]
}

export interface Idea {
  id: string
  user_id: string
  raw_text: string
  image_url: string | null
  created_at: string
  level_of_ench: string
  tone: string
}