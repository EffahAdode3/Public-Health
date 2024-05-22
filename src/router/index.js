import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import formData from '../views/FormData.vue'
import edu from '../views/EducationalBackground.vue'
import employhis from '../views/EmploymentHistory.vue'
import upload from '../views/UploadImage.vue'
import preview from '@/views/Preview.vue'
import component from '../components/VueWizard.vue'
import Uploadfile from '../views/UploadFiles.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/component',
      name: 'component',
      component: component
    },
    {
      path: '/preview',
      name: 'preview',
      component: preview
    },
    {
      path: '/registration',
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
    {
      path: '/Uploadfile',
      name: 'Uploadfile',
      component: Uploadfile
    },
  ]
})
export default router
