import { createI18n } from 'vue-i18n'
import uk from './uk'
import en from './en'

const saved = localStorage.getItem('lang') || 'uk'

export const i18n = createI18n({
    legacy: false,
    locale: saved,
    fallbackLocale: 'uk',
    messages: { uk, en }
})