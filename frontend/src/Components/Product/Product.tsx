import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { HTMLTagT, ProductInt } from '../../types'

interface PropsInt extends HTMLAttributes<HTMLBodyElement> {
  tagElement: HTMLTagT
  classes?: string
  product: ProductInt
}

export const Product = ({
  product,
  classes,
  tagElement,
  children,
}: PropsWithChildren<PropsInt>) => {
  const HTMLAttr = tagElement
  return (
    <HTMLAttr className={classes}>
      <label>Product:</label>
      <h4>{product.productName}</h4>

      <label>From:</label>
      <h4>{product.from}</h4>

      {product.price && (
        <>
          <label>Price:</label>
          <h4>{product.price}</h4>
        </>
      )}

      <label>Description:</label>
      <p>{product.description}</p>
      {children}
    </HTMLAttr>
  )
}
