import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en/common.json'
import cz from './cz/common.json'

/*
  Tutorial URL:
  - https://www.youtube.com/watch?v=SA_9i4TtxLQ

  Installations:
  - langDetector: yarn add i18next-browser-languagedetector
  - backend plugin: yarn add i18next-http-backend

  Install backend plugin:
   - use(Backend)
   - thanks of 'Backend' we can move translate.json file under Public/locales.
   - resources can be deleted now
   - lazyLoading (need to use)
   Conclusion:
   Do not use it, solution can be for example use Localise or loaded data from the Server

   Interpolation:
   - Key: "Welcome page {{intText}}"
   - Render: <p>{t('section1.title', { intText: 'dynText' })}</p>

   Trans: read more
 */

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    //fallbackNS: 'cz' // If can not find fallbackLng use NS-Namespaces
    debug: false, // If true is Visible in console
    resources: {
      en: {
        translation: en, // without translation DOS NOT WORK!
      },
      cz: {
        translation: cz,
      },
    },
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  })
