import classes from './Header.module.scss'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type Props = {
  hasLinkHome?: boolean
  title: string
}
export const Header = ({ hasLinkHome = true, title, children }: PropsWithChildren<Props>) => {
  const { t } = useTranslation()

  return (
    <header className={classNames('display-flex', classes.module)}>
      {hasLinkHome && (
        <Link className={classes.hasLinkHome} to="/" aria-label={`${t('ariaLabel.link.home')}`}>
          &larr;
        </Link>
      )}

      <h1 className="color-is-white">{title}</h1>
      {children}
    </header>
  )
}
