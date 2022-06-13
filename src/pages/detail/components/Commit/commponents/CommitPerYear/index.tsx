import request from '@lib/request'
import { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { ICommitDateAndCount } from '../../types'
import { map } from 'lodash-es'
import RankList from '@pages/detail/components/RankList'
import ChartBox from '@comp/ChartBox'
import ContributorSelect from '@pages/detail/components/ContributorSelect'
import { Space } from 'antd'

const DOMID = 'commit-until-year'
const CommitPerYear = () => {
  const [data, setData] = useState<ICommitDateAndCount[]>([])

  const getCommitCount = async (contributor?: string): Promise<ICommitDateAndCount[]> => {
    return new Promise(async (resolve, reject) => {
      const repoUrl = 'git@github.com:facebook/react.git'
      const res = await request.get('/api/commit/commit_count', {
        github_repo_url: repoUrl,
        contributor: contributor || '',
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
    const data = await getCommitCount()
    setData(data)
    initChart(data)
  }
  const handleSelectChange = async (val: string) => {
    const data = await getCommitCount(val)
    setData(data)
    initChart(data)
  }
  const renderTitle = () => {
    return (
      <div className="per-month-title flex justify-between h-full">
        <div className="title">Number of commits per year</div>
        <div className="year-select">
          <Space size={8}>
            <ContributorSelect
              style={{ width: 240 }}
              allowClear
              onChange={handleSelectChange}
              showSearch
              filterOption
            />
          </Space>
        </div>
      </div>
    )
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <ChartBox title={renderTitle()}>
      <div className="h-96 flex">
        <div id="commit-until-year" className="flex-1"></div>
        <div className="w-60 rank">
          <RankList
            take={10}
            titleAddon="Year"
            data={data}
            renderItem={(item) => {
              return `${item.count}(${item.date})`
            }}
          />
        </div>
      </div>
    </ChartBox>
  )
}

export default CommitPerYear
