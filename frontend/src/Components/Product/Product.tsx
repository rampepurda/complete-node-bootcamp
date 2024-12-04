import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { HTMLTagT, ProductInt } from '../../types'

interface PropsInt extends HTMLAttributes<HTMLBodyElement> {
  tagAttr: HTMLTagT
  classes?: string
  product: ProductInt
}

export const Product = ({ product, classes, tagAttr, children }: PropsWithChildren<PropsInt>) => {
  const HTMLAttr = tagAttr
  return (
    <HTMLAttr className={classes}>
      <h4>{product.productName}</h4>
      <h4>{product.image}</h4>
      <h4>{product.price}</h4>
      {children}
    </HTMLAttr>
  )
}
