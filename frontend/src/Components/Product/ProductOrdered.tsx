import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { HTMLTagT, ProductInt } from '../../types'
import { Link } from 'react-router-dom'

interface PropsInt extends HTMLAttributes<HTMLBodyElement> {
  tagElement: HTMLTagT
  classes?: string
  product: ProductInt | undefined
  detailURL?: string
}

export const ProductOrdered = ({
  product,
  classes,
  tagElement,
  detailURL,
  children,
}: PropsWithChildren<PropsInt>) => {
  const HTMLAttr = tagElement
  return (
    <HTMLAttr className={classes}>
      <h4>{product?.productName}</h4>
      <p>Description: {product?.description}</p>
      <p>Price: {product?.price} BGP</p>
      <div>
        <Link to={`${detailURL}/${product?.productName}`}>See detail</Link>
      </div>
      {children}
      <hr />
    </HTMLAttr>
  )
}
