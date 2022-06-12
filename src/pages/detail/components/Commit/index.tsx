import ChartBox from '@comp/ChartBox'
import CommitPerYear from './commponents/CommitPerYear'
import CommitPerMonth from './commponents/CommitPerMonth'

const Commit = () => {
  return (
    <div className="commit h-full">
      <CommitPerYear />
      <CommitPerMonth />
    </div>
  )
}

export default Commit
