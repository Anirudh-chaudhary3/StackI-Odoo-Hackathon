export interface Question {
  id: string
  title: string
  description: string
  tags: string[]
  userName: string
  timeAgo: string
  answerCount: number
}

export interface FilterOption {
  label: string
  value: string
  active: boolean
} 