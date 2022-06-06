import { ItemGroup } from 'rc-menu'
import { useMemo } from 'react'

interface IProps {
  data: Array<any>
  render?: (item: any) => React.ReactNode
  labelKey?: string // default label
  sortKey?: string
  take?: number // default 10
}
const RankList = (props: IProps) => {
  const { data, render, labelKey = 'label', sortKey, take = 10 } = props
  const _list = useMemo(() => {
    if (sortKey) {
      return data
        .sort((a, b) => {
          return a[sortKey] - b[sortKey]
        })
        .slice(0, take)
    }
    return data.slice(0, take)
  }, [data, sortKey])
  const RankList = _list.map((item, index) => {
    return (
      <div className="rank-item flex justify-between h-7" key={index}>
        <div>{index + 1}</div>
        <div>{render ? render(item) : item[labelKey]}</div>
      </div>
    )
  })
  return <div className="rank-list flex flex-col p-4 mt-6">{RankList}</div>
}

export default RankList
