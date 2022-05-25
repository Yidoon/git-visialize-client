import Home from '@pages/home'
import Detail from '@pages/detail'
const routes = [
  {
    path: '/',
    element: Home,
    key: 'home',
  },
  {
    path: '/detail',
    element: Detail,
    key: 'detail',
  },
]

export default routes
