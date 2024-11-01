import classes from './Navigation.module.scss'
import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { HTMLTagsT } from '../../types'
import { Button } from '../UI'
import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLBodyElement> {
  HTMLAttr: HTMLTagsT
  link: string
  title: string
  subTitle: string[]
}
type PropsSubNav = {
  id: number
  title: string
  subNavigation?:
    | {
        title: string
        link: string
      }[]
    | undefined
}

export const SubNav = ({ id, title, subNavigation }: PropsWithChildren<PropsSubNav>) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<number | null>(null)
  const handleOpenSubNav = (idx: number) => {
    if (isSubNavOpen === idx) {
      return setIsSubNavOpen(null)
    }
    setIsSubNavOpen(idx)
  }

  return (
    <li>
      <Button
        className={classNames('btn btn-link', classes.title)}
        OnClick={() => handleOpenSubNav(id)}
        title={title}
        rest={{ type: 'button' }}
      />

      {subNavigation?.length !== 0 && (
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
      )}
    </li>
  )
}
