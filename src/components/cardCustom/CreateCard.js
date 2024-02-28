import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFlip, Pagination, Navigation,handleNextButtonClick } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CreateCard = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const swiperRef = useRef(null);
    
    useEffect(()=>{

    },[swiperRef])

    const handleClick = () => {
        if(swiperRef.current)
        {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
            <Swiper
            ref={swiperRef}
            effect={"flip"}
            grabCursor={true}
            pagination={false}
            // navigation={false}
            loop={true}
            modules={[EffectFlip]}
            className="mySwiper"
        >   
            <SwiperSlide>
                <CardFront {...props} handleSwipeLeft={handleClick} />
            </SwiperSlide>
            <SwiperSlide>
                <CardBack {...props} handleSwipeRight={handleClick} />
            </SwiperSlide>
        </Swiper>

        
    );
};

export default CreateCard;
