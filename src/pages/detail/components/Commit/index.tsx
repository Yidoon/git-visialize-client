import request from '@lib/request'
import { useEffect } from 'react'
import * as echarts from 'echarts'
import ChartBox from '@comp/ChartBox'
import CommitUntilYear from './commponents/CommitPerYear'

type EChartsOption = echarts.EChartsOption

const Commit = () => {
  useEffect(() => {}, [])
  return (
    <div className="commit h-full">
      <ChartBox title="Number of commits per year">
        <CommitUntilYear />
      </ChartBox>
    </div>
  )
}

export default Commit
