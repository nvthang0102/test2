import React, { useEffect, useState } from 'react'
import CardCustom from '../../components/cardCustom'
import { Button, Col, Row } from 'antd'
import './cardManager.scss'
import Tabs from '../../components/TabsCustom/Tabs'
import Panel from '../../components/TabsCustom/Panel'
import { IconAddCard, IconDownloadCard, IconShareCard } from '../../assets/icons'
import ModalCustom from '../../components/ModalCustom'
import CardBack from '../../components/cardCustom/CardBack'
import DeleteCard from './DeleteCard'
import { useDispatch } from 'react-redux'
import { deleteCard, getListCard } from "../../service/slices/CardManagerSlice"
import { useNavigate } from 'react-router-dom'
import { notifyCustom } from '../../components/notifyCustom'
import CardFront from '../../components/cardCustom/CardFront'
const CardManager = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [openInfoCard, setOpenInfoCard] = useState(false)
    const [cardInfo, setCardInfo] = useState(null)
    const [showDelete, setShowDelete] = useState(false)
    const [listCard, setListCard] = useState([])
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

    const onCardInfo =(e)=>{
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
              key: backgroundImage ? 'image' : 'color',
              value: backgroundImage ? `${window.URL_SERVER}/api/v2${backgroundImage}` : backgroundColor,
            },
            nameCardBack: backText,
          };
          setCardInfo(cardProps)
    }
    const onSaveDelete = async () => {
        const response = await dispatch(deleteCard({ cardID: cardInfo._id }))
        if (response.payload?.status) {
            notifyCustom("Thông báo", "Xóa card thành công", "success")
            handleAddCard()
            setShowDelete(false)
        }
        else {
            notifyCustom("Thông báo", "Xóa card thất bại", "error")
            setShowDelete(false)
        }
    }
    const arrayObjectsỎther = []
    return (
        <div className="disable-scroll">
            <div className="wrapperNumberCard d-flex justify-content-between">
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
                        <p className='set-title-empty'>
                            (Chưa có thẻ)
                        </p>
                        <div className="d-flex flex-row-reverse">
                            <IconAddCard onClick={() => navigate("/add-card")} />
                        </div>
                    </div>
                )
            }
            {
                listCard?.length > 0 && (
                    <Tabs>
                        <Panel title="Thẻ hồ sơ">
                            <Row gutter={12}>
                                {listCard.map((value) => (
                                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} >
                                        <CardCustom {...value}
                                            onShowInfo={() => { setOpenInfoCard(true); onCardInfo(value) }}
                                            onDelete={() => { setShowDelete(true); onCardInfo(value) }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <div className="d-flex flex-row-reverse">
                                <IconAddCard onClick={() => navigate("/add-card")} />
                            </div>
                        </Panel>
                        <Panel title="Thẻ thư viện">
                            <Row gutter={12}>
                                {arrayObjectsỎther.map((value) => (
                                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={8}>
                                        <CardCustom {...value} />
                                    </Col>
                                ))}
                            </Row>
                            <div className="d-flex flex-row-reverse">
                                <IconAddCard onClick={() => navigate("/add-card")} />
                            </div>
                        </Panel>
                    </Tabs>
                )
            }
            <ModalCustom
                isOpen={openInfoCard}
                elements={(
                    <div className='cardBodyModal'>
                        <Col className="cardItemModal" xs={24} sm={12} md={12} lg={8}>
                            <CardFront {...cardInfo} isOff={true} />
                            <CardBack {...cardInfo} isOff={true} />
                            <div class="d-flex justify-content-between mt-5">
                                <div class="d-flex">
                                    <Button className='button-back' icon={<IconDownloadCard />} />
                                    <div style={{ width: 5 }}></div>
                                    <Button className='button-back' icon={<IconShareCard />} />
                                </div>
                                <div class="d-flex">
                                    <Button className='button-back'>
                                        Cấp lại
                                    </Button>
                                    <div style={{ width: 5 }}></div>
                                    <Button className='button-back' onClick={() => { setOpenInfoCard(false); setShowDelete(true) }}>
                                        Xóa thẻ
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </div>
                )}
                title=""
                handleCancel={() => setOpenInfoCard(false)}
                handleOk={() => console.log("sdfsdfsdf")}
            />

            <ModalCustom
                isOpen={showDelete}
                elements={<DeleteCard />}
                title=""
                handleCancel={() => setShowDelete(false)}
                footer={[<Button className='button-back' onClick={() => setShowDelete(false)}>
                    Trở lại
                </Button>,
                <Button className='button-submit' onClick={onSaveDelete}>
                    Xác nhận
                </Button>]}
            />
        </div>
    )
}
export default CardManager
