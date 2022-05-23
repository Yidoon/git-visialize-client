import classnames from 'classnames'
import { useMemo, useState } from 'react'
import './index.less'

const Navigation = () => {
  const [activeKey, setActiveKey] = useState<string>('commit')
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
  const handleNavClick = (key: string) => {
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
            handleNavClick(item.key)
          }}
        >
          {item.name}
        </li>
      )
    })
  }, [activeKey])
  return (
    <div className="navigation">
      <ul>
        {lis}
        {/* <li className="navigation-item active-item">Commit</li>
        <li className="navigation-item">Contributor</li>
        <li className="navigation-item">Activity</li>
        <li className="navigation-item">Other</li> */}
      </ul>
    </div>
  )
}

export default Navigation
