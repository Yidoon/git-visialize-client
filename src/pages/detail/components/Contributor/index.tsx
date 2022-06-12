import TopNContributor from './conponents/TopNContributor'

const DefaultN = 15
const Contributor = () => {
  return (
    <div className="contributor h-full">
      <TopNContributor n={DefaultN} />
    </div>
  )
}

export default Contributor
