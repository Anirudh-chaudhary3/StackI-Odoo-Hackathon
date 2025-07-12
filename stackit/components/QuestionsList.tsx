"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, MessageSquare, Eye, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  answers: any[];
  createdAt: string;
  updatedAt: string;
}


export default function QuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  // Dummy database
  const dummyQuestions: Question[] = [
    {
      _id: "1",
      title: "How to join 2 columns in a data set to make a separate column in SQL",
      description: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine both.",
      tags: ["sql", "database", "data-manipulation"],
      answers: [],
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      _id: "2",
      title: "What is JWT and how to implement it in Node.js?",
      description: "I'm building a REST API and need to implement authentication. Can someone explain JWT tokens and show me how to use them with Node.js and Express?",
      tags: ["jwt", "nodejs", "authentication", "express"],
      answers: [
        { _id: "a1", content: "JWT stands for JSON Web Token..." }
      ],
      createdAt: "2024-01-14T15:45:00Z",
      updatedAt: "2024-01-14T16:20:00Z"
    },
    {
      _id: "3",
      title: "React useState vs useEffect - when to use which?",
      description: "I'm confused about when to use useState and when to use useEffect in React. Can someone explain the difference with practical examples?",
      tags: ["react", "javascript", "hooks", "frontend"],
      answers: [
        { _id: "a2", content: "useState is for managing state..." },
        { _id: "a3", content: "useEffect is for side effects..." }
      ],
      createdAt: "2024-01-13T09:15:00Z",
      updatedAt: "2024-01-13T09:15:00Z"
    },
    {
      _id: "4",
      title: "How to deploy a Next.js app to Vercel?",
      description: "I've built a Next.js application and want to deploy it to Vercel. What are the steps and best practices for deployment?",
      tags: ["nextjs", "vercel", "deployment", "frontend"],
      answers: [],
      createdAt: "2024-01-12T14:20:00Z",
      updatedAt: "2024-01-12T14:20:00Z"
    },
    {
      _id: "5",
      title: "MongoDB aggregation pipeline examples",
      description: "I need help understanding MongoDB aggregation pipelines. Can someone provide some practical examples for common use cases?",
      tags: ["mongodb", "database", "aggregation", "nosql"],
      answers: [
        { _id: "a4", content: "Here are some common aggregation examples..." }
      ],
      createdAt: "2024-01-11T11:30:00Z",
      updatedAt: "2024-01-11T11:30:00Z"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setQuestions(dummyQuestions);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const filtered = questions.filter(question =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredQuestions(filtered);
  }, [questions, searchTerm]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading questions...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
            <p className="text-gray-600 mt-1">Find answers to your questions or ask a new one</p>
          </div>
          <Link href="/ask">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Ask Question
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <Card className="bg-white border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500 mb-4">
                  {searchTerm ? 'No questions found matching your search.' : 'No questions yet.'}
                </div>
                {!searchTerm && (
                  <Link href="/ask">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Ask the First Question
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredQuestions.map((question) => (
              <Card key={question._id} className="bg-white border-2 border-gray-300 hover:border-blue-400 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Question Stats */}
                    <div className="flex flex-col items-center gap-1 text-sm text-gray-500 min-w-[60px]">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{question.answers?.length || 0}</span>
                      </div>
                      <span className="text-xs">answers</span>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/ques?id=${question._id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                          {question.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {question.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-2 py-1 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(question.createdAt)}</span>
                        </div>
                        {question.answers?.length > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{question.answers.length} answer{question.answers.length !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 