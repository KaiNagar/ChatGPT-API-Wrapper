import {  NavLink } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <section className='app-header-constainer '>
      <div className='app-header container flex align-center'>
        <NavLink className='header-link' to='/'>
          Home
        </NavLink>
        <NavLink className='header-link' to='/chat'>
          Chat
        </NavLink>
        <NavLink className='header-link' to='/products'>
          Products
        </NavLink>
        
      </div>
    </section>
  )
}
