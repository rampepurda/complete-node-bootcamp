import classes from './Navigation.module.scss'
import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../UI'
import classNames from 'classnames'
import { HTMLTagT } from '../../types'
import { useTranslation } from 'react-i18next'

interface PropsInt extends HTMLAttributes<HTMLBodyElement> {
  tagAttr: HTMLTagT
  Id: number
  title: string
  link?: string | undefined
  subNavigation?:
    | {
        title: string
        link: string
      }[]
    | undefined
}

export const SideBarNav = ({
  tagAttr,
  Id,
  title,
  link,
  subNavigation,
}: PropsWithChildren<PropsInt>) => {
  const { t } = useTranslation()
  const [isSubNavOpen, setIsSubNavOpen] = useState<number | null>(null)
  const handleOpenSubNav = (idx: number) => {
    if (isSubNavOpen === idx) {
      return setIsSubNavOpen(null)
    }
    setIsSubNavOpen(idx)
  }
  const HTMLAttribute = tagAttr

  return (
    <HTMLAttribute>
      {subNavigation?.length !== 0 && subNavigation !== undefined ? (
        <>
          <Button
            classesName={classNames('btn btn-link', classes.title)}
            OnClick={() => handleOpenSubNav(Id)}
            title={t(`${title}`)}
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
                  <NavLink to={item.link}>{t(`${item.title}`)}</NavLink>
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <NavLink className={classes.isLink} to={`${link}`}>
          {t(`${title}`)}
        </NavLink>
      )}
    </HTMLAttribute>
  )
}
