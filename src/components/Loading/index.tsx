interface ILoading {
  loading: boolean
}
const Loading: React.FC<ILoading> = (props) => {
  const { loading } = props
  const renderContent = () => {
    return loading ? <span>Loading...</span> : props.children
  }
  return <div className="loading">{renderContent()}</div>
}

export default Loading
