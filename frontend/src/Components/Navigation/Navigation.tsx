import classes from './Navigation.module.scss'
import React, { PropsWithChildren, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../UI'
import classNames from 'classnames'

type SideBarNavT = {
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

export const SideBarNav = ({ id, title, link, subNavigation }: PropsWithChildren<SideBarNavT>) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<number | null>(null)
  const handleOpenSubNav = (idx: number) => {
    if (isSubNavOpen === idx) {
      return setIsSubNavOpen(null)
    }
    setIsSubNavOpen(idx)
  }

  return (
    <>
      {subNavigation?.length !== 0 && subNavigation !== undefined ? (
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
                  <NavLink to={item.link}>{item.title}</NavLink>
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
    </>
  )
}
