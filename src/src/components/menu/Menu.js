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

const SideBar = ({ showMenu, setShowMenu }) => {
  const navigate = useNavigate()
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']
  const [openKeys, setOpenKeys] = useState([localStorage.getItem('keyMenu')])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const handleChangePage = (value) => {
    localStorage.setItem('keyMenu', value)
    navigate(`/${value}`, {})
    setShowMenu(false)
  }
  return (
    <>
      <div onClick={() => setShowMenu(false)} className="overlayMenu"></div>

      <Menu
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
        </div>
        <div className="flex-1">
          <Menu.SubMenu
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
              key={'acount'}
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
                handleChangePage('service_manager')
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
              key={'acount'}
              onClick={() => {
                handleChangePage('')
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
              key={'acount'}
              onClick={() => {
                handleChangePage('')
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
            key={'acount'}
            onClick={() => {
              handleChangePage('')
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
            key={'acount'}
            onClick={() => {
              handleChangePage('')
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
