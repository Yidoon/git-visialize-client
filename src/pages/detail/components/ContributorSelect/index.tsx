import request from '@lib/request'
import { useEffect, useState } from 'react'
import { Select, SelectProps } from 'antd'
const { Option } = Select

interface IProps extends SelectProps {}
const ContributorSelect = (props: IProps) => {
  const [contributors, setContributors] = useState<string[]>([])
  const getContributors = async () => {
    const repoUrl = 'git@github.com:facebook/react.git'
    const res = await request.get('/api/contributors/local', {
      github_repo_url: repoUrl,
    })
    setContributors(res.data)
  }
  const options = contributors.map((c, index) => {
    return (
      <Option value={c} key={index}>
        {c}
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
