import request from '@lib/request'
import { map } from 'lodash-es'
import { useEffect } from 'react'
import { ICommitDateAndCount } from '../../types'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

const DOMID = 'commit-per-month'
interface IProps {
  year: string
}
const CommitPerMonth = (props: IProps) => {
  const { year } = props
  const getCommitPerMonth = async (): Promise<ICommitDateAndCount[]> => {
    return new Promise(async (resolve, reject) => {
      const repoUrl = 'git@github.com:facebook/react.git'
      const res = await request.get('/api/commit/year', {
        github_repo_url: repoUrl,
        year: year,
      })
      resolve(res.data)
    })
  }
  const initChart = (data: ICommitDateAndCount[]) => {
    const years = map(data, 'date')
    const counts = map(data, 'count')

    const option = {
      xAxis: {
        type: 'category',
        data: years,
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
    const data = await getCommitPerMonth()
    initChart(data)
  }
  useEffect(() => {
    init()
  }, [year])

  return <div className="h-96" style={{ width: '95%' }} id={DOMID}></div>
}

export default CommitPerMonth
