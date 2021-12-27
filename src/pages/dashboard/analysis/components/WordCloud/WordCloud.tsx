import React, { useState } from 'react'
import Select from 'antd/es/select'
import Echarts from './Echarts'
import { wordcloud } from './echart-wordcloud'
// import { authorMap } from '../const'

const { Option } = Select

function AuthorWordCloud ({ data }: any) {
  const author = [
    'all',
    ...Object.keys(data).filter(name => name !== 'all')
  ]
  const [selectAuthor, setSelectAuthor] = useState(author[0]) // 默认选中所有人
  console.log(data, 'datadatadata');
  
  const updateSelect = value => {
    setSelectAuthor(value)
  }
  return <div>
    <h2 className="vsz-title">
      <span>不同用户 commit 信息文案分析</span>
    </h2>
    {/* <Select
      style={{ width: 200 }}
      value={selectAuthor}
      onChange={updateSelect}
    >
      {
        author.map(item => {
          return <Option value={item} key={item} >{authorMap[item] || item}</Option>
        })
      }
    </Select> */}
    <Echarts chartData={wordcloud(data[selectAuthor])} />
  </div>
}

export default AuthorWordCloud
