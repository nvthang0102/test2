import React from 'react'
import AccoutItemLayout from '../../layouts/AccoutItemLayout'
import {
  IconBarMenu,
  IconCalenda,
  IconPlus,
  IconRight,
  IconRoundChecked,
  IconTarget,
} from '../../assets/icons'
import './ServiceManager.scss'
import BaseButton from '../../components/button/BaseButton'
import { Progress } from 'antd'
const ServiceManager = () => {
  return (
    <div>
      <AccoutItemLayout
        className={'wrapperPackageInfo'}
        title={'THÔNG TIN GÓI'}
        icon={<IconBarMenu />}
      >
        <div>
          <p className="title text-[24px] font-bold ">STANDARD</p>
          <div className="contentPackage py-[12px]">
            <div className="itemContent flex items-center font-normal text-white">
              <IconRoundChecked />
              <span className="ml-[8px] text-textSizeMb">Thẻ cá nhân hoá</span>
            </div>
            <div className="itemContent flex items-center font-normal text-white">
              <IconRoundChecked />
              <span className="ml-[8px] text-textSizeMb">
                Thông tin trực tuyến
              </span>
            </div>
            <div className="itemContent flex items-center font-normal text-white">
              <IconRoundChecked />
              <span className="ml-[8px] text-textSizeMb">
                Liên hệ và kết nối
              </span>
            </div>
            <div className="itemContent flex items-center font-normal text-white">
              <IconRoundChecked />
              <span className="ml-[8px] text-textSizeMb">Hồ sơ trực tuyến</span>
            </div>
            <div className="itemContent flex items-center font-normal text-white">
              <IconRoundChecked />
              <span className="ml-[8px] text-textSizeMb">Dịch vụ lưu trữ</span>
            </div>
          </div>
          <div className="flex justify-end">
            <BaseButton
              className={'btnGray'}
              preFix={<IconPlus />}
              content={'Yêu cầu tính năng'}
            />
          </div>
        </div>
      </AccoutItemLayout>

      {/* Tính năng dịch vụ */}
      <AccoutItemLayout
        className={'wrapperPackageInfo mt-[12px]'}
        title={'TÍNH NĂNG DỊCH VỤ'}
        // icon={<IconBarMenu />}
      >
        <div>
          <div className="contentPackage mt-[12px] mb-[6px]">
            <div className="itemContent flex items-center font-normal text-white">
              <div className="h-full flex flex-1 items-baseline ">
                <span className="text-[24px] font-bold">2</span>
                <span className="flex-1 leading-[18px] flex items-end ml-[8px] text-textSizeMb">
                  Thẻ đã tạo
                </span>
              </div>
              <span>
                <IconRight />
              </span>
            </div>
            <div className="itemContent flex items-center font-normal text-white">
              <div className="h-full flex flex-1 items-baseline ">
                <span className="text-[24px] font-bold">1</span>
                <span className="flex-1 leading-[18px] flex items-end ml-[8px] text-textSizeMb">
                  Thông tin trực tuyến
                </span>
              </div>
              <span>
                <IconRight />
              </span>
            </div>
            <div className="itemContent flex items-center font-normal text-white">
              <div className="h-full flex flex-1 items-baseline ">
                <span className="text-[24px] font-bold">10</span>
                <span className="flex-1 leading-[18px] flex items-end ml-[8px] text-textSizeMb">
                  Liên hệ và kết nối
                </span>
              </div>
              <span>
                <IconRight />
              </span>
            </div>
            <div className="itemContent flex items-center font-normal text-white">
              <div className="h-full flex flex-1 items-baseline ">
                <span className="text-[24px] font-bold">1</span>
                <span className="flex-1 leading-[18px] flex items-end ml-[8px] text-textSizeMb">
                  Hồ sơ tạo
                </span>
              </div>
              <span>
                <IconRight />
              </span>
            </div>
          </div>
        </div>
      </AccoutItemLayout>

      {/* Dịch vụ lưu trữ */}
      <AccoutItemLayout
        className={'wrapperPackageInfo my-[12px]'}
        title={'DỊCH VỤ LƯU TRỮ'}
        // icon={<IconBarMenu />}
      >
        <div className="wrapperCapacityService mt-[12px]">
          <div className="">
            <div className="flex items-center">
              <IconCalenda />{' '}
              <span className="text-white text-textSizeMb ml-[6px]">
                20/10/2024
              </span>
            </div>
            <div className="mt-[6px] flex items-center">
              <IconTarget />{' '}
              <span className="text-white text-textSizeMb ml-[6px]">
                20/10/2024
              </span>
            </div>
            <div className="flex justify-end mt-[12px]">
              <BaseButton
                className={'btnGray'}
                preFix={<IconPlus />}
                content={'Gia hạn'}
              />
            </div>
          </div>

          <div className="addCapacity">
            <div className="flex items-center font-normal text-white">
              <Progress percent={70} showInfo={false} />
            </div>
            <div className="mt-[6px] flex justify-end">
              <span className="text-[12px] text-whiteText">
                Đã sử dụng 3G/5G{' '}
              </span>
            </div>
            <div className="detailCapacity  flex items-center">
              <span className="dot mr-[8px] bg-[#1B94D2]"></span>
              <span className="flex-1 text-textSizeMb text-whiteText">
                Hồ sơ Thiên Hùng
              </span>
              <span className="text-textSizeMb text-whiteText">2 GB</span>
            </div>
            <div className="detailCapacity  flex items-center">
              <span className="dot mr-[8px] bg-[#1B94D2]"></span>
              <span className="flex-1 text-textSizeMb text-whiteText">
                Hồ sơ Thiên Hùng
              </span>
              <span className="text-textSizeMb text-whiteText">2 GB</span>
            </div>
          </div>
          <div className="flex justify-end mt-[12px]">
            <BaseButton
              className={'btnGray'}
              preFix={<IconPlus />}
              content={'Thêm dung lượng'}
            />
          </div>
        </div>
      </AccoutItemLayout>
    </div>
  )
}
export default ServiceManager
