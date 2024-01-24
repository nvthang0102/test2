import { Modal } from 'antd'
import React from 'react'
import { IconClose } from '../assets/icons'
import './Layout.scss'
const PopupLayout = ({
  btnOk,
  btnCanCel,
  open,
  width,
  height,
  setOpen,
  children,
  maskClosable,
  type,
  handleClose,
}) => {
  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <Modal
      maskClosable={maskClosable}
      title={false}
      width={width}
      height={height}
      open={open}
      footer={
        <div
          className={`mt-[24px] footerModal flex ${
            type === 'notify' ? 'justify-center' : 'justify-end'
          }`}
        >
          <div
            onClick={handleClose ? handleClose : handleCancel}
            className="mr-[12px]"
          >
            {btnCanCel}
          </div>
          <div>{btnOk}</div>
        </div>
      }
      onCancel={handleClose ? handleClose : handleCancel}
      centered
      closeIcon={<IconClose />}
      className="wrapperModalLayout borderGradient"
    >
      {children}
    </Modal>
  )
}
export default PopupLayout
