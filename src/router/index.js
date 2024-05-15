import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import formData from '../views/FormData.vue'
import edu from '../views/EducationalBackground.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Registration',
      name: 'Register',
      component: Register
    },
  
    {
      path: '/formData',
      name: 'formData',
      component: formData
    },
    {
      path: '/edu',
      name: 'edu',
      component: edu
    },
  ]
})
export default router
