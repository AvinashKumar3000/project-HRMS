import { Routes, Route } from 'react-router'
import './App.css'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <Routes>
      <Route path='' Component={LoginPage}></Route>
      <Route path='/dash' Component={DashboardPage}></Route>
    </Routes>
  )
}

export default App
