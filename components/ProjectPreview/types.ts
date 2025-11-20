import { LucideIcon } from 'lucide-react'

export interface Project {
    name: string,
    subtitle: string,
    image: string,
    tools?: Tool[]
    description?: string
}

export interface Tool {
    name: string,
    icon: LucideIcon
}