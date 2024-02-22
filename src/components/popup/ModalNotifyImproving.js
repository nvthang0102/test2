import React, { useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconConstructBig, IconDanger } from '../../assets/icons'

const ModalNotifyImproving = ({ open, setOpen, handleDelete, content }) => {
  const [showContact, setShowContact] = useState(false)
  return (
    <PopupLayout
      btnOk={
        <BaseButton
          //   handleClick={setShowContact(true)}
          content={'Nhận thông báo'}
        />
      }
      className={'puNotifyImproving'}
      btnCanCel={
        !showContact ? (
          <BaseButton
            className={'btnCancel'}
            handleClick={() => setOpen(false)}
            content={'Trở lại'}
          />
        ) : null
      }
      width={311}
      type={'notify'}
      open={open}
      setOpen={(value) => setOpen(value)}
    >
      <div>
        <div className="flex  w-full justify-center items-center title mt-[36px] ">
          <IconConstructBig width={80} height={80} />
        </div>
        <div className="leading-[27px] mt-[18px] text-center text-[18px] font-bold  text-whiteText">
          <p className="mb-0"> Tính năng</p> đang phát triển!
        </div>
      </div>
    </PopupLayout>
  )
}

export default ModalNotifyImproving
