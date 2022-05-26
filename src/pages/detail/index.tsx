import StatisticCard from '@comp/StatisticCard'
import './index.less'
import Layout, { Sider, Content } from '@comp/Layout'
import GeneralInfo from './components/GeneralInfo'
import LogoText from './components/LogoText'
import Navigation from './components/Navigation'

const CardCommonClass = 'mr-6'
const Detail = () => {
  return (
    <div className="detail h-full-height">
      <Layout>
        <Sider className="detail-sider">
          <LogoText />
          <Navigation />
          <GeneralInfo />
        </Sider>
        <Content className="detail-content">Content</Content>
      </Layout>
    </div>
  )
}

export default Detail
