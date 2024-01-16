import React from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import { IconCalenda, IconCloud, IconUpLevel } from '../../assets/icons'
import SelectOption from '../selecter/SelectOption'

const UpgradePopup = ({ open, setOpen }) => {
  const optionsCapacity = [
    { value: 1, label: '5GB' },
    { value: 2, label: '10GB' },
    { value: 3, label: '15GB' },
    { value: 4, label: '20GB' },
  ]
  const optionsCycle = [
    { value: 1, label: '100.000 đ/tháng (3 tháng)' },
    { value: 2, label: '95.000 đ/tháng (6 tháng)' },
    { value: 3, label: '92.000 đ/tháng (12 tháng)' },
    { value: 4, label: '90.000 đ/tháng (18 tháng)' },
    { value: 5, label: '82.000 đ/tháng (24 tháng)' },
  ]
  return (
    <PopupLayout
      btnOk={<BaseButton content={'Tạo ngay'} />}
      btnCanCel={<BaseButton className={'btnCancel'} content={'Trở lại'} />}
      width={311}
      open={open}
      setOpen={setOpen}
    >
      <div>
        <div className="flex items-center title mt-[36px] ">
          <IconUpLevel />
          <span className="text-whiteText font-bold ml-[8px] text-[18px]">
            Nâng cấp dịch vụ
          </span>
        </div>
        <div className=" mt-[12px] text-whiteText">
          <SelectOption
            preFix={<IconCloud fill="#1B94D2" />}
            options={optionsCapacity}
          />
        </div>
        <div className=" mt-[12px] text-whiteText">
          <SelectOption
            preFix={<IconCalenda fill="#1B94D2" />}
            placeholder="Chu kỳ thanh toán"
            options={optionsCycle}
          />
        </div>
      </div>
    </PopupLayout>
  )
}
export default UpgradePopup
