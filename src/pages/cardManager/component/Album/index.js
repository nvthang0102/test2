import React from "react";
import "./album.scss"
import BaseButton from "../../../../components/button/BaseButton";
import { IconStack } from "../../../../assets/icons";
const Album = () => {
    const buttons = ['Tất cả', 'Nhãn 1', 'Nhãn 2', 'Nhãn 3']
    return (<div className="wrapperBoder mt-[24px]">
        <div className="flex flex-wrap">
            {
                buttons.map((value, index) => <BaseButton
                    className={index === 0 ? "mr-[8px] text-[12px] mb-4" : "btnCancel mr-[8px]  mb-4 text-[12px]"}
                    handleClick={() => { console.log("ngon") }}
                    content={value}
                />)
            }
        </div>
        <div>
            <div className="background-album flex justify-start items-end h-full">
                <div className="background-stack flex py-2 px-4 rounded-tr-[18px] rounded-bl-[18px]">
                    <IconStack className="mr-4" />
                    <span className="text-[12px]">123</span>
                </div>
            </div>
            <div className="text-white text-[15px] font-bold mt-[8px]">
                Tên album
            </div>
            <div className="text-[#1B94D2] text-[12px]">
                Ngô Phương Lan
            </div>
        </div>


    </div>)
}
export default Album