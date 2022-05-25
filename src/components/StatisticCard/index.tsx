import './index.less'
import { CSSProperties } from 'React'
import classnames from 'classnames'

const DEFAULT_NUMBER_COLOR = 'rgba(0,0,0,0.65)'

interface IProps {
  title?: React.ReactNode
  value: number | string
  color?: string
  unit?: string
  splitContent?: React.ReactNode
  className?: string
}
const StatisticCard = (props: IProps) => {
  const { title, value, color, unit, splitContent, className } = props
  const _className = classnames(className, 'statistic-card-wrap')
  const _style: CSSProperties = {
    color: color || DEFAULT_NUMBER_COLOR,
  }
  return (
    <div className={_className}>
      <div className="normal-content">
        <div className="title text-center">{title}</div>
        <div className="content">
          <div
            className="font-bold from-neutral-700 text-3xl text-center flex-1"
            style={_style}
          >
            {value}
          </div>
          {unit && <div className="ml-2">{unit}</div>}
        </div>
      </div>
      {splitContent && <div className="split-ontent ml-4 px-4">{splitContent}</div>}
    </div>
  )
}

export default StatisticCard
