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

export const DetailContext = React.createContext<IContext>(
  undefined as unknown as IContext,
)

const StoreProvider: React.FC = ({ children }) => {
  const store = useStore()
  return <DetailContext.Provider value={store}>{children}</DetailContext.Provider>
}

export default StoreProvider
