"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-xl">
            ReUseWrite
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/repurpose"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/repurpose" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Repurpose
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {pathname === "/" && (
            <Button asChild>
              <Link href="/repurpose">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
