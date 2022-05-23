import request from '@lib/request'
import { useEffect, useState } from 'react'
import { IGeneralData } from '../../types'
import './index.less'

interface IProps {}
const GeneralInfo = (props: IProps) => {
  const [generalData, setGeneralData] = useState<IGeneralData | null>(null)

  const reqRepoInfo = async () => {
    const repoUrl = 'git@github.com:facebook/react.git'
    const accessToken = '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'
    const res = await request.get('/api/general', {
      github_repo_url: repoUrl,
      access_token: accessToken,
    })
    console.log(res, 'res')
  }
  useEffect(() => {
    // reqRepoInfo()
  }, [])
  return <div className="general-info">General info</div>
}

export default GeneralInfo
