import { DetailContext } from '@pages/detail/provider'
import { useContext } from 'react'
import Activity from '../Activity'
import Commit from '../Commit'
import Contributor from '../Contributor'

const RepoData = () => {
  const state = useContext(DetailContext)
  const { activeKey, setActiveKey } = state
  const switchRender = () => {
    switch (activeKey) {
      case 'commit':
        return <Commit />
      case 'contributor':
        return <Contributor />
      case 'activity':
        return <Activity />
      case 'other':
        return 'other'
      default:
        return null
    }
  }
  return <div className="repo-data text-center">{switchRender()}</div>
}

export default RepoData
