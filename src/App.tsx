import { Routes, Route } from 'react-router-dom'
import './App.css'
import routes from './routes'
import 'antd/dist/antd.css'

function App() {
  const routesList = routes.map((item) => {
    return <Route path={item.path} element={<item.element />} key={item.key} />
  })

  return (
    <div className="App">
      <Routes>{routesList}</Routes>
    </div>
  )
}

export default App
