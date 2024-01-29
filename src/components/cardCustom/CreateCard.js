import React, { useState } from 'react';
import './index.scss';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CreateCard = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };
    const handleSwipeLeft = () => {
        setIsFlipped(true);
    };

    const handleSwipeRight = () => {
        setIsFlipped(false);
    };
    return (
        <Swiper
            effect={"flip"}
            grabCursor={true}
            pagination={false}
            navigation={false}
            loop={true}
            modules={[EffectFlip]}
            className="mySwiper"
        >
            <SwiperSlide>
                <CardFront {...props} onBack={handleClick} handleSwipeLeft={handleSwipeLeft} />
            </SwiperSlide>
            <SwiperSlide>
                <CardBack {...props} onBack={handleClick} handleSwipeRight={handleSwipeRight} />
            </SwiperSlide>
        </Swiper>
    );
};

export default CreateCard;
