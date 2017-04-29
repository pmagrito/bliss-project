import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Questions from '@/components/Questions'
import Health from '@/components/Health'

Vue.use(VueResource)
Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [{
    path: '/',
    name: 'Health',
    component: Health
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  }]
})
