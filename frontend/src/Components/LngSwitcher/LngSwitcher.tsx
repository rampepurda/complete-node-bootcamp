import classes from './LngSwitcher.module.scss'
import { Button } from '../UI'
import i18next from 'i18next'
import { useState } from 'react'

/**
 * @function changeLanguage - After React was updated to v19, looks that changeLanguage does not work properly.
 * window.location.reload() is ONLY FIRST HELP. Another solution must be used instead
 * @constructor
 */

export const LngSwitcher = () => {
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
