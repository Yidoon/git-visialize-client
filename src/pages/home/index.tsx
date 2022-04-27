import SearchInput from '@comp/SearchInput'
import './index.less'

const Home = () => {
  const Search = (
    <div className="search-wrap">
      <SearchInput />
    </div>
  )
  const Intro = (
    <div className="intro-wrap">
      <h1 className="text-6xl">Visualize git Repository</h1>
    </div>
  )
  const SignInGithubTips = (
    <div className="tip-text">Sign in with GitHub to view more detail of your repo</div>
  )
  const Example = (
    <div className="example-wrap">
      <img src="../../../public/images/Detail.png" alt="" />
    </div>
  )
  return (
    <div className="home">
      <div className="content">
        {Intro}
        {Search}
        {SignInGithubTips}
        {Example}
      </div>
    </div>
  )
}

export default Home
