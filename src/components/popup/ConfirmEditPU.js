import React from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconDanger } from '../../assets/icons'

const ConfirmEditPU = ({ open, setOpen, handleSave }) => {
  return (
    <PopupLayout
      btnOk={<BaseButton content={'Lưu thay đổi'} />}
      btnCanCel={<BaseButton className={'btnCancel'} content={'Trở lại'} />}
      width={311}
      open={open}
      setOpen={setOpen}
    >
      <div>
        <div className="flex items-center title mt-[36px] ">
          <IconDanger width={80} height={80} />
        </div>
        <div className=" mt-[12px] text-whiteText"></div>
      </div>
    </PopupLayout>
  )
}
export default ConfirmEditPU
