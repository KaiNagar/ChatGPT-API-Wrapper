import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/styles/style.scss'

import { Home } from './pages/Home'


import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { Chat } from './pages/Chat'
import { UserMsg } from './cmps/user-msg'

export function App() {
  return (
    <Router>
      <div className='App'>
        <AppHeader />
        <div className='main-container'>
          <div className='main container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/chat' element={<Chat />} />
            </Routes>
          </div>
        </div>
        <UserMsg />
        <AppFooter />
      </div>
    </Router>
  )
}

export default App
