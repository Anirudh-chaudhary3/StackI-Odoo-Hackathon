"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { VoteButtons } from "@/components/vote-buttons"
import RichTextEditor from "@/components/RichTextEditor"
import FormattedContent from "@/components/FormattedContent"
import { LoginPopup } from "@/components/login-popup"
import type { Answer, QuestionDetail, User } from "@/types/question-details"
import Navbar from "@/components/Navbar"

const mockQuestion: QuestionDetail = {
  id: "1",
  title: "How to join 2 columns in a data set to make a separate column in SQL",
  description:
    "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine",
  tags: ["sql", "database", "data-manipulation"],
  author: "User Name",
  createdAt: "5 ans",
  views: 1234,
}

const mockAnswers: Answer[] = [
  {
    id: "1",
    title: "Answer 1",
    content: [
      '{"blocks":[{"key":"a1b2c","text":"The || Operator.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
      '{"blocks":[{"key":"d3e4f","text":"The + Operator.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
      '{"blocks":[{"key":"g5h6i","text":"The CONCAT Function.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"BOLD"},{"offset":7,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
    ],
    votes: 9,
    userVote: null,
    author: "Expert User",
    createdAt: "3 days ago",
  },
  {
    id: "2",
    title: "Answer 2",
    content: [
      '{"blocks":[{"key":"j7k8l","text":"Here is a detailed explanation with formatting:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"m9n0o","text":"• First point","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"p1q2r","text":"• Second point with bold text","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":18,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"s3t4u","text":"• Third point with italic text","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":18,"length":10,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
    ],
    votes: 0,
    userVote: null,
    author: "Another User",
    createdAt: "1 day ago",
  },
]

export default function QuestionDetailPage() {
  const [answers, setAnswers] = useState<Answer[]>(mockAnswers)
  const [newAnswer, setNewAnswer] = useState("")
  const [displayMode, setDisplayMode] = useState<'plain' | 'html'>('plain')
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
      content: [newAnswer], // This will now be the formatted content from RichTextEditor
      votes: 0,
      userVote: null,
      author: user.name,
      createdAt: "just now",
    }

    setAnswers((prev) => [...prev, newAnswerObj])
    setNewAnswer("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Questions</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">How to join 2 columns in a data set...</span>
          </div>
        </nav>

        {/* Question Section */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {/* Voting for Question */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <VoteButtons
                  votes={42}
                  userVote={null}
                  onVote={() => {}}
                  disabled={!user.isLoggedIn}
                />
              </div>

              {/* Question Content */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {mockQuestion.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mockQuestion.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {mockQuestion.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Asked by <span className="font-medium text-gray-900">{mockQuestion.author}</span></span>
                    <span>•</span>
                    <span>{mockQuestion.createdAt}</span>
                    <span>•</span>
                    <span>{mockQuestion.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {answers.length} Answer{answers.length !== 1 ? 's' : ''}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Display mode:</span>
              <Button
                variant={displayMode === 'plain' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDisplayMode('plain')}
                className="text-xs bg-blue-600 hover:bg-blue-700"
              >
                Plain Text
              </Button>
              <Button
                variant={displayMode === 'html' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDisplayMode('html')}
                className="text-xs bg-blue-600 hover:bg-blue-700"
              >
                Formatted
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {answers.map((answer, index) => (
              <Card key={answer.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Voting Section */}
                    <div className="flex flex-col items-center gap-2 pt-2">
                      <VoteButtons
                        votes={answer.votes}
                        userVote={answer.userVote}
                        onVote={(voteType) => handleVote(answer.id, voteType)}
                        disabled={!user.isLoggedIn}
                      />
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Answer {index + 1}
                        </Badge>
                        {answer.votes > 5 && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Popular
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{answer.title}</h3>
                      
                      <div className="prose prose-gray max-w-none mb-6">
                        {answer.content.map((line, contentIndex) => (
                          <FormattedContent 
                            key={contentIndex} 
                            content={line} 
                            mode={displayMode}
                            className="text-gray-700"
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Answered by <span className="font-medium text-gray-900">{answer.author}</span></span>
                          <span>•</span>
                          <span>{answer.createdAt}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Submit Answer Section */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your Answer</h3>
            <p className="text-gray-600 mb-6">
              Share your knowledge and help others by providing a detailed answer to this question.
            </p>

            <form onSubmit={handleSubmitAnswer}>
              <div className="mb-6">
                <RichTextEditor 
                  onChange={(value) => setNewAnswer(value)} 
                  placeholder="Write your answer here... Use the formatting tools to make your answer clear and well-structured." 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {!user.isLoggedIn && (
                    <span className="text-orange-600 font-medium">
                      Please log in to submit an answer
                    </span>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 font-medium"
                  disabled={!user.isLoggedIn}
                >
                  Post Answer
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