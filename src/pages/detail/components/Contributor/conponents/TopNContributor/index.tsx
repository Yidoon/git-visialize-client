import request from '@lib/request'
import { IContributiorNameAndCount } from '@pages/detail/components/Commit/types'
import RankList from '@pages/detail/components/RankList'
import { map } from 'lodash-es'
import { useEffect, useState } from 'react'
import * as echarts from 'echarts'

const DOMID = 'top-n-contributor'
interface IProps {
  n?: number
}
const TopNContributor = (props: IProps) => {
  const { n } = props
  const [data, setData] = useState<IContributiorNameAndCount[]>([])
  const getTopNContributors = async () => {
    return request.get('/api/contributor/local', {
      github_repo_url: 'git@github.com:facebook/react.git',
      n: n || 10,
    })
  }
  const initChart = (data: IContributiorNameAndCount[]) => {
    const contributors = map(data, 'contributor')
    const counts = map(data, 'count')
    const option = {
      xAxis: {
        type: 'category',
        data: contributors,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: counts,
          type: 'bar',
        },
      ],
    }
    const myChart = echarts.init(document.getElementById(DOMID) as HTMLDivElement)
    myChart.setOption(option)
  }
  const init = async () => {
    const res = await getTopNContributors()
    initChart(res.data)
    console.log(res.data, 'ddd')

    setData(data)
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div className="top-n-contributor h-96 flex">
      <div id={DOMID} className="flex-1"></div>
      <div className="w-60 rank">
        <RankList
          labelKey="contributor"
          take={10}
          data={data}
          render={(item) => {
            return `${item.date}(${item.contributor})`
          }}
        />
      </div>
    </div>
  )
}

export default TopNContributor
