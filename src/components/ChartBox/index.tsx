import './index.less'

interface IProps {
  title?: React.ReactNode
  content?: React.ReactNode
}
const ChartBox: React.FC<IProps> = (props) => {
  const { title, children } = props
  return (
    <div className="chart-box flex flex-col">
      {title && <div className="chart-title">{title}</div>}
      <div className="chart-content flex-1">{children}</div>
    </div>
  )
}

export default ChartBox
