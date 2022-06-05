import request from '@lib/request'
import { Select, SelectProps } from 'antd'
import dayjs from 'dayjs'
import { reverse } from 'lodash-es'
import { useEffect, useState } from 'react'

const { Option } = Select

interface IProps extends SelectProps {}
const PerYearSelect = (props: IProps) => {
  const [years, setYears] = useState<Array<number>>([])

  const options = years.map((yearUnix) => {
    let year = dayjs.unix(+yearUnix).format('YYYY')
    return (
      <Option value={year} key={year}>
        {year}
      </Option>
    )
  })

  const getPerYear = async () => {
    const repoUrl = 'git@github.com:facebook/react.git'
    const res = await request.get('/api/common/per_year', {
      github_repo_url: repoUrl,
    })
    setYears(reverse(res.data))
  }

  useEffect(() => {
    getPerYear()
  }, [])
  return (
    <Select placeholder="select year" {...props}>
      {options}
    </Select>
  )
}

export default PerYearSelect
