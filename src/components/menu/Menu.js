import React, { useEffect, useState } from 'react'
import './Menu.scss'
import {
  IconAccount,
  IconAnalytics,
  IconCart,
  IconUpLevel,
  IconXmark,
} from '../../assets/icons'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Button, Menu } from 'antd'
import ModalNotifyImproving from '../popup/ModalNotifyImproving'

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
  const rootSubmenuKeys = ['accout', 'info', 'order']
  const [openKeys, setOpenKeys] = useState(['account'])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const handleChangePage = (value) => {
    localStorage.setItem('acount', value)
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
        defaultOpenKeys={['account']}
        className={`wrapperSideBar flex flex-col ${
          showMenu ? 'slide-in' : 'slide-out'
        }`}
        defaultSelectedKeys={['/']}
        mode="inline"
        openKeys={openKeys}
        // selectedKeys={defaultMenu ? defaultMenu : "chat"}
        onOpenChange={onOpenChange}
      >
        <div className="headeMenu">
          <IconXmark onClick={() => setShowMenu(false)} />
          {/* <div className='h-[48px] my-[12px] flex '>
                <span className="text-labelText">Về trang chủ</span>
              </div> */}
          <div className="flex-1"></div>
          <Menu.SubMenu
            key={'account'}
            title={
              <div className="nameItemMenu ">
                <span className="text-labelText">Tài Khoản</span>
              </div>
            }
            icon={<IconAccount />}
          >
            <Menu.Item
              // icon={<IconAccount />}
              className="flex justify-end "
              key={'account_manager'}
              onClick={() => {
                handleChangePage('account_manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="nameItemMenu pl-[8px]">
                  <div className="  text-labelText">Quản lý tài khoản</div>
                </div>
              </Row>
            </Menu.Item>
            <Menu.Item
              // icon={<IconAccount />}
              key={'service'}
              onClick={() => {
                setShowModalNotify(true)
                // handleChangePage('account_manager')
                // handleChangePage('service_manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="pl-[8px] nameItemMenu">
                  <span className="text-labelText">Quản lý dịch vụ</span>
                </div>
              </Row>
            </Menu.Item>
            <Menu.Item
              // icon={<IconAccount />}
              key={'card-manager'}
              onClick={() => {
                handleChangePage('card-manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="pl-[8px] nameItemMenu">
                  <span className="text-labelText">Quản lý thẻ</span>
                </div>
              </Row>
            </Menu.Item>
            <Menu.Item
              // icon={<IconAccount />}
              key={'info'}
              onClick={() => {
                setShowModalNotify(true)
                // handleChangePage('account_manager')
              }}
            >
              <Row>
                <Col span={5}></Col>
                <div className="pl-[8px] nameItemMenu">
                  <span className="text-labelText">Quản lý hồ sơ</span>
                </div>
              </Row>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            icon={<IconAnalytics />}
            key={'statistics'}
            onClick={() => {
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
            key={'order'}
            onClick={() => {
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
          <hr />
        </div>
      </Menu>
    </>
  )
}
export default SideBar
