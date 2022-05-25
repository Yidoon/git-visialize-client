import React, { useEffect } from 'react'
import styles from './index.module.less'
import request from '@lib/request'

const Test = () => {
  const getRepoInfo = async () => {
    const res = await fetch(
      'http://localhost:8000/gv/repo?github_repo_url=git@github.com:Yidoon/git-visualize.git',
      {
        method: 'GET',
        mode: 'no-cors',
        // body: JSON.stringify({
        //   github_repo_url: 'git@github.com:Yidoon/git-visualize.git',
        // }),
      },
    )
    console.log(res, '123')

    return res
  }
  const testApi = async () => {
    const res = await request.get('/api/gv/test', { name: 'Git-visualize' })
    console.log(res, 'request')
  }
  const init = async () => {
    // testApi()
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <div className={styles['test']}>
      <h1 className="">Hello Test</h1>
    </div>
  )
}

export default Test
