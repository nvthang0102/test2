import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import {
    IconAccount,
    IconEmail,
    IconPhoneCall,
    IconShoppingBag,
    IconUpLevel,
} from '../../assets/icons'
import InputBase from '../input/InputBase'
import TextArea from 'antd/es/input/TextArea'
import { validPhoneNumber } from '../../util'
import { useDispatch } from 'react-redux'
import { postFeatureRequire } from '../../service/slices/ServiceManagerSlice'
import { setNotify } from '../../service/slices/CommonSlice'
import "./Popup.scss"

const PayPU = ({ valuePackage = "PRO", open, setOpen }) => {
    useEffect(() => {

    }, [valuePackage])
    const [checkValid, setCheckValid] = useState(true)
    const dispatch = useDispatch()
    const [dataContact, setDataContact] = useState({
        customerName: '',
        customerPhone: '',
        customerMail: '',
        requestDetail: '',
    })
    const handleHandleSendRequire = () => {
        dispatch(setNotify({
            isNotify: true,
            msg: 'Gửi thành công !',
            type: 'success',
        }))
        setOpen(false)
    }
    useEffect(() => {
        return () => setCheckValid(true)
    }, [])
    return (
        <PopupLayout
            className='wrapperModalLayoutContact'
            btnOk={
                <BaseButton preFix={<IconShoppingBag />} content={'Thanh toán'} handleClick={handleHandleSendRequire} />
            }
            btnCanCel={
                <BaseButton
                    handleClick={() => setOpen(false)}
                    className={'btnCancel py-[9px]'}
                    content={'Trở lại'}
                />
            }
            handleClose={handleHandleSendRequire}
            width={311}
            open={open}
            setOpen={setOpen}
            maskClosable={false}
        >
            <div className=''>
                <div className="my-[24px]">
                    <div className='text-white text-[15px]'>
                        Vui lòng thanh toán để nhận thẻ thông minh với thiết kế của riêng bạn và tạo hồ sơ chuyên nghiệp

                    </div>
                </div>
            </div>
        </PopupLayout>
    )
}

export default PayPU
