import React, { useState } from "react"
import { IconBackLeft, IconSaveCard } from "../../assets/icons"
import { Col, Row } from "antd"
import AlignMent from "./component/AlignMent"
import ColorPicker from "./component/ColorPicker"
import Logo from "./component/Logo"
import FrontText from "./component/FrontText"
import BackName from "./component/BackName"
import { useNavigate } from "react-router-dom"
import { addCard } from "../../service/slices/AddCardSlide"
import { useDispatch } from "react-redux"
import { notifyCustom } from "../../components/notifyCustom"
import CreateCard from "../../components/cardCustom/CreateCard"
import "./addCard.scss"
const AddCard = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [alignMent, setAlignMent] = useState("left")
    const [colorPicker, setColorPicker] = useState({ key: 'start', value: "#1B94D2" })
    const [nameCard, setNameCard] = useState("Your name here")
    const [nameCardBack, setNameCardBack] = useState("Your name here")
    const [FontColor, setFontColor] = useState("#FFFFFF")
    const [FontFamily, setFontFamily] = useState("Montserrat")
    const [selectLogo, setSelectLogo] = useState("logo")
    const [selectAvata,setSelectAvata] = useState("avata")
    const [keyFlip, setKeyFlip] = useState(null)

    //boolen
    const [EnableFront, setEnableFront] = useState(true)
    const [EnableLogo, setEnableLogo] = useState(true)

    const onSave = async () => {
        const body = {
            alignMent: alignMent,
            background: colorPicker,
            fontFamily: FontFamily,
            enableFront: EnableFront,
            enableLogo: EnableLogo,
            fontColor: FontColor,
            nameCardFront: nameCard,
            nameCardBack: nameCardBack,
            logo: selectLogo
        }
        const response = await dispatch(addCard(body))
        console.log("add-card", response)
        if (response.payload?.status) {
            notifyCustom("Thông báo", "Thêm card thành công", 'success')
        }
        else {
            notifyCustom("Thông báo", "Thêm card bị lỗi", 'error')
        }
    }

    const onChangeSelect = ({ key, value, fileName }) => {
        setColorPicker({ key, value, fileName })
    }

    const onChangeLogo = (e) => {
        if (e.key === "logo") {
            setSelectLogo(e)
            return
        }
        if (e.key === "avata") {
            setSelectAvata(e)
            return
        }
    }

    return (<div>
        <div className="fixed-top card-config" >
            <IconBackLeft style={{ marginBottom: 12 }} onClick={() => navigate("/card-manager")} />
            <Row gutter={12}>
                <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} >
                    <CreateCard onHandleIndexSlide={(e)=>setKeyFlip(e)} numberSlide={keyFlip} nameCardBack={nameCardBack} logo={selectLogo} nameCard={nameCard} textColor={FontColor} isOff={true} colorPicker={colorPicker} FontFamily={FontFamily} isEnableFront={EnableFront} isEnableLogo={EnableLogo} alignMent={alignMent} />
                </Col>
            </Row>
        </div>
        <div className="body-config">
            <AlignMent handleChangeAlignment={setAlignMent} />
            <ColorPicker onChangeSelect={onChangeSelect} selectImage={colorPicker}/>
            <Logo onEnableLogo={(e) => setEnableLogo(e)} selectLogo={selectLogo} selectAvata={selectAvata}/>
            <FrontText
                onSlide={()=>setKeyFlip(0)}
                onFontFamily={(e) => setFontFamily(e)}
                onEnableFront={(e) => setEnableFront(e)}
                onSelectColor={(e) => setFontColor(e)}
                onChaneName={(e) => setNameCard(e)}
            />
            <BackName onBackText={(e) => setNameCardBack(e)} onSlide={()=>setKeyFlip(1)}/>
            <div class="d-flex flex-row-reverse">
                <IconSaveCard style={{ marginTop: 12, marginBottom: 12 }} onClick={onSave} />
            </div>
        </div>

    </div>)
}
export default AddCard