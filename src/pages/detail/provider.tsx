import React, { Dispatch, useState } from 'react'
import useStore from './store'
import { ActiveKey } from './types'

interface IState {
  activeKey: ActiveKey
}
const initialState: IState = {
  activeKey: 'commit',
}
interface IContext {
  activeKey: ActiveKey
  setActiveKey: Dispatch<ActiveKey>
}

export const DetailContext = React.createContext<ReturnType<typeof useStore>>(
  undefined as unknown as ReturnType<typeof useStore>,
)

const StoreProvider: React.FC = ({ children }) => {
  const store = useStore()
  return <DetailContext.Provider value={store || {}}>{children}</DetailContext.Provider>
}

export default StoreProvider
