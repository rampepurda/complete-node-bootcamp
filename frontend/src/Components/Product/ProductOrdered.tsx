import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { HTMLTagT, ProdOrderedT } from '../../types'
import { Link } from 'react-router-dom'

interface PropsInt extends HTMLAttributes<HTMLBodyElement> {
  tagElement: HTMLTagT
  classes?: string
  product: ProdOrderedT | undefined
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
      <label>Product:</label>
      <h2>{product?.productName}</h2>

      <label>Description:</label>
      <p className="txt-ellipsis">{product?.description}</p>
      <Link to={`${detailURL}/${product?.productName}`}>
        <strong>See detail</strong>
      </Link>

      <h5>
        Price: <strong>{product?.price}</strong> GBP/piece
      </h5>

      {children}
    </HTMLAttr>
  )
}
