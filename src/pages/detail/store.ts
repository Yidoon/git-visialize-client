import { useState } from 'react'
import { ActiveKey } from './types'

const useStore = () => {
  const [activeKey, setActiveKey] = useState<ActiveKey>('commit')
  const navTo = (hashKey: string) => {
    window.location.hash = `#${hashKey}`
  }
  return { activeKey, setActiveKey, navTo }
}

export default useStore
