import { HTMLAttributes } from 'react'

export interface ProductInt {
  id: string | number
  productName: string
  image: string
  from: string
  nutrients: string
  quantity: string
  price: string
  organic: boolean
  description: string
}

export type HTMLHeadlinesT = 'h1' | 'h2' | 'h3' | 'h4'
export type HTMLTagT = 'div' | 'section' | 'p' | 'li' | 'span'
