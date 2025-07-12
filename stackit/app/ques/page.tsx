"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { VoteButtons } from "@/components/vote-buttons"
import RichTextEditor from "@/components/RichTextEditor"
import { LoginPopup } from "@/components/login-popup"
import type { Answer, QuestionDetail, User } from "@/types/question-details"

const mockQuestion: QuestionDetail = {
  id: "1",
  title: "How to join 2 columns in a data set to make a separate column in SQL",
  description:
    "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine",
  tags: ["Tags", "Tags"],
  author: "User Name",
  createdAt: "5 ans",
  views: 1234,
}

const mockAnswers: Answer[] = [
  {
    id: "1",
    title: "Answer 1",
    content: ["The || Operator.", "The + Operator.", "The CONCAT Function."],
    votes: 9,
    userVote: null,
    author: "Expert User",
    createdAt: "3 days ago",
  },
  {
    id: "2",
    title: "Answer 2",
    content: ["Details"],
    votes: 0,
    userVote: null,
    author: "Another User",
    createdAt: "1 day ago",
  },
]

export default function QuestionDetailPage() {
  const [answers, setAnswers] = useState<Answer[]>(mockAnswers)
  const [newAnswer, setNewAnswer] = useState("")
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Current User",
    isLoggedIn: false,
  })
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  const handleVote = (answerId: string, voteType: "up" | "down") => {
    if (!user.isLoggedIn) {
      setShowLoginPopup(true)
      return
    }

    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer.id === answerId) {
          let newVotes = answer.votes
          let newUserVote: "up" | "down" | null = voteType

          // Handle vote logic
          if (answer.userVote === voteType) {
            // Remove vote if clicking same vote
            newUserVote = null
            newVotes += voteType === "up" ? -1 : 1
          } else if (answer.userVote) {
            // Change vote
            newVotes += voteType === "up" ? 2 : -2
          } else {
            // New vote
            newVotes += voteType === "up" ? 1 : -1
          }

          return { ...answer, votes: newVotes, userVote: newUserVote }
        }
        return answer
      }),
    )
  }

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser((prev) => ({ ...prev, isLoggedIn: true, name: email.split("@")[0] }))
    setShowLoginPopup(false)
  }

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnswer.trim()) return

    const newAnswerObj: Answer = {
      id: Date.now().toString(),
      title: `Answer ${answers.length + 1}`,
      content: [newAnswer],
      votes: 0,
      userVote: null,
      author: user.name,
      createdAt: "just now",
    }

    setAnswers((prev) => [...prev, newAnswerObj])
    setNewAnswer("")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-bold">StackIt</div>
          <div className="text-lg font-medium">Home</div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="
            
            relative text-gray-300 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-purple-100 text-purple-700">
                {user.isLoggedIn ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">

        {/* Question Section */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">{mockQuestion.title}</h2>

            <div className="flex gap-2 mb-4">
              {mockQuestion.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">{mockQuestion.description}</p>

            <div className="text-sm text-gray-400">
              Asked by {mockQuestion.author} • {mockQuestion.createdAt}
            </div>
          </CardContent>
        </Card>

        {/* Answers Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Answers</h3>

          <div className="space-y-6">
            {answers.map((answer) => (
              <Card key={answer.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Voting Section */}
                    <VoteButtons
                      votes={answer.votes}
                      userVote={answer.userVote}
                      onVote={(voteType) => handleVote(answer.id, voteType)}
                      disabled={!user.isLoggedIn}
                    />

                    {/* Answer Content */}
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-white mb-3">{answer.title}</h4>
                      <div className="space-y-2 mb-4">
                        {answer.content.map((line, index) => (
                          <p key={index} className="text-gray-300">
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="text-sm text-gray-400">
                        Answered by {answer.author} • {answer.createdAt}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Submit Answer Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Submit Your Answer</h3>

            <form onSubmit={handleSubmitAnswer}>
                             <div className="mb-6">
                 <RichTextEditor onChange={(value) => setNewAnswer(value)} placeholder="Write your answer here..." />
               </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Login Popup */}
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} onLogin={handleLogin} />
    </div>
  )
}