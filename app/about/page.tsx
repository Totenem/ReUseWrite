import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">About ReUseWrite</h1>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Empowering content creators to reach their audience across multiple platforms
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 mt-12">
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p className="text-muted-foreground">
                  To simplify content repurposing and help creators maximize their reach by transforming a single piece of content into platform-optimized posts.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h2 className="text-2xl font-semibold">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become the go-to platform for content creators looking to efficiently expand their presence across social media platforms.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h2 className="text-2xl font-semibold">What We Do</h2>
                <p className="text-muted-foreground">
                  We leverage advanced AI technology to analyze your content and generate platform-specific versions that resonate with each platform's unique audience and format requirements.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h2 className="text-2xl font-semibold">Why Choose Us</h2>
                <p className="text-muted-foreground">
                  Our tool saves you time and effort by automatically adapting your content for different platforms while maintaining your authentic voice and message.
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