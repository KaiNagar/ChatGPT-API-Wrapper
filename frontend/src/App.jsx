import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/styles/style.scss'

import { Home } from './pages/Home'


import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

export function App() {
  return (
    <Router>
      <div className='App'>
        <AppHeader />
        <div className='main-container'>
          <div className='main container'>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </div>
        <AppFooter />
      </div>
    </Router>
  )
}

export default App
