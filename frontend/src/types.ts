import { HTMLAttributes } from 'react'

export type HTMLHeadlinesT = 'h1' | 'h2' | 'h3' | 'h4'
export type HTMLTagT = 'div' | 'section' | 'p' | 'li' | 'span'
export type PlaylistT = {
  id: string | number
  url: string
  title: string
  isCompleted?: boolean
}

export interface ProductInt {
  id: string | number
  productName: string
  image?: string
  from: string
  nutrients?: string
  quantity?: string
  price: string
  organic?: boolean
  description: string
}
