import './index.less'

interface ILoading {
  loading: boolean
}
const Loading: React.FC<ILoading> = (props) => {
  const { loading } = props
  const renderContent = () => {
    return loading ? (
      <div className="flex">
        <div className="flex-1 flex justify-center items-center align-center">
          <div>
            <img
              src="public/images/loading.svg"
              className="h-20 inline-block mr-3 loading-animate"
            />
            <p className="mt-2 text-center"> Loading...</p>
          </div>
        </div>
      </div>
    ) : (
      props.children
    )
  }
  return <div className="loading h-full">{renderContent()}</div>
}

export default Loading
