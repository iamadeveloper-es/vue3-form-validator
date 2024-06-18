import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import router from './router'
import { formValidator } from './index'
import { customValidations } from './validations/custom-validations'
import { createI18n } from 'vue-i18n'
import { i18n } from './locales/i18n-config'

const app = createApp(App)
app.use(createI18n(i18n))
app.use(router)

app.use(formValidator, {
    customRules: customValidations
})

app.mount('#app')
