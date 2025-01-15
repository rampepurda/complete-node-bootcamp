import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { HTMLTagT, ProductInt } from '../../types'
import { Link } from 'react-router-dom'

interface PropsInt extends HTMLAttributes<HTMLBodyElement> {
  tagElement: HTMLTagT
  classes?: string
  product: ProductInt | undefined
  isDetail?: boolean
}

export const Product = ({
  product,
  classes,
  tagElement,
  isDetail = false,
  children,
}: PropsWithChildren<PropsInt>) => {
  const HTMLAttr = tagElement
  return (
    <HTMLAttr className={classes}>
      <label>Product:</label>
      <h4>{product?.productName}</h4>

      {isDetail ? (
        <>
          <label>From:</label>
          <h4>{product?.from}</h4>

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
          <Link to={`/section6/eventsReq/${product?.productName}`}>See detail</Link>
        </div>
      )}

      {children}
    </HTMLAttr>
  )
}
