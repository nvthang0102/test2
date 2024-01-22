import React from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconDanger } from '../../assets/icons'

const ConfirmDeletePU = ({ open, setOpen, handleDelete, content }) => {
  return (
    <PopupLayout
      btnOk={<BaseButton handleClick={handleDelete} content={'Xác nhận'} />}
      btnCanCel={<BaseButton className={'btnCancel'} content={'Trở lại'} />}
      width={311}
      open={open}
      setOpen={(value) =>
        setOpen({
          isOpenPU: value,
          id: '',
        })
      }
    >
      <div>
        <div className="flex w-full justify-center items-center title mt-[36px] ">
          <IconDanger width={80} height={80} />
        </div>
        <div className="mt-[18px] text-center font-bold text-whiteText">
          {content}
        </div>
      </div>
    </PopupLayout>
  )
}

export default ConfirmDeletePU
