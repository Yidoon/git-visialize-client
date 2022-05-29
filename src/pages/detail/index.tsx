import StatisticCard from '@comp/StatisticCard'
import './index.less'
import Layout, { Sider, Content } from '@comp/Layout'
import GeneralInfo from './components/GeneralInfo'
import LogoText from './components/LogoText'
import Navigation from './components/Navigation'
import RepoData from './components/RepoData'
import StoreProvider from './provider'

const Detail = () => {
  return (
    <StoreProvider>
      <div className="detail h-full-height">
        <Layout>
          <Sider className="detail-sider">
            <LogoText />
            <Navigation />
            <GeneralInfo />
          </Sider>
          <Content className="detail-content overflow-auto">
            <RepoData />
          </Content>
        </Layout>
      </div>
    </StoreProvider>
  )
}

export default Detail
