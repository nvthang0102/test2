import React, { useState } from 'react';
import './index.scss';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
const CardCustom = (props) => {
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
    onShowInfo,
    onDelete,
    onEdit
  } = props;

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  console.log("backgroundColor gradient",backgroundColor?.includes("gradient"))
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
      key: backgroundImage ? 'image' : (backgroundColor?.includes("gradient")?'gradient':'flat'),
      value: backgroundImage ? `${window.URL_SERVER}/api/v2${backgroundImage}` : backgroundColor,
    },
    nameCardBack: backText,
    onShowInfo,
    onDelete
  };

  return (
    <CardFront {...cardProps} onEdit={onEdit} />


  );
};

export default CardCustom;
