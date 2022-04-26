import Home from '@pages/home'
import RepoStats from '@pages/repo_stats'
const routes = [
  {
    path: '/',
    element: Home,
    key: 'home',
  },
  {
    path: '/repo-stats',
    element: RepoStats,
    key: 'repo-stats',
  },
]

export default routes
