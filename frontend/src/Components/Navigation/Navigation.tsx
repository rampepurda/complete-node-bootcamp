import classes from './Navigation.module.scss'
import React, { PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../UI'
import classNames from 'classnames'

type PropsSubNav = {
  id: number
  title: string
  link?: string | undefined
  subNavigation?:
    | {
        title: string
        link: string
      }[]
    | undefined
}

export const SubNav = ({ id, title, link, subNavigation }: PropsWithChildren<PropsSubNav>) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<number | null>(null)
  const handleOpenSubNav = (idx: number) => {
    if (isSubNavOpen === idx) {
      return setIsSubNavOpen(null)
    }
    setIsSubNavOpen(idx)
  }

  return (
    <li>
      {subNavigation?.length !== 0 ? (
        <>
          <Button
            className={classNames('btn btn-link', classes.title)}
            OnClick={() => handleOpenSubNav(id)}
            title={title}
            rest={{ type: 'button' }}
          />

          <ul
            className={classNames(
              isSubNavOpen !== null ? classes.isSubNavOpen : classes.isSubNavClose,
              classes.isSubNav
            )}
            aria-expanded={isSubNavOpen !== null}
          >
            {subNavigation?.map((item, idx: number) => {
              return (
                <li key={idx}>
                  <Link to={item.link}>{item.title}</Link>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <Link className={classes.isLink} to={`${link}`}>
          {title}
        </Link>
      )}
    </li>
  )
}
