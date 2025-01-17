import { Button } from '../UI'
import '../../i18n/config'
import i18next from 'i18next'
import { PropsWithChildren } from 'react'

type Props = {
  classesNames?: string
}

export const LngSwitcher = ({ classesNames, children }: PropsWithChildren<Props>) => {
  const languages: { en: { nativeName: string }; cz: { nativeName: string } } = {
    en: { nativeName: 'English' },
    cz: { nativeName: 'Czech' },
  }

  return (
    <>
      {Object.keys(languages).map((lng: string) => (
        <>
          {i18next.resolvedLanguage !== lng && (
            <>
              <Button
                className={'btn btn-primary'}
                rest={{ type: 'button', disabled: i18next.resolvedLanguage === lng }}
                OnClick={(ev) => i18next.changeLanguage(lng)}
                key={lng}
              >
                {lng}
              </Button>
              {children}
            </>
          )}
        </>
      ))}
    </>
  )
}
