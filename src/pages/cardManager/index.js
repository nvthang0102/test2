import React, { useEffect, useRef, useState } from 'react'
import CardCustom from '../../components/cardCustom'
import { Button, Col, Modal, Row, Spin } from 'antd'
import './cardManager.scss'
import Tabs from '../../components/TabsCustom/Tabs'
import Panel from '../../components/TabsCustom/Panel'
import { IconAddCard, IconCard, IconDownloadCard, IconEmpty, IconShareCard } from '../../assets/icons'
import ModalCustom from '../../components/ModalCustom'
import CardBack from '../../components/cardCustom/CardBack'
import DeleteCard from './DeleteCard'
import { useDispatch } from 'react-redux'
import { deleteCard, getListCard } from "../../service/slices/CardManagerSlice"
import { useNavigate } from 'react-router-dom'
import { notifyCustom } from '../../components/notifyCustom'
import CardFront from '../../components/cardCustom/CardFront'
import AddCard from '../addCard'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import InfoCardPU from '../../components/popup/InfoCardPU'
import BaseButton from '../../components/button/BaseButton'
import DeleteCardPU from '../../components/popup/DeleteCardPU'

const CardManager = () => {
    const dispatch = useDispatch()

    const [openInfoCard, setOpenInfoCard] = useState(false)
    const [cardInfo, setCardInfo] = useState(null)
    const [showDelete, setShowDelete] = useState(false)
    const [listCard, setListCard] = useState([])
    const [isModalCard, setIsModalCard] = useState(false)
    const [onReload, setReload] = useState(false)

    const componentRef = useRef(null);
    // const convertAndDownload = async () => {
    //     try {
    //         await setReload(true)
    //         const width = componentRef.current.clientWidth;
    //         const height = componentRef.current.clientHeight;
    //         const canvas = await html2canvas(componentRef.current, { useCORS: true, width: 282, height });
    //         const image = await canvas.toDataURL('image/png');
    //         await saveAs(image, `${cardInfo._id}.png`);
    //         // await setReload(false)
    //         setOpenInfoCard(false)
    //     } catch (error) {
    //         console.error('Error converting component to image:', error);
    //         // await setReload(false)
    //         setOpenInfoCard(false)
    //     }

    // };

    useEffect(() => {
        console.log("componentRef", componentRef)
    }, [componentRef])
    const handleAddCard = async () => {
        try {
            const result = await dispatch(getListCard())
            setListCard(result.payload.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        handleAddCard()
    }, [])

    const onCardInfo = (e) => {
        const {
            _id,
            alignment,
            logo,
            enableLogo,
            frontText,
            enableFrontText,
            backText,
            backgroundColor,
            backgroundImage,
            fontFamily,
            fontColor,
        } = e;
        const cardProps = {
            _id,
            logo: { value: logo ? `${window.URL_SERVER}/api/v2${logo}` : logo },
            nameCard: frontText,
            textColor: fontColor,
            isOff: false,
            FontFamily: fontFamily,
            isEnableFront: enableFrontText,
            isEnableLogo: enableLogo,
            alignMent: alignment,
            colorPicker: {
                key: backgroundImage ? 'image' : (backgroundColor?.includes("gradient") ? 'gradient' : 'flat'),
                value: backgroundImage ? `${window.URL_SERVER}/api/v2${backgroundImage}` : backgroundColor,
            },
            nameCardBack: backText,
        };
        setCardInfo(cardProps)
    }
    const onSaveDelete = async () => {
        const response = await dispatch(deleteCard({ cardID: cardInfo._id }))
        if (response.payload?.status) {
            handleAddCard()
            setShowDelete(false)
        }
        else {
            setShowDelete(false)
        }
    }
    const onClose = () => {
        setIsModalCard(false)
        handleAddCard()
    }
    
    return (
        <center>
            <div className="max-w-[640px]">
            <div className="wrapperNumberCard flex justify-between">
                <div className="titleNumberCard">Thẻ đang sở hữu:</div>
                <div className="itemNumber">{listCard?.length || 0}</div>
            </div>
            {
                !listCard?.length && (
                    <div>
                        <div className='cardEmpty'>
                            <div>
                            </div>

                        </div>
                        
                        <center className='text-[15px] text-white '>
                            <div className='leading-[22px]'>
                            Bạn chưa có mẫu thẻ nào.

                            </div>
                            <div className='leading-[22px]'>
                            Cá nhân hoá ngay thôi!
                            </div>
                            <IconEmpty className='m-[10px]'/>
                        </center>
                        <BaseButton content="Thêm thẻ" preFix ={<IconAddCard/>}className="w-full mt-[2px] text-[12px] btnCard" handleClick={()=>{setCardInfo(null);setIsModalCard(true)}}/>
                    </div>
                )
            }
            {
                listCard?.length > 0 && (
                    <Tabs>
                        <Panel title="Thẻ hồ sơ">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                            {listCard.map((value) => (
                                            <CardCustom {...value}
                                                onEdit={() => { onCardInfo(value); setIsModalCard(true) }}
                                                onShowInfo={() => { setOpenInfoCard(true); onCardInfo(value) }}
                                                onDelete={() => { setShowDelete(true); onCardInfo(value) }}
                                            />
                                    ))}
                                </div>
                                <BaseButton content="Thêm thẻ" preFix ={<IconAddCard/>}className="w-full mt-[2px] text-[12px] btnCard" handleClick={()=>{setCardInfo(null);setIsModalCard(true)}}/>

                        </Panel>
                        <Panel title="Thẻ thư viện">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                                {[].map((value) => (
                                   <CardCustom {...value}
                                   onEdit={() => { onCardInfo(value); setIsModalCard(true) }}
                                   onShowInfo={() => { setOpenInfoCard(true); onCardInfo(value) }}
                                   onDelete={() => { setShowDelete(true); onCardInfo(value) }}
                               />
                                ))}
                           </div>
                            <BaseButton content="Thêm thẻ" preFix ={<IconAddCard/>}className="w-full mt-[2px] text-[12px] btnCard" handleClick={()=>{setCardInfo(null);setIsModalCard(true)}}/>

                        </Panel>
                    </Tabs>
                )
            }
            <InfoCardPU open={openInfoCard} cardInfo={cardInfo} setOpen={()=>setOpenInfoCard(false)} onDelete={()=>setShowDelete(true)} onEdit={()=>{}}/>
            <DeleteCardPU open={showDelete} setOpen={()=>setShowDelete(false)} onSubmit={onSaveDelete}/>
            <Modal className='modal-full' open={isModalCard} onCancel={() => setIsModalCard(false)} footer={[]} >
                <AddCard onClose={onClose} cardInfo={cardInfo} />
            </Modal>
        </div>
        </center>
        
    )
}
export default CardManager
