import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpAPI from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// Internationalization feature for the application
i18n.use(HttpAPI)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns: ['common'],
        backend: {
            loadPath: '/i18n/{{lng}}/{{ns}}.json',
        },
        debug: true,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;