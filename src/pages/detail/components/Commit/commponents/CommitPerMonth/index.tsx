import request from '@lib/request'
import { clone, map } from 'lodash-es'
import { useEffect, useState } from 'react'
import { ICommitDateAndCount } from '../../types'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import RankList from '@pages/detail/components/RankList'
import { getMonthName } from '@utils'
import ChartBox from '@comp/ChartBox'
import PerYearSelect from '@pages/detail/components/PerYearSelect'
import ContributorSelect from '@pages/detail/components/ContributorSelect'
import { Space, Form } from 'antd'

const DOMID = 'commit-per-month'
const DefaultYear = dayjs().year()

const CommitPerMonth = () => {
  const [data, setData] = useState<ICommitDateAndCount[]>([])
  const [searchForm] = Form.useForm()
  const handleFormChange = () => {
    const values = searchForm.getFieldsValue()
    renderChart(values)
  }
  const PerMonthTitle = (
    <div className="per-month-title flex justify-between h-full items-center">
      <div className="title">Number of commits per month</div>
      <div className="year-select">
        <Form form={searchForm} initialValues={{ year: DefaultYear }}>
          <Space size={8}>
            <Form.Item name="year" style={{ marginBottom: 0 }}>
              <PerYearSelect style={{ width: 240 }} onChange={handleFormChange} />
            </Form.Item>
            <Form.Item name="contributor" style={{ marginBottom: 0 }}>
              <ContributorSelect
                style={{ width: 240 }}
                allowClear
                onChange={handleFormChange}
                showSearch
                filterOption
              />
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  )
  const getCommitPerMonth = async (params?: {
    year?: number
    contributor?: string
  }): Promise<ICommitDateAndCount[]> => {
    const { year, contributor } = params || {}
    return new Promise(async (resolve, reject) => {
      const repoUrl = 'git@github.com:facebook/react.git'
      const res = await request.get('/api/commit/year', {
        github_repo_url: repoUrl,
        year: year || '',
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
  const renderChart = async (params?: { year?: number; contributor?: string }) => {
    const data = await getCommitPerMonth(params)
    setData(data)
    initChart(data)
  }
  const init = async () => {
    renderChart()
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <ChartBox title={PerMonthTitle}>
      <div className="h-96 flex">
        <div className="flex-1" id={DOMID}></div>
        <div className="w-60 rank">
          <RankList
            labelKey="date"
            take={10}
            data={clone(data)}
            titleAddon="Month"
            sortKey="count"
            renderItem={(item) => {
              return `${item.count}(${getMonthName(item.date)})`
            }}
          />
        </div>
      </div>
    </ChartBox>
  )
}

export default CommitPerMonth
