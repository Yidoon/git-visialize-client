import request from '@lib/request'
import { useEffect, useState } from 'react'
import { Select, SelectProps } from 'antd'
const { Option } = Select

interface IProps extends SelectProps {}
const ContributorSelect = (props: IProps) => {
  const [contributors, setContributors] = useState<
    Array<{ contributor: string; count: number }>
  >([])
  const getContributors = async () => {
    const repoUrl = 'git@github.com:facebook/react.git'
    const res = await request.get('/api/contributors/local', {
      github_repo_url: repoUrl,
    })
    setContributors(
      res.data.sort((a, b) => {
        return b.count - a.count
      }),
    )
  }
  const options = contributors.map((item, index) => {
    return (
      <Option value={item.contributor} key={index}>
        {item.contributor}
      </Option>
    )
  })

  useEffect(() => {
    getContributors()
  }, [])
  return (
    <Select placeholder="Select contributor" {...props}>
      {options}
    </Select>
  )
}

export default ContributorSelect
