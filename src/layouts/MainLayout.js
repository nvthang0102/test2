import React, { useEffect, useState } from 'react'
import HeaderManger from '../components/header/HeaderManger'
import './Layout.scss'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Menu from '../components/menu/Menu'
import { notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { commonSelector } from '../service/selectors'
import { setNotify } from '../service/slices/CommonSlice'
import { IconDanger, IconSuccessNotify } from '../assets/icons'

const MainLayout = () => {
  const [showMenu, setShowMenu] = useState(false)
  const commonState = useSelector(commonSelector)
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useDispatch()
  console.log(commonState)
  const openNotification = () => {
    api.open({
      type: commonState.typeNotify,
      description: (
        <>
          <div className="flex  items-center">
            {commonState.typeNotify === 'success' ? (
              <IconSuccessNotify />
            ) : commonState.typeNotify === 'erorr' ? (
              <IconDanger />
            ) : (
              <IconDanger fill="#F2994A" />
            )}
            <div className="w-fit h-[24x] flex items-end ml-[8px]">
              <span className="leading-[16px]">{commonState.msg}</span>
            </div>
          </div>
        </>
      ),
      placement: 'top',
      duration: 4,
    })
  }
  useEffect(() => {
    if (commonState.isNotify) {
      openNotification()
    }
    const time = setTimeout(() => {
      dispatch(setNotify({ isNotify: false, msg: '', typeNotify: 'success' }))
    }, 1000)
    return () => clearTimeout(time)
  }, [commonState.isNotify])

  return (
    <>
      {contextHolder}
      <div
        className={` wrapperMainLayout md-mb:bg-bloginMB sm-tl:bg-bgloginTL bg-bgloginPC `}
      >
        {showMenu ? (
          <Menu setShowMenu={setShowMenu} showMenu={showMenu} />
        ) : null}
        <HeaderManger setShowMenu={setShowMenu} />
        <div className="contentMain">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}
export default MainLayout
