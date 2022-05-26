import { DetailContext } from '@pages/detail/provider'
import { ActiveKey } from '@pages/detail/types'
import classnames from 'classnames'
import { useContext, useMemo, useState } from 'react'
import './index.less'

const Navigation = () => {
  const state = useContext(DetailContext)
  const { activeKey, setActiveKey } = state
  const navList = [
    {
      name: 'Commits',
      key: 'commit',
    },
    {
      name: 'Contributor',
      key: 'contributor',
    },
    {
      name: 'Activity',
      key: 'activity',
    },
    {
      name: 'Other',
      key: 'other',
    },
  ]
  const handleNavClick = (key: ActiveKey) => {
    setActiveKey(key)
  }
  const lis = useMemo(() => {
    return navList.map((item) => {
      const liClassNames = classnames(
        'navigation-item',
        item.key === activeKey ? 'active-item' : '',
      )
      return (
        <li
          className={liClassNames}
          key={item.key}
          onClick={() => {
            handleNavClick(item.key as ActiveKey)
          }}
        >
          {item.name}
        </li>
      )
    })
  }, [activeKey])

  return (
    <div className="navigation">
      <ul>{lis}</ul>
    </div>
  )
}

export default Navigation
