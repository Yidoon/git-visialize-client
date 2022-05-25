import './index.less'
import classnames from 'classnames'

interface ISider {
  className?: string
}
export const Sider: React.FC<ISider> = (props) => {
  const { children, className } = props
  const _classNames = classnames('sider', className)
  return <div className={_classNames}>{children}</div>
}

interface IContent {
  className?: string
}
export const Content: React.FC<IContent> = (props) => {
  const { children, className } = props
  const _classNames = classnames('content', className)
  return <div className={_classNames}>{children}</div>
}

interface IProps {
  className?: string
}
const Layout: React.FC<IProps> = (props) => {
  const { children, className } = props
  const _classNames = classnames('layout', className)
  return <div className={_classNames}>{children}</div>
}

export default Layout
