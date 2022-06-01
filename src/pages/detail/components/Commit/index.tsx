import request from '@lib/request'
import { useEffect } from 'react'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

const Commit = () => {
  const getCommitUntilYear = async () => {
    console.log('start')

    const repoUrl = 'git@github.com:facebook/react.git'
    const res = await request.get('/api/commit/until_year', {
      github_repo_url: repoUrl,
    })
    console.log(res, 'getCommitUntilYear')
  }
  const renderUntilYear = () => {
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    }
    const myChart = echarts.init(
      document.getElementById('commit-until-year') as HTMLDivElement,
    )
    myChart.setOption(option)
  }
  useEffect(() => {
    getCommitUntilYear()
    renderUntilYear()
  }, [])
  return (
    <div className="commit h-full">
      <div className="h-96" id="commit-until-year"></div>
    </div>
  )
}

export default Commit
