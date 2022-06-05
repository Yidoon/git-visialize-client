import request from '@lib/request'
import { useEffect } from 'react'
import * as echarts from 'echarts'
import { ICommitDateAndCount } from '../../types'
import { map } from 'lodash-es'

const DOMID = 'commit-until-year'
const CommitPerYear = () => {
  const getCommitPerYear = async (): Promise<ICommitDateAndCount[]> => {
    return new Promise(async (resolve, reject) => {
      const repoUrl = 'git@github.com:facebook/react.git'
      const res = await request.get('/api/commit/until_year', {
        github_repo_url: repoUrl,
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
    const data = await getCommitPerYear()
    console.log(data, 'ddd')

    initChart(data)
  }
  useEffect(() => {
    init()
  }, [])

  return <div className="h-96" style={{ width: '95%' }} id="commit-until-year"></div>
}

export default CommitPerYear
