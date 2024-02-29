import React, { useEffect, useState } from 'react'
import PopupLayout from '../../layouts/PopupLayout'
import BaseButton from '../button/BaseButton'
import "./Popup.scss"
import CardFront from '../cardCustom/CardFront'
import CardBack from '../cardCustom/CardBack'
import { IconDesign, IconDownloadCard, IconQR, IconShareCard } from '../../assets/icons'
import { handleCaptureClick } from '../../util'
import { Modal, Tooltip } from 'antd'
import { useCookies } from 'react-cookie'



const InfoCardPU = ({ open, setOpen, cardInfo,onDelete,onEdit }) => {
    const [onShow, setOnShow] = useState(false)
    const [cookies, , removeCookie] = useCookies([
        "auth-token",
        "auth-id",
        "current-user-avatar",
        "current-user-shortcut",
      ]);
    useEffect(()=>{
        setOnShow(false)
    },[open])
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Share Example',
                    text: 'Check out this link!',
                    url: 'https://example.com',
                });
            } else {
                const shareUrl = 'https://example.com';
                navigator.clipboard.writeText(shareUrl);
            }
        } catch (error) {
            console.error('Error sharing link:', error);
        }
    };

    const convertAndDownload = async () => {
        setOnShow(true)
        new Promise((resolve) => {
            setTimeout(async() => {
                await handleCaptureClick({
                    selector: ".DownloadCard",
                    fileName: cookies['auth-id']?cookies['auth-id']+".png":"OnTheDesk.png",
                });
                setOnShow(false)
            }, 1000);
        });
        
    }

    const cardDownload = () => {
        return (
            <div className='w-[280px]'>
                <CardFront {...cardInfo} isOff={true} />
                <div className='flex justify-between mt-[20px]'>
                    <div className='relative'>
                        <div>
                            <div className='text-white font-bold text-[12px]'>Thiên Hùng</div>
                            <div className='text-white text-[9px]'>Freelance Photographer</div>
                        </div>
                        <div className='absolute  bottom-0 left-0'>
                            <IconDesign />
                        </div>
                    </div>
                    <IconQR />
                </div>
            </div>
        )

    }


    return (
        <PopupLayout
            className={onShow?'wrapperModalLayoutContact DownloadCard card-dowload': 'wrapperModalLayoutContact'}

            width={311}
            open={open}
            setOpen={setOpen}
            maskClosable={false}
        >
            {!onShow && <div className=''>
                <div className="my-[24px]">
                    <div>
                        <CardFront {...cardInfo} isOff={true} />
                        <CardBack {...cardInfo} isOff={true} />
                    </div>

                    <div class="flex justify-between mt-5">
                        <div class="flex">
                            <BaseButton
                                className={'btnCancel pl-[14px] pr-[8px] mr-[5px]'}
                                preFix={<IconDownloadCard />} handleClick={() => convertAndDownload()} />
                            <BaseButton
                                className={'btnCancel pl-[14px] pr-[8px] mr-[5px]'}
                                preFix={<IconShareCard />} handleClick={() => handleShare()} />
                        </div>
                        <div class="flex">
                            <BaseButton
                                handleClick={() => { setOpen(false);onEdit(cardInfo) }}
                                className={'btnCancel py-[9px] mr-[5px]'}
                                content={' Cấp lại'}
                            />
                            <BaseButton
                                handleClick={() => { setOpen(false);onDelete(cardInfo) }}
                                className={'btnCancel py-[9px]'}
                                content={'Xóa thẻ'}
                            />

                        </div>
                    </div>

                </div>
            </div>}

            <center>
                {
                    onShow && cardDownload()
                }
            </center>
        </PopupLayout>
    )
}

export default InfoCardPU
