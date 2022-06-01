import { DetailContext } from '@pages/detail/provider'
import { useContext, useEffect } from 'react'
import Activity from '../Activity'
import Commit from '../Commit'
import Contributor from '../Contributor'
import { throttle } from 'lodash-es'

const RepoData = () => {
  const state = useContext(DetailContext)
  const { activeKey, setActiveKey, scrollModeRef } = state || {}
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
  const getElsScreenScope = () => {
    const elIds = ['commit', 'contributor', 'activity', 'other']
    const scopeMap = new Map()
    elIds.forEach((el) => {
      const rect = document.getElementById(el)!.getBoundingClientRect()
      scopeMap.set(el, rect)
    })
    return scopeMap
  }
  const isCursorInElement = (e, el) => {
    const { top, bottom, left, right } = el.getBoundingClientRect()
    const { clientX, clientY } = e.target

    return clientX >= left && clientX <= right && clientY >= top && clientY <= bottom
  }
  const handleScrolling = throttle((e) => {
    const { scrollTop } = e.target
    const elsScope = getElsScreenScope()

    if (
      scrollModeRef.current === 'click' &&
      !isCursorInElement(e, document.getElementById('repo-data'))
    ) {
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
    console.log(123)

    document.getElementById('repo-data')!.addEventListener('mousemove', handleCursorMove)
  }
  useEffect(() => {
    syncScrollNav()
    bindCursorEvent()
  }, [])

  return (
    <div className="repo-data text-center h-full overflow-auto" id="repo-data">
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
