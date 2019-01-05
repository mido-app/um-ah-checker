import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import Vue from 'vue'
import VueOnsen from 'vue-onsenui/esm'

import VueOnsPage from 'vue-onsenui/esm/components/VOnsPage'
import VOnsToolbar from 'vue-onsenui/esm/components/VOnsToolbar'
import VOnsTabbar from 'vue-onsenui/esm/components/VOnsTabbar'
import VOnsTab from 'vue-onsenui/esm/components/VOnsTab'
import VOnsIcon from 'vue-onsenui/esm/components/VOnsIcon'
Vue.use(VueOnsen)

Vue.component(VueOnsPage.name, VueOnsPage)
Vue.component(VOnsToolbar.name, VOnsToolbar)
Vue.component(VOnsTabbar.name, VOnsTabbar)
Vue.component(VOnsTab.name, VOnsTab)
Vue.component(VOnsIcon.name, VOnsIcon)
