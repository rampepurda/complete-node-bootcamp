export type HTMLHeadlinesT = 'h1' | 'h2' | 'h3' | 'h4'
export type HTMLTagT = 'div' | 'section' | 'p' | 'li' | 'span'

type ProdOrderedT = {
  id: string | number
  productName: string
  from: string
  description: string
}

export interface ProductOrderedInt {
  productsOrdered: ProdOrderedT[] | null
  productsOrderTotal: number
}

export type PlaylistT = {
  id: string | number
  url: string
  title: string
  isCompleted?: boolean
  like?: number
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
