import './index.less'
import classnames from 'classnames'

interface IProps {
  className?: string
  placeholder?: string
}
const SearchInput = (props: IProps) => {
  const { className, placeholder } = props
  const _classNames = classnames(className, 'search-input-wrap')

  return (
    <div className={_classNames}>
      <input type="text" placeholder={placeholder} className="search-input" />
    </div>
  )
}

export default SearchInput
