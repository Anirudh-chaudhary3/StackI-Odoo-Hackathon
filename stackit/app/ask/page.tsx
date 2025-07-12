'use client';
import { useState } from 'react';
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Smile,
  Link,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"


interface QuestionFormData {
  title: string
  description: string
  tags: string
}


export default function Home() {

  const [formData, setFormData] = useState<QuestionFormData>({
    title: "",
    description: "",
    tags: "",
  })

  const handleInputChange = (field: keyof QuestionFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  const [answer, setAnswer] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="text-xl font-semibold text-gray-900">StackIt</div>
          <div className="text-lg font-medium text-gray-700">Home</div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-purple-100 text-purple-700">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">

        <Card className="border-2 border-gray-300">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium text-gray-900">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 text-base"
                  placeholder="Enter your question title..."
                />
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium text-gray-900">
                  Description
                </Label>

                {/* Rich Text Editor Toolbar */}
                <div className="border-2 border-gray-300 rounded-lg">

                  {/* Text Area */}
                  <RichTextEditor
                    onChange={(value) => setAnswer(value)}
                    placeholder="Start typing your content here..."
                    className="mb-4"
                  />
                </div>

              </div>

              {/* Tags Field */}
              <div className="bg-white rounded-lg shadow-lg p-6">

              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="px-8 py-2 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium"
                  variant="outline"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
