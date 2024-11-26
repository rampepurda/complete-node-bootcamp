import React, { PropsWithChildren } from 'react'
import { ProductInt } from '../../types'

type Props = {
  classes?: string
  product: ProductInt
}

export const Product = ({ product, classes, children }: PropsWithChildren<Props>) => {
  return (
    <div className={classes}>
      <h4>{product.productName}</h4>
      <h4>{product.image}</h4>
      <h4>{product.price}</h4>
      {children}
    </div>
  )
}
