import React, { useEffect, useState } from 'react'
import './Menu.scss'
import {
  IconAccount,
  IconAnalytics,
  IconArrowRight,
  IconAvatarMenu,
  IconBottom,
  IconCard,
  IconCardMenu,
  IconCart,
  IconContact,
  IconInformation,
  IconLogout,
  IconRight,
  IconUpLevel,
  IconXmark,
} from '../../assets/icons'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Button, Menu } from 'antd'
import ModalNotifyImproving from '../popup/ModalNotifyImproving'
import BaseButton from '../button/BaseButton'
import { useCookies } from 'react-cookie'

const SideBar = ({ showMenu, setShowMenu }) => {
  const navigate = useNavigate()
  const [showModalNotify, setShowModalNotify] = useState(false)
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }
  const [cookies, setCookie, removeCookie] = useCookies([
    'auth-token',
    'auth-id',
    'current-user-avatar',
    'current-user-shortcut',
    'auth-token-2',
  ])
  const rootSubmenuKeys = ['accout', 'info', 'order']
  const [openKeys, setOpenKeys] = useState([undefined])
  const [selectedKey, setSelectedKey] = useState(
    window.location.pathname === '/'
      ? '/account_manager'
      : window.location.pathname
  )
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  useEffect(() => {
    setSelectedKey(
      window.location.pathname === '/'
        ? '/account_manager'
        : window.location.pathname
    )
  }, [window.location.pathname])
  const handleChangePage = (value) => {
    navigate(`/${value}`, {})
    setShowMenu(false)
  }
  return (
    <>
      <div onClick={() => setShowMenu(false)} className="overlayMenu"></div>
      {showModalNotify ? (
        <ModalNotifyImproving
          open={showModalNotify}
          setOpen={setShowModalNotify}
        />
      ) : null}
      <Menu
        className={`wrapperSideBar flex flex-col ${
          showMenu ? 'slide-in' : 'slide-out'
        }`}
        // defaultSelectedKeys={['account_manager']}
        mode="inline"
        openKeys={openKeys}
        defaultOpenKeys={['sub1']}
        selectedKeys={selectedKey}
        onOpenChange={onOpenChange}
      >
        <div className="headeMenu">
          <IconXmark onClick={() => setShowMenu(false)} />
          <div
            onClick={() => {
              window.location.href = `https://onthedesk.vn/${cookies['current-user-shortcut']}`
            }}
            className="backMenu cursor-pointer  text-labelText"
          >
            <div className="avatarMenu">
              <IconAvatarMenu />
            </div>
            <span>Hoàng Lê</span>
          </div>
          <Menu.SubMenu
            title={
              <div className="flex items-center nameItemMenu ">
                <span className="text-labelText">Tài Khoản</span>
                {openKeys.indexOf(undefined) === -1 ? (
                  <IconRight />
                ) : (
                  <IconBottom />
                )}
              </div>
            }
            icon={<IconAccount />}
            key={'sub1'}
          >
            <Menu.Item
              // icon={<IconAccount />}
              className="flex justify-end "
              key={'/account_manager'}
              onClick={() => {
                setSelectedKey('/account_manager')
                handleChangePage('account_manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="nameItemMenu subItem pl-[8px]">
                  <div className="  text-labelText">Quản lý tài khoản</div>
                </div>
              </Row>
            </Menu.Item>
            <Menu.Item
              // icon={<IconAccount />}
              key={'/service_manager'}
              onClick={() => {
                // setSelectedKey('/service_manager')
                setSelectedKey('/account_manager')
                setShowModalNotify(true)
                // handleChangePage('account_manager')
                // handleChangePage('service_manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="pl-[8px] subItem nameItemMenu">
                  <span className="text-labelText">Quản lý dịch vụ</span>
                </div>
              </Row>
            </Menu.Item>
            <Menu.Item
              // icon={<IconAccount />}
              key={'/card-manager'}
              onClick={() => {
                setSelectedKey('/card-manager')
                handleChangePage('card-manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="pl-[8px] subItem nameItemMenu">
                  <span className="text-labelText">Quản lý thẻ</span>
                </div>
              </Row>
            </Menu.Item>
            <Menu.Item
              // icon={<IconAccount />}
              key={'/info_manager'}
              onClick={() => {
                // setSelectedKey('/info_manager')
                // setSelectedKey('/account_manager')
                setShowModalNotify(true)
                // handleChangePage('account_manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="pl-[8px] subItem nameItemMenu">
                  <span className="text-labelText">Quản lý hồ sơ</span>
                </div>
              </Row>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            icon={<IconAnalytics />}
            key={'/statistics_manager'}
            onClick={() => {
              // setSelectedKey('/account_manager')
              // setSelectedKey('/statistics_manager')
              setShowModalNotify(true)
              // handleChangePage('account_manager')
              // handleChangePage('')
            }}
            className="w-full"
          >
            <div className="nameItemMenu justify-between flex items-center">
              <span className="text-labelText">Thống kê</span>
              <span>
                <IconUpLevel />
              </span>
            </div>
          </Menu.Item>
          <Menu.Item
            icon={<IconCart />}
            key={'/order'}
            onClick={() => {
              // setSelectedKey('/order')
              // setSelectedKey('/account_manager')
              setShowModalNotify(true)
              // handleChangePage('account_manager')
            }}
            className="w-full"
          >
            <div className="nameItemMenu">
              <span className="text-labelText">Đơn hàng</span>
            </div>
          </Menu.Item>
        </div>
        <div className="footerSideBar">
          <BaseButton
            handleClick={() => handleChangePage('card-manager')}
            className={'text-[12px] w-full'}
            content={
              <div className="flex items-center">
                <IconCardMenu className="mr-[6px]" /> Thêm thẻ
              </div>
            }
          />
          <hr className="bg-[white] opacity-1 mt-[12px] h-[2px]" />
          <div className="itemMenuFooter cursor-pointer flex items-center px-[8px] py-[6px]">
            <IconContact opacity={0.6} />{' '}
            <span className="ml-3 text-[15px] text-labelText">Liên hệ</span>
          </div>
          <div
            onClick={() => {
              setCookie('auth-id', '', {
                maxAge: 0,
                domain: '.onthedesk.vn',
              })
              setCookie('auth-id', '', {
                maxAge: 0,
                domain: '.onthedesk.vn',
              })
              setCookie('auth-token', 'fjaslkdjflksd', {
                maxAge: 0,
                domain: '.onthedesk.vn',
              })
              setCookie('current-user-avatar', 'jkfkasdjfk', {
                maxAge: 0,
                domain: '.onthedesk.vn',
              })
              setCookie('current-user-shortcut', 'fjlkasjdlkf', {
                maxAge: 0,
                domain: '.onthedesk.vn',
              })
              window.location.href = 'https://login.onthedesk.vn/'
            }}
            className="itemMenuFooter cursor-pointer flex items-center px-[8px] py-[6px]"
          >
            <IconLogout opacity={0.6} />{' '}
            <span className="ml-3 text-[15px] text-labelText">Đăng xuất</span>
          </div>
        </div>
      </Menu>
    </>
  )
}
export default SideBar
