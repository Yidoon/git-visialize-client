import ChartBox from '@comp/ChartBox'
import CommitUntilYear from './commponents/CommitPerYear'
import CommitPerMonth from './commponents/CommitPerMonth'
import PerYearSelect from '../PerYearSelect'
import dayjs from 'dayjs'
import { useState } from 'react'

const DefaultYear = dayjs().year()
const Commit = () => {
  const [selectYear, setSelectYear] = useState<string>(String(DefaultYear))
  const handleYearChange = (year: string) => {
    setSelectYear(year)
  }
  const PerMonthTitle = (
    <div className="per-month-title flex justify-between h-full">
      <div className="title">Number of commits per month</div>
      <div className="year-select">
        <PerYearSelect
          style={{ width: 240 }}
          value={selectYear}
          onChange={handleYearChange}
        />
      </div>
    </div>
  )
  return (
    <div className="commit h-full">
      <ChartBox title="Number of commits per year">
        <CommitUntilYear />
      </ChartBox>
      <ChartBox title={PerMonthTitle}>
        <CommitPerMonth year={selectYear} />
      </ChartBox>
    </div>
  )
}

export default Commit
