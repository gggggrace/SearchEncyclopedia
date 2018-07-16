import Vue from 'vue'
import Router from 'vue-router'
import searchPanel from '@/components/searchPanel'
import logoSelect from '@/components/logoSelect'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'searchPanel',
      component: searchPanel
    },
    {
      path: '/',
      name: 'logoSelect',
      component: logoSelect
    }
  ]
})
