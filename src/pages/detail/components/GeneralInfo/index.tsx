import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import request from '@lib/request'
import { useEffect, useState } from 'react'
import { IGeneralData } from '../../types'
import './index.less'
import classnames from 'classnames'
import Loading from '@comp/Loading'

interface IItem {
  iconUrl: string
  value: React.ReactNode
  label: React.ReactNode
  link?: string
}
const Item = (props: IItem) => {
  const { iconUrl, value, label, link } = props
  const _classNames = classnames('flex items-center h-8 text-base space-x-2', {
    underline: link,
  })
  const ItemContent = (
    <>
      <img src={iconUrl} alt="" className="h-5" />
      <span>{`${label}: ${value}`}</span>
    </>
  )
  const renderContent = () => {
    return link ? (
      <a className={_classNames} href={link}>
        {ItemContent}
      </a>
    ) : (
      <div className={_classNames}>{ItemContent}</div>
    )
  }
  return renderContent()
}

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
    setGeneralData(res.data)
  }

  useEffect(() => {
    reqRepoInfo()
  }, [])
  console.log(generalData, 'generalData')

  return (
    <div className="general-info ml-6 space-y-1">
      <Loading loading={!generalData}>
        <Item
          iconUrl="../../../../../public/images/github-fill.svg"
          value={generalData?.name}
          label="Project"
          link="https://github.com/facebook/react"
        />
        <Item
          iconUrl="../../../../../public/images/law.svg"
          value={generalData?.license}
          label="License"
        />
        <Item
          iconUrl="../../../../../public/images/birthday.svg"
          value={generalData?.age}
          label="Age"
        />
        <Item
          iconUrl="../../../../../public/images/star.svg"
          value={generalData?.star}
          label="Stars"
        />
        <Item
          iconUrl="../../../../../public/images/code.svg"
          value={generalData?.code_count.total}
          label="Code count"
        />
        <Item
          iconUrl="../../../../../public/images/file.svg"
          value={generalData?.file_count}
          label="File count"
        />
        <Item
          iconUrl="../../../../../public/images/people.svg"
          value={generalData?.contributor_count}
          label="Contriburot count"
        />
        <Item
          iconUrl="../../../../../public/images/storage.svg"
          value={generalData?.volume}
          label="Volume"
        />
        <Item
          iconUrl="../../../../../public/images/git-commit.svg"
          value={generalData?.commit_count}
          label="Commit count"
        />
        {/* <div>Created at: 2013-05-25 12:15:54</div> */}
        <div className="collect-time">latest update 2022-05-22 13:20:56</div>
      </Loading>
    </div>
  )
}

export default GeneralInfo
