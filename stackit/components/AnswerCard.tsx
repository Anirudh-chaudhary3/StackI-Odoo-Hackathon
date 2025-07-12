"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronLeft,
    ChevronRight,
    ThumbsUp,
    ThumbsDown,
    Trash2,
    Star,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Answer {
    id: string;
    content: string;
    votes: number;
    stars: number;
    liked: boolean;
}

interface Question {
    id: string;
    title: string;
    description: string;
    tags: string[];
    userName: string;
    answerCount: number;
}

const mockQuestions: Question[] = [
    {
        id: "1",
        title: "How to join 2 columns in SQL?",
        description:
            "I do not know the code for it as I am a beginner. Column 1 contains First name, and column 2 Last name. I want a new column to combine both.",
        tags: ["SQL", "Join"],
        userName: "John Doe",
        answerCount: 3,
    },
    {
        id: "2",
        title: "What is JWT?",
        description: "Need a basic explanation of JWT and how to use it with Auth.",
        tags: ["Auth", "JWT"],
        userName: "Priya Dev",
        answerCount: 2,
    },
];

export default function AnswerCard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [newAnswer, setNewAnswer] = useState("");

    const handleSubmit = () => {
        if (!newAnswer.trim()) return;
        const newAns: Answer = {
            id: Math.random().toString(36).substr(2, 9),
            content: newAnswer.trim(),
            votes: 0,
            stars: 0,
            liked: false,
        };
        setAnswers((prev) => [newAns, ...prev]);
        setNewAnswer("");
    };

    const handleVote = (id: string, direction: "up" | "down") => {
        setAnswers((prev) =>
            prev.map((a) => {
                if (a.id !== id) return a;
                if (direction === "up" && !a.liked) {
                    return { ...a, votes: a.votes + 1, liked: true };
                }
                if (direction === "down" && a.votes > 0) {
                    return { ...a, votes: a.votes - 1, liked: false };
                }
                return a;
            })
        );
    };

    const handleDelete = (id: string) => {
        setAnswers((prev) => prev.filter((a) => a.id !== id));
    };

    const handleStar = (id: string, rating: number) => {
        setAnswers((prev) =>
            prev.map((a) => (a.id === id ? { ...a, stars: rating } : a))
        );
    };

    const currentQuestion = mockQuestions[currentPage % mockQuestions.length];

    return (
        <div className="min-h-screen  text-white py-8 flex justify-center">
            <main className="w-[90%] min-h-[80vh] space-y-6">



                {/* Question */}


    



                <Card className="bg-gray-800 border-gray-700 z-10 ">




                    <CardContent className="p-6 space-y-3">
                        <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>
                        <div className="flex gap-2">
                            {currentQuestion.tags.map((tag, i) => (
                                <Badge key={i} className="border-gray-600 text-gray-300">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-gray-300">{currentQuestion.description}</p>
                        <div className="text-sm text-gray-400">Asked by: {currentQuestion.userName}</div>
                    </CardContent>
                </Card>

                {/* Answer Input */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6 space-y-3">
                        <h3 className="text-lg font-medium mb-2">Your Answer</h3>
                        <Textarea
                            placeholder="Write your answer..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                            Submit Answer
                        </Button>
                    </CardContent>
                </Card>

                {/* Dropdown Menu */}
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Options</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Sort by Newest</DropdownMenuItem>
                            <DropdownMenuItem>Sort by Votes</DropdownMenuItem>
                            <DropdownMenuItem>Sort by Stars</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Answer List */}
                <div className="space-y-4">
                    {answers.length === 0 && (
                        <p className="text-gray-400">No answers submitted yet. Be the first!</p>
                    )}
                    {answers.map((a) => (
                        <Card key={a.id} className="bg-gray-800 border-gray-700">
                            <CardContent className="p-4 space-y-2">
                                <div className="flex justify-between items-start">
                                    <p className="text-gray-300 flex-1">{a.content}</p>
                                    <div className="flex gap-2 ml-4">
                                        <Button variant="ghost" onClick={() => handleVote(a.id, "up")}>
                                            <ThumbsUp size={16} />
                                        </Button>
                                        <span>{a.votes}</span>
                                        <Button variant="ghost" onClick={() => handleVote(a.id, "down")}>
                                            <ThumbsDown size={16} />
                                        </Button>
                                        <Button variant="ghost" onClick={() => handleDelete(a.id)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={18}
                                            className={`cursor-pointer ${star <= a.stars
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-500"
                                                }`}
                                            onClick={() => handleStar(a.id, star)}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
