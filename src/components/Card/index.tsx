import 'index.less'

interface IProps {
  title?: React.ReactNode
  content?: React.ReactNode
}
const Card = (props: IProps) => {
  const { title, content } = props
  return <div className="card"></div>
}

export default Card
