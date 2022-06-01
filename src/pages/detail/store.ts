import { useRef, useState } from 'react'
import { ActiveKey } from './types'

const useStore = () => {
  const [activeKey, setActiveKey] = useState<ActiveKey>('commit')
  const scrollModeRef = useRef<'click' | 'scroll' | undefined>(undefined)
  const navTo = (hashKey: string) => {
    window.location.hash = `#${hashKey}`
  }
  return { activeKey, setActiveKey, navTo, scrollModeRef }
}

export default useStore
