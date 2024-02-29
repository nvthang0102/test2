import React, { useEffect, useRef, useState } from 'react'
import { IconBackLeft, IconSaveCard } from '../../assets/icons'
import { Col, Row } from 'antd'
import AlignMent from './component/AlignMent'
import ColorPicker from './component/ColorPicker'
import Logo from './component/Logo'
import FrontText from './component/FrontText'
import BackName from './component/BackName'
import { useNavigate } from 'react-router-dom'
import { addCard } from '../../service/slices/AddCardSlide'
import { useDispatch } from 'react-redux'
import { notifyCustom } from '../../components/notifyCustom'
import CreateCard from '../../components/cardCustom/CreateCard'
import './addCard.scss'
import Package from '../cardManager/component/Package'
import ViewProfile from '../cardManager/component/ViewProfile'
const AddCard = ({ onClose, cardInfo }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [alignMent, setAlignMent] = useState('left')
  const [colorPicker, setColorPicker] = useState({
    key: 'flat',
    value: '#1B94D2',
  })
  const [nameCard, setNameCard] = useState('Your name here')
  const [nameCardBack, setNameCardBack] = useState('Your name here')
  const [FontColor, setFontColor] = useState('#FFFFFF')
  const [FontFamily, setFontFamily] = useState('Montserrat')
  const [selectLogo, setSelectLogo] = useState('logo')
  const [selectAvata, setSelectAvata] = useState('avata')
  const [keyFlip, setKeyFlip] = useState(null)

  //boolen
  const [EnableFront, setEnableFront] = useState(true)
  const [EnableLogo, setEnableLogo] = useState(true)
  useEffect(() => {
    if (cardInfo?._id) {
      const { alignMent, colorPicker } = cardInfo
      setAlignMent(alignMent)
      setColorPicker(colorPicker)
      console.log("cardInfo", cardInfo)
    }
  }, [cardInfo])
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
      logo: selectLogo,
    }
    const response = await dispatch(addCard(body))
    if (response.payload?.status) {
      onClose(false)
    } else {
      notifyCustom('Thông báo', 'Thêm card bị lỗi', 'error')
    }
  }

  const onChangeSelect = ({ key, value, fileName }) => {
    setColorPicker({ key, value, fileName })
  }

  const onChangeLogo = (e) => {
    if (e.key === 'logo') {
      setSelectLogo(e)
      return
    }
    if (e.key === 'avata') {
      setSelectAvata(e)
      return
    }
  }
  const componentRoot = useRef(null);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    console.log("scrollY", scrollY)
  };
  useEffect(() => {
    console.log("componentRoot", componentRoot)

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [componentRoot]);

  return (
    <div className='relative'>
      <div className='fixed z-[1300]'>
        <div className='card-config' >
          <CreateCard
            onHandleIndexSlide={(e) => setKeyFlip(e)}
            numberSlide={keyFlip}
            nameCardBack={nameCardBack}
            logo={selectLogo}
            nameCard={nameCard}
            textColor={FontColor}
            isOff={true}
            colorPicker={colorPicker}
            FontFamily={FontFamily}
            isEnableFront={EnableFront}
            isEnableLogo={EnableLogo}
            alignMent={alignMent}
          />
        </div>


      </div>
      <div className="pt-[140px]">
        <AlignMent handleChangeAlignment={setAlignMent} alignment={alignMent} />
        <ColorPicker
          onChangeSelect={onChangeSelect}
          selectImage={colorPicker}
        />
        <Logo
          onChangeSelect={onChangeLogo}
          onEnableLogo={(e) => setEnableLogo(e)}
          selectLogo={selectLogo}
          selectAvata={selectAvata}
        />
        <FrontText
          onSlide={() => setKeyFlip(0)}
          onFontFamily={(e) => setFontFamily(e)}
          onEnableFront={(e) => setEnableFront(e)}
          onSelectColor={(e) => setFontColor(e)}
          onChaneName={(e) => setNameCard(e)}
        />
        <BackName
          onBackText={(e) => setNameCardBack(e)}
          onSlide={() => setKeyFlip(1)}
        />
        <div class="flex justify-end">
          <IconSaveCard
            style={{ marginTop: 12, marginBottom: 12 }}
            onClick={onSave}
          />
        </div>
        <Package />
      </div>
    </div>
  )
}
export default AddCard
