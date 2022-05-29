import { DetailContext } from '@pages/detail/provider'
import { useContext } from 'react'
import Activity from '../Activity'
import Commit from '../Commit'
import Contributor from '../Contributor'

const RepoData = () => {
  const state = useContext(DetailContext)
  const { activeKey, setActiveKey } = state || {}
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
  return (
    <div className="repo-data text-center h-full">
      <div className="commit-wrap h-2/4" id="commit">
        <Commit />
      </div>
      <div className="contributor-wrap h-2/4" id="contributor">
        <Contributor />
      </div>
      <div className="activity-wrap h-2/4" id="activity">
        <Activity />
      </div>
      <div className="other-wrap h-2/4" id="other">
        other
      </div>
    </div>
  )
}

export default RepoData
