import React from 'react';
import AccoutItemLayout from '../../layouts/AccoutItemLayout';
import { IconEdit } from '../../assets/icons';
import './Account.scss'
const AddressInfo = () => {
    const data= [{
             "addressID": "",
               "addressName":"Hồ Cẩm đào",
               "detail": "11 Đinh Tiên Hoàng",
               "wards":"P.Hàng Trống",
               "district": "Hoàn Kiém",
               "city": "Hà Nội",
               "phoneNumber": "0915666888",
               "isDefault": true
            },{
             "addressID": "",
               "addressName":"Hồ Cẩm đào",
               "detail": "11 Đinh Tiên Hoàng",
               "wards":"P.Hàng Trống",
               "district": "Hoàn Kiém",
               "city": "Hà Nội",
               "phoneNumber": "0915666888",
               "isDefault": true
            }]
        
    return(
        <AccoutItemLayout title={'Quản lý địa chỉ'} icon={<IconEdit />}>
            <div className="contentInfo  ">
                {data.length?data.map((item,index)=>{
                   return <div className={`text-[12px]  ${data.length!==index +1?"borderDashed pb-[12px] mb-[12px]":null}`}>
                        <div className='h-[24px] mb-[12px]'><span className='name text-whiteText'>{item.addressName}</span> <span className='text-whiteText italic'>{item.isDefault?"(Mặc định)":null}</span></div>
                        <div className='text-labelText'>
                            <div className='h-[24px] mb-[6px]'>{item.detail}</div>
                            <div className='h-[24px] mb-[6px]'>{item.city}</div>
                            <div className='h-[24px] mb-[6px]'>{item.wards}</div>
                            <div className='h-[24px] '>{item.phoneNumber}</div>
                        </div>
                    </div>
                }):<span className='font-normal text-labelText italic text-[12px]' >(chưa có người nhận)</span>}
            </div>
      </AccoutItemLayout>
    )
}
export default AddressInfo;