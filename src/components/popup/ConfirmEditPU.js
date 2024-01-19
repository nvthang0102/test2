import React from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconDanger } from '../../assets/icons'

const ConfirmEditPU = ({ open, setOpen, handleSave }) => {
  return (
    <PopupLayout
      btnOk={<BaseButton handleClick={handleSave} content={'Lưu thay đổi'} />}
      btnCanCel={<BaseButton className={'btnCancel'} content={'Trở lại'} />}
      width={311}
      open={open}
      setOpen={setOpen}
    >
      <div>
        <div className="flex w-full justify-center items-center title mt-[36px] ">
          <IconDanger width={80} height={80} />
        </div>
        <div className="mt-[18px] text-center font-bold text-whiteText">
          Thay đổi chưa được lưu
        </div>
      </div>
    </PopupLayout>
  )
}
export default ConfirmEditPU
