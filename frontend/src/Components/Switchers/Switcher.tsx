import classes from './Switchers.module.scss'
import { Button } from '../UI'
import i18next from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const LngSwitcher = () => {
  const { t } = useTranslation()
  const [actLng] = useState<string>(`${i18next.resolvedLanguage}`)
  const lngs: { en: { nativeName: string }; cz: { nativeName: string } } = {
    en: { nativeName: 'English' },
    cz: { nativeName: 'Czech' },
  }

  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <div className={classes.btnWrapper} key={lng}>
          {i18next.resolvedLanguage !== lng && (
            <Button
              classesName={classes.btn}
              OnClick={() => i18next.changeLanguage(lng).then(() => window.location.reload())}
              title={actLng === 'en' ? 'cz' : 'en'}
              ariaLabel={`${t('lngSwitcher')}`}
              rest={{
                type: 'submit',
                disabled: i18next.resolvedLanguage === lng,
                lang: i18next.resolvedLanguage,
              }}
            />
          )}
        </div>
      ))}
    </>
  )
}

export const CartSwitcher = ({ pageURL, itemTotal }: { pageURL: string; itemTotal?: number }) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(classes.btnWrapper, classes.cart)}>
      <Button
        classesName={classes.btn}
        //OnClick={() => i18next.changeLanguage(lng).then(() => window.location.reload())}
        //ariaLabel={`${t('lngSwitcher')}`}
        rest={{
          type: 'button',
          //disabled: i18next.resolvedLanguage === lng,
        }}
      >
        <div>
          <Link className={classes.link} to={`${pageURL}`}>
            <img src="/ico-cart.svg" width={22} height={22} aria-hidden={true} />
            <span className="display-inline-block">2{itemTotal}</span>
          </Link>
        </div>
      </Button>
    </div>
  )
}
