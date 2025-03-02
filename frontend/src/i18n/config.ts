import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
//import en from './en/common.json'
//import cz from './cz/common.json'

/**
  Tutorial URL:
  - https://www.youtube.com/watch?v=SA_9i4TtxLQ

  Installations:
  - langDetector: yarn add i18next-browser-languagedetector

  Install backend plugin:
   - backend plugin: yarn add i18next-http-backend
   - use(Backend)
   - thanks of 'Backend' we can remove resource and create dedicated json file for example
    under public/locales/en/translation.json file. (Name: 'translation.json' it is a must)
   - resources can be deleted now
   - lazyLoading (need to use)

   Interpolation:
   - create dynamic value
   - Key: "Welcome page {{intText}}"
   - Render: <p>{t('section1.title', { intText: 'dynText' })}</p>

   Trans: read more
 */

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    fallbackNS: 'cz', // If can not find fallbackLng use NS(NameSpaces)
    debug: true, // If true is Visible in console
    /*
    //if .use(Backend) RESOURCES CAN BE REMOVED
        resources: {
      en: {
        translation: en, // without translation DOS NOT WORK!
      },
      cz: {
        translation: cz,
      },
    },
     */

    // Seems it is redundant
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  })
  .then()
