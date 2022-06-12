import ChartBox from '@comp/ChartBox'
import request from '@lib/request'

const Contributor = () => {
  const getContributorsComitCount = async () => {
    return request.get('/api/contributor/each_year_commit')
  }
  const initChart = () => {}
  const init = () => {}
  return <ChartBox title="Contributors commit count"></ChartBox>
}

export default Contributor
