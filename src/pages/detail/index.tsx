import StatisticCard from '@comp/StatisticCard'
import './index.less'
import Layout, { Sider, Content } from '@comp/Layout'
import GeneralInfo from './components/GeneralInfo'
import LogoText from './components/LogoText'
import Navigation from './components/Navigation'

const CardCommonClass = 'mr-6'
const Detail = () => {
  const HeaderInfo = (
    <div className="h-20 border-solid border border-slate-200">data of repo</div>
  )
  const splitContent1 = (
    <div className="h-full flex flex-col justify-center">
      <div className="text-emerald-500">Add: 12345</div>
      <div className="text-rose-500">Delete: 213243</div>
    </div>
  )
  const Content1 = (
    <div className="content p-6">
      <StatisticCard
        className={CardCommonClass}
        title="运行天数"
        value={1000}
        color="rgba(0, 128, 0, 1)"
        unit="天"
      />
      <StatisticCard
        className={CardCommonClass}
        title="体积"
        value={65}
        color="rgba(0, 128, 0, 1)"
        unit="MB"
      />
      <StatisticCard
        className={CardCommonClass}
        title="文件数量"
        value={165}
        color="#3f6212"
      />
      <StatisticCard
        className={CardCommonClass}
        title="Star"
        value={187}
        unit="K"
        color="#3f6212"
      />
      <StatisticCard
        className={CardCommonClass}
        title="Watch"
        value={1.7}
        unit="K"
        color="#3f6212"
      />
      <StatisticCard
        className={CardCommonClass}
        title="Fork"
        value={40.1}
        unit="K"
        color="#3f6212"
      />
      <StatisticCard
        className={CardCommonClass}
        title="License"
        value="MIT"
        color="#3f6212"
      />
      <StatisticCard
        className={CardCommonClass}
        title="commit总数"
        value={1124}
        color="#f59e0b"
      />
      <StatisticCard
        title="代码行数"
        className={CardCommonClass}
        value={1124}
        color="#f59e0b"
        splitContent={splitContent1}
      />
      <StatisticCard
        className={CardCommonClass}
        title="贡献者数量"
        value={27}
        color="#a16207"
      />
    </div>
  )

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
