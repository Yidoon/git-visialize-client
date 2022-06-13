import ChartBox from '@comp/ChartBox'
import request from '@lib/request'
import { useEffect } from 'react'
import * as echarts from 'echarts'

const DOMID = 'contributor-timezone'
const Timezone = () => {
  const getTimezone = async () => {
    return new Promise(async (resolve, reject) => {
      const repoUrl = 'git@github.com:facebook/react.git'
      const res = await request.get('/api/contributor/timezone', {
        github_repo_url: repoUrl,
      })
      resolve(res.data)
    })
  }
  const renderChart = (data) => {
    const _data = data.map((item) => {
      return {
        value: item.count,
        name: item.timezone,
      }
    })
    const option = {
      title: {
        text: 'Timezone of contributors',
        subtext: 'Fake Data',
        left: 'right',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: _data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    const myChart = echarts.init(document.getElementById(DOMID) as HTMLDivElement)
    myChart.setOption(option)
  }
  const init = async () => {
    const data = await getTimezone()
    console.log(data, 'Timezone')

    renderChart(data)
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <ChartBox title="Timezone">
      <div className="h-96 w-full" id={DOMID}></div>
    </ChartBox>
  )
}

export default Timezone
