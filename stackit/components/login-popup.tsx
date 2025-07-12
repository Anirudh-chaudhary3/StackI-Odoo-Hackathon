"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface LoginPopupProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
}

export function LoginPopup({ isOpen, onClose, onLogin }: LoginPopupProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
    setEmail("")
    setPassword("")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">{isSignup ? "Sign Up" : "Login"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => setIsSignup(!isSignup)} className="text-blue-400 hover:text-blue-300">
              {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}