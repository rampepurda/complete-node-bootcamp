export type HTMLHeadlinesT = 'h1' | 'h2' | 'h3' | 'h4'
export type HTMLTagT = 'div' | 'section' | 'p' | 'li' | 'span'

export enum NavTypeE {
  breadCrumb = 'Breadcrumb',
  primary = 'Primary',
  sideBar = 'sideBar',
}

export enum PathNameE {
  eShop = '/eShop',
  cart = '/eShop/cart',
  order = '/eShop/cart/order',
}

export type ProdOrderedT = {
  id: string | number
  productName: string
  from: string
  description: string
  price?: string | number
  priceTotal?: string | number
  piece?: number
}

export interface CartInt {
  productsOrdered: ProdOrderedT[] | undefined
  productsOrderTotal: number
  priceTotal?: number
}

export type FormOrderErrorT = {
  fullName: string
  email: string
  phone: string
  payment: string
}

export type OrderT = {
  client: {
    fullName: string
    email: string
    phone: string | number
    payment: string
  }
  ordered: CartInt
}

export type PlaylistT = {
  id: string | number
  url: string
  title: string
  isCompleted?: boolean
  like?: number
  views?: number
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
