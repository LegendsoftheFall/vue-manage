import { createApp } from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import '@/interceptors/axios'

import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

createApp(App).use(store).use(router).use(VueMarkdownEditor).mount('#app')
