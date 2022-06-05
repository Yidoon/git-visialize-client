import { DetailContext } from '@pages/detail/provider'
import { useContext, useEffect } from 'react'
import Activity from '../Activity'
import Commit from '../Commit'
import Contributor from '../Contributor'
import { throttle } from 'lodash-es'
import './index.less'

const RepoData = () => {
  const state = useContext(DetailContext)
  const { setActiveKey, scrollModeRef } = state || {}
  const getElsScreenScope = () => {
    const elIds = ['commit', 'contributor', 'activity', 'other']
    const scopeMap = new Map()
    elIds.forEach((el) => {
      const rect = document.getElementById(el)!.getBoundingClientRect()
      scopeMap.set(el, rect)
    })
    return scopeMap
  }
  const handleScrolling = throttle((e) => {
    const { scrollTop } = e.target
    const elsScope = getElsScreenScope()

    if (scrollModeRef.current === 'click') {
      return
    }
    for (const rect of elsScope) {
      const { top, bottom } = rect[1]
      if (scrollTop >= top && scrollTop <= bottom) {
        setActiveKey(rect[0])
        break
      }
    }
  })
  const syncScrollNav = () => {
    document.getElementById('repo-data')!.addEventListener('scroll', handleScrolling)
  }
  const handleCursorMove = throttle(() => {
    scrollModeRef.current = undefined
  })
  const bindCursorEvent = () => {
    document.getElementById('repo-data')!.addEventListener('mousemove', handleCursorMove)
  }
  useEffect(() => {
    syncScrollNav()
    bindCursorEvent()
  }, [])

  return (
    <div className="repo-data-wrap text-center h-full overflow-auto" id="repo-data">
      <div className="commit-wrap" id="commit">
        <Commit />
      </div>
      <div className="contributor-wrap" id="contributor">
        <Contributor />
      </div>
      <div className="activity-wrap" id="activity">
        <Activity />
      </div>
      <div className="other-wrap" id="other">
        other
      </div>
    </div>
  )
}

export default RepoData
