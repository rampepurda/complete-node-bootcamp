import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { HTMLTagT, ProductInt } from '../../types'
import { Link } from 'react-router'

interface PropsInt extends HTMLAttributes<HTMLBodyElement> {
  tagElement: HTMLTagT
  classes?: string
  product: ProductInt | undefined
  detailURL?: string
  isDetail?: boolean
}

export const Product = ({
  product,
  classes,
  tagElement,
  isDetail = false,
  detailURL,
  children,
}: PropsWithChildren<PropsInt>) => {
  const HTMLAttr = tagElement
  return (
    <HTMLAttr className={classes}>
      <label>Product:</label>
      <h2>{product?.productName}</h2>

      {isDetail ? (
        <>
          <label>From:</label>
          <h3>{product?.from}</h3>

          {product?.price && (
            <>
              <label>Price:</label>
              <h4>{product.price}</h4>
            </>
          )}

          <label>Description:</label>
          <p>{product?.description}</p>
        </>
      ) : (
        <div>
          <Link to={`${detailURL}/${product?.productName}`}>See detail</Link>
        </div>
      )}

      {children}
    </HTMLAttr>
  )
}
