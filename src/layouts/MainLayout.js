import React, { useState } from 'react'
import HeaderManger from '../components/header/HeaderManger'
import './Layout.scss'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Menu from '../components/menu/Menu'

const MainLayout = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div
      className={`wrapperMainLayout md-mb:bg-bloginMB sm-tl:bg-bgloginTL bg-bgloginPC `}
    >
      {showMenu ? <Menu setShowMenu={setShowMenu} showMenu={showMenu} /> : null}
      <HeaderManger setShowMenu={setShowMenu} />
      <div className="contentMain">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default MainLayout
