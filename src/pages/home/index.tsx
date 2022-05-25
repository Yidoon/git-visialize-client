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
      <h1 className="text-6xl">Visualize data of git repository</h1>
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
  const Header = (
    <div className="header-wrap mt-2 ">
      <a
        className="flex cursor-pointer"
        href="https://github.com/Yidoon/git-visualize"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
        <img className="ml-2" src="../../../public/images/external-link.svg" alt="" />
      </a>
    </div>
  )
  return (
    <div className="home">
      <div className="content">
        {Header}
        {Intro}
        {Search}
        {SignInGithubTips}
        {Example}
      </div>
    </div>
  )
}

export default Home
