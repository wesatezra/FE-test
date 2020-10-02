import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddMember from '../views/AddMember.vue'
import Appointment from '../views/Appointment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AddMember',
    name: 'AddMember',
    component: AddMember
  },
  {
    path: '/Appointment',
    name: 'Appointment',
    component: Appointment
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
