import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import {
    IconAccount,
    IconEmail,
    IconPhoneCall,
    IconUpLevel,
} from '../../assets/icons'
import InputBase from '../input/InputBase'
import TextArea from 'antd/es/input/TextArea'
import { validPhoneNumber } from '../../util'
import { useDispatch } from 'react-redux'
import { postFeatureRequire } from '../../service/slices/ServiceManagerSlice'
import { setNotify } from '../../service/slices/CommonSlice'
import "./Popup.scss"
const ContactPU = ({ valuePackage, open, setOpen }) => {
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
        if (
            !dataContact.customerMail ||
            !dataContact.customerName ||
            !dataContact.customerPhone ||
            !validPhoneNumber(dataContact.customerPhone)
        ) {
            setCheckValid(false)
        } else {
            dispatch(setNotify({
                isNotify: true,
                msg: 'Gửi thành công !',
                type: 'success',
            }))
            setOpen(false)
        }
    }
    useEffect(() => {
        return () => setCheckValid(true)
    }, [])
    return (
        <PopupLayout
            className='wrapperModalLayoutContact'
            btnOk={
                <a href="tel:+84123456789">
                    <BaseButton subFix={<IconPhoneCall />} content={'Liên hệ'} />
                </a>
            }
            btnCanCel={
                <BaseButton
                    handleClick={handleHandleSendRequire}
                    className={'btnCancel py-[9px]'}
                    content={'Gửi ngay'}
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
                    <div
                        className={`${!checkValid && !dataContact?.customerName ? 'invalidValue' : null
                            } text-labelText `}
                    >
                        <div className=" mb-[6px] flex align-middle">
                            <InputBase
                                preFix={<IconAccount fill="#1B94D2" />}
                                className={'inputBase inputGray text-textSizeMb'}
                                content={dataContact?.customerName}
                                setContent={(value) =>
                                    setDataContact({ ...dataContact, customerName: value })
                                }
                                placeholder={'Họ tên (*)'}
                            />
                        </div>
                    </div>
                    <div
                        className={`${!checkValid &&
                            (!dataContact?.customerPhone ||
                                !validPhoneNumber(dataContact.customerPhone))
                            ? 'invalidValue'
                            : null
                            } text-labelText `}
                    >
                        <div className=" mb-[6px] flex align-middle">
                            <InputBase
                                preFix={<IconPhoneCall fill="#1B94D2" />}
                                className={'inputBase inputGray text-textSizeMb'}
                                content={dataContact?.customerPhone}
                                setContent={(value) =>
                                    setDataContact({ ...dataContact, customerPhone: value })
                                }
                                placeholder={'Số điện thoại (*)'}
                            />
                        </div>
                    </div>
                    <div
                        className={`${!checkValid && !dataContact?.customerMail ? 'invalidValue' : null
                            } text-labelText `}
                    >
                        <div className=" mb-[6px] flex align-middle">
                            <InputBase
                                preFix={<IconEmail fill="#1B94D2" />}
                                className={'inputBase inputGray text-textSizeMb'}
                                content={dataContact?.customerMail}
                                setContent={(value) =>
                                    setDataContact({ ...dataContact, customerMail: value })
                                }
                                placeholder={'Email (*)'}
                            />
                        </div>
                    </div>
                    <div
                    >
                        <div className="baseTextArea mb-[6px] flex align-middle">
                            <TextArea
                                rows={3}
                                preFix={<IconEmail fill="#1B94D2" />}
                                className={'inputBase inputGray text-textSizeMb'}
                                value={dataContact.requestDetail}
                                onChange={(e) =>
                                    setDataContact({
                                        ...dataContact,
                                        requestDetail: e.target.value,
                                    })
                                }
                                placeholder={'Lời nhắn'}
                            />
                        </div>
                    </div>
                    <div
                        className={'text-white text-[18px] font-bold'}
                    >
                        <div className=" mb-[6px] flex align-middle">
                            <InputBase
                                preFix={<div></div>}
                                className={'inputBase inputGray text-textSizeMb'}
                                content={"GÓI " + valuePackage?.toUpperCase()}
                                setContent={(value) =>
                                    setDataContact({ ...dataContact, customerMail: value })
                                }
                                placeholder={''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PopupLayout>
    )
}

export default ContactPU
