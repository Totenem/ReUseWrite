"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { User, LogIn } from "lucide-react"

type UserData = {
  id: string
  email: string
  username: string
  created_at: string
  last_sign_in_at: string
  role: string
  aud: string
  confirmed_at: string
}

export function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    } else if (token) {
      fetch("https://repuposing-tool-backend.vercel.app/protected-route", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.user) {
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
          }
        })
        .catch((error) => {
          console.error("Error fetching protected resource:", error)
          localStorage.removeItem("token")
        })
    }
  }, [])

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
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {user ? (
            <Button variant="outline" asChild className="flex items-center gap-2">
              <Link href="/profile">
                <User className="h-4 w-4" />
                <span className="ml-2">{user.username || "Profile"}</span>
              </Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
