import ChartBox from '@comp/ChartBox'
import { Button, InputNumber, Popover } from 'antd'
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import TopNContributor from './conponents/TopNContributor'

const DefaultN = 15
const Contributor = () => {
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
  return (
    <div className="contributor h-full">
      <ChartBox title={renderTopnNTitle()}>
        <TopNContributor n={DefaultN} />
      </ChartBox>
    </div>
  )
}

export default Contributor
