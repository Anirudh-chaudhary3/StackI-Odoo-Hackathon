'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Loader2 } from "lucide-react"
import Navbar from "@/components/Navbar"
import { toast } from "sonner";

interface QuestionFormData {
  title: string
  description: string
  tags: string[]
}

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuestionFormData>({
    title: "",
    description: "",
    tags: [],
  })

  const [tagInput, setTagInput] = useState("")

  const handleInputChange = (field: keyof QuestionFormData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      description: value
    }))
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }))
        setTagInput("")
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.title.trim()) {
      toast.error("Please enter a question title");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Please enter a question description");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Create dummy question data
      const newQuestion = {
        _id: Date.now().toString(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags: formData.tags,
        answers: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      toast.success("Question created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        tags: [],
      });
      setTagInput("");
      
      // Navigate to the main page to see all questions
      router.push('/');
      
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Navbar />

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
                  className="w-full h-12 border-2 border-gray-300 text-black rounded-lg px-4 text-base"
                  placeholder="Enter your question title..."
                  disabled={isSubmitting}
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
                    onChange={(value) => handleDescriptionChange(value)}
                    placeholder="Start typing your content here..."
                    className="mb-4"
                  />
                </div>

              </div>

              {/* Tags Field */}
              <div className="space-y-3">
                <Label htmlFor="tags" className="text-base font-medium text-gray-900">
                  Tags
                </Label>
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                    {formData.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-150 transition-colors"
                      >
                        <span className="text-sm font-medium">#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-600 transition-colors p-0.5 rounded-full hover:bg-red-100"
                          title="Remove tag"
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="tags"
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleAddTag}
                    className="border-0 p-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-gray-400"
                    placeholder="Type tags separated by space or Enter..."
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <span>💡</span>
                  Press Space or Enter to add tags. Tags help categorize your question.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="px-8 py-2 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}