import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import formData from '../views/FormData.vue'
import edu from '../views/EducationalBackground.vue'
import employhis from '../views/EmploymentHistory.vue'
import upload from '../views/UploadImage.vue'

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
    {
      path: '/employhis',
      name: 'employhis',
      component: employhis
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
  ]
})
export default router
