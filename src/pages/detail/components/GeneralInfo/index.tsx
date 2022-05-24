import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
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
  return (
    <div className="general-info">
      <div>
        <FontAwesomeIcon icon={faGithub} />
        Project: react
      </div>
      <div>Age: 8 year 364 day</div>
      <div>Created at: 2013-05-25 12:15:54</div>
      <div>Stars: 187597</div>
      <div>License: MIT License</div>
      <div>Code count: 596151</div>
      <div>File count: 2433</div>
      <div>Contriburots count: 1720</div>
      <div>Volume: 174.42 MB</div>
      <div>Commit count: 123602</div>
      <div className="collect-time">latest update 2022-05-22 13:20:56</div>
    </div>
  )
}

export default GeneralInfo
