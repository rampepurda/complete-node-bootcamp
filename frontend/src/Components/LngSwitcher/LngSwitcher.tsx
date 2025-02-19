import classes from './LngSwitcher.module.scss'
import { Button } from '../UI'
import '../../i18n/config'
import i18next from 'i18next'

export const LngSwitcher = () => {
  const languages: { en: { nativeName: string }; cz: { nativeName: string } } = {
    en: { nativeName: 'English' },
    cz: { nativeName: 'Czech' },
  }

  return (
    <>
      {Object.keys(languages).map((lng: string) => (
        <div className={classes.btnWrapper} key={lng}>
          {i18next.resolvedLanguage !== lng && (
            <Button
              classesName={classes.btn}
              OnClick={() => i18next.changeLanguage(lng)}
              rest={{
                type: 'button',
                disabled: i18next.resolvedLanguage === lng,
                lang: i18next.resolvedLanguage,
              }}
            >
              {lng}
            </Button>
          )}
        </div>
      ))}
    </>
  )
}
