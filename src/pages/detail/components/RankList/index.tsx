import { ItemGroup } from 'rc-menu'
import { useMemo } from 'react'

const colors = ['rgb(245,217,107)', 'rgba(211,212,213)', 'rgba(186,110,64)']
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
          return b[sortKey] - a[sortKey]
        })
        .slice(0, take)
    }
    return data.slice(0, take)
  }, [data, sortKey])

  const RankList = _list.map((item, index) => {
    return (
      <div className="rank-item flex justify-between h-7" key={index}>
        <div
          className="h-6 w-6 items-center self-center"
          style={{
            borderRadius: '50%',
            backgroundColor: colors[index] || '',
            color: colors[index] ? '#fff' : '',
            lineHeight: '24px',
          }}
        >
          {index + 1}
        </div>
        <div>{render ? render(item) : item[labelKey]}</div>
      </div>
    )
  })
  return (
    <div className="rank-list flex flex-col p-4 mt-6">
      <div className="rank-wrap">
        <div className="flex justify-between h-7">
          <div>Rank</div>
          <div>Commit count(Year)</div>
        </div>
        {RankList}
      </div>
    </div>
  )
}

export default RankList
