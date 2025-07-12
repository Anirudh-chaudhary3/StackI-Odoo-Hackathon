export interface Answer {
    id: string
    title: string
    content: string[]
    votes: number
    userVote?: "up" | "down" | null
    author: string
    createdAt: string
  }
  
  export interface QuestionDetail {
    id: string
    title: string
    description: string
    tags: string[]
    author: string
    createdAt: string
    views: number
  }
  
  export interface User {
    id: string
    name: string
    avatar?: string
    isLoggedIn: boolean
  }