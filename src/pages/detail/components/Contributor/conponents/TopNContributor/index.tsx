import request from '@lib/request'
import { IContributiorNameAndCount } from '@pages/detail/components/Commit/types'
import RankList from '@pages/detail/components/RankList'
import { map } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Button, InputNumber, Popover } from 'antd'
import ChartBox from '@comp/ChartBox'

const DOMID = 'top-n-contributor'
const DefaultN = 15

interface IProps {
  n?: number
}
const TopNContributor = (props: IProps) => {
  const { n } = props
  const [data, setData] = useState<IContributiorNameAndCount[]>([])
  const [nNumber, setNNumber] = useState<number>(DefaultN)
  const [isNInput, setIsNInput] = useState<boolean>(false)
  const isNInputRef = useRef<boolean>(false)
  const inputNumberDomRef = useRef<HTMLInputElement>(null)
  const tenpNRef = useRef<number>()
  const handleNInputBlur = () => {
    if (tenpNRef.current! > 10) {
      setNNumber(tenpNRef.current!)
    }
    setIsNInput(false)
    isNInputRef.current = true
  }
  const NInput = (
    <InputNumber
      ref={inputNumberDomRef}
      value={nNumber}
      onBlur={handleNInputBlur}
      autoFocus
      onPressEnter={(e: any) => {
        if (e.target.value > 10) {
          setNNumber(e.target.value as number)
        }
        setIsNInput(false)
        isNInputRef.current = false
      }}
      onChange={(val) => {
        tenpNRef.current = val
      }}
    />
  )
  const renderTopnNTitle = () => {
    return (
      <div>
        Top
        <Popover content={NInput} title={null} visible={isNInput}>
          <Button
            style={{ fontSize: '18px' }}
            type="link"
            onClick={() => {
              if (isNInputRef.current) {
                isNInputRef.current = false
                return
              }
              setIsNInput(true)
              isNInputRef.current = true
              setTimeout(() => {
                if (inputNumberDomRef.current) {
                  inputNumberDomRef.current.focus()
                }
              }, 100)
            }}
          >
            {nNumber}
          </Button>
        </Popover>
        contributor
      </div>
    )
  }
  const getTopNContributors = async () => {
    return request.get('/api/contributor/local', {
      github_repo_url: 'git@github.com:facebook/react.git',
      n: n || 10,
    })
  }
  const initChart = (data: IContributiorNameAndCount[]) => {
    const contributors = map(data, 'contributor')
    const counts = map(data, 'count')
    const option = {
      xAxis: {
        type: 'category',
        data: contributors,
        axisLabel: {
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: counts,
          type: 'bar',
        },
      ],
    }
    const myChart = echarts.init(document.getElementById(DOMID) as HTMLDivElement)
    myChart.setOption(option)
  }
  const init = async () => {
    const res = await getTopNContributors()
    initChart(res.data)
    console.log(res.data, 'ddd')
    setData(res.data)
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <ChartBox title={renderTopnNTitle()}>
      <div className="top-n-contributor h-96 flex">
        <div id={DOMID} className="flex-1"></div>
        <div className="w-60 rank">
          <RankList
            labelKey="contributor"
            take={10}
            sortKey="count"
            data={data}
            titleAddon="Author"
            renderItem={(item) => {
              return `${item.count}(${item.contributor})`
            }}
          />
        </div>
      </div>
    </ChartBox>
  )
}

export default TopNContributor
