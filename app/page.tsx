import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                <a
                  href="https://www.producthunt.com/posts/reusewrite?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-reusewrite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=958516&theme=dark&t=1746104350485"
                    alt="ReUseWrite - Repurpose Your Thoughts, Reach Every Platform | Product Hunt"
                    width="250"
                    height="54"
                    style={{ width: '200px', height: '54px', marginBottom: '10px' }}
                  />
                </a>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Repurpose Your Content Across Platforms
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Transform your ideas into platform-specific content for Twitter, Instagram, Facebook, and Reddit
                    with just one click.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                      <Twitter className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Twitter</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Craft engaging tweets with hashtags and emojis
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                      <Instagram className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Instagram</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Create captivating captions for your posts
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                      <Facebook className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Facebook</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Generate engaging posts for your audience
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="9" r="3" />
                        <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Reddit</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Craft posts that resonate with Reddit communities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">How It Works</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our tool makes content repurposing simple and efficient
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 xl:gap-10 mt-8">
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 md:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold">Enter Your Content</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Type or paste your content idea (up to 1000 characters)
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 md:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold">Generate Content</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Click the button and let our AI create platform-specific posts
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 md:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold">Copy & Use</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Copy the generated content and use it on your preferred platforms
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
