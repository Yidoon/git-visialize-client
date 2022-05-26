import { useState } from "react"
import { ActiveKey } from "./types"

const useStore = () => {
  const [activeKey, setActiveKey] = useState<ActiveKey>('commit')
  return { activeKey, setActiveKey }
}

export default useStore
