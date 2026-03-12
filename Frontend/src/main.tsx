import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminPage from './page/Admin'
import BlogPage from './page/Blogs'
import LoginPage from './page/Login'
import RegisterPage from './page/Register'

const router = createBrowserRouter([
  {
    path: '/admin',
    Component: AdminPage
  },
  {
    path: '/post',
    Component: BlogPage
  },
  {
    path: '/register',
    Component: RegisterPage
  },
  {
    path: '/login',
    Component: LoginPage
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)