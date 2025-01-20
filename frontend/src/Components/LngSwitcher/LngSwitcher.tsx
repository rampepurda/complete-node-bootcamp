import classes from './LngSwitcher.module.scss'
import { Button } from '../UI'
import '../../i18n/config'
import i18next from 'i18next'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const LngSwitcher = () => {
  const { t } = useTranslation()
  const languages: { en: { nativeName: string }; cz: { nativeName: string } } = {
    en: { nativeName: 'English' },
    cz: { nativeName: 'Czech' },
  }

  useEffect(() => {}, [t])

  return (
    <>
      {Object.keys(languages).map((lng: string) => (
        <div className={classes.btnWrapper} key={lng}>
          {i18next.resolvedLanguage !== lng && (
            <Button
              className={classes.btn}
              OnClick={() => i18next.changeLanguage(lng)}
              rest={{
                type: 'button',
                disabled: i18next.resolvedLanguage === lng,
                lang: i18next.resolvedLanguage,
              }}
              ariaLabel={`${t('ariaLabel.lang')}`}
            >
              {lng}
            </Button>
          )}
        </div>
      ))}
    </>
  )
}
