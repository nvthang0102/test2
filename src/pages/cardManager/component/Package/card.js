import React, { useEffect, useRef, useState } from "react"
import "../../cardManager.scss"
import { IconShoppingBag, IconStandard } from "../../../../assets/icons";
import BaseButton from '../../../../components/button/BaseButton'
import ContactPU from "../../../../components/popup/ContactPU";
import ModalFeatureRequire from "../../../../components/popup/ModalFeatureRequire";

const CardPackage = ({ selectPackage, title, logoTitle, price, salePrice, actions = [], className = "wrapperBoderPackake" }) => {
    console.log("selectPackage", selectPackage)
    const [openContact, setOpenContact] = useState(false)
    const [tickPackage, setPackage] = useState(selectPackage)
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, [scrollRef]);
    return (
        <div ref={title === "Freelancer" ? scrollRef : null} className={`rounded-2xl space-y-[18px] bg-primary-blue-dark-max min-w-[230px] min-h-[363px] ${className}`}>
            <div className="flex justify-end">
                <div className="bg-blue-500 rounded-bl-[18px] rounded-tr-[18px] text-white p-[8px] min-w-[80px] text-center">
                    {title}
                </div>
            </div>
            <div className="p-5">
                {logoTitle}
                <div className="text-white mt-[30px] text-[15px]">
                    {
                        actions?.map((value) => <div className={value.state === 0 ? "font-bold" : ""}>
                            {value.name}
                        </div>)
                    }
                </div>
                {price && <div className="mt-[30px]">
                    <div className="text-[#1B94D2] flex">
                        <div className="text-[15px] line-through">{price}</div><div className="text-[8px] leading-[18px] ml-[4px]">đ</div>
                    </div>

                    <div className="text-white flex">
                        <div className="text-[24px] font-bold">{salePrice}</div><div className=" font-bold text-[12px] leading-[28px] ml-[10px]">đ</div>
                    </div>
                </div>}
                {
                    !price && <div className="mt-[30px] text-white font-bold text-[24px]">
                        Liên Hệ
                    </div>
                }
                <BaseButton
                    handleClick={() => { setPackage(selectPackage); setOpenContact(true) }}
                    className="mt-[30px]"
                    preFix={<IconShoppingBag />}
                    content={'Thanh Toán'}
                />
                <ContactPU open={openContact} setOpen={() => setOpenContact(false)} valuePackage={tickPackage} />
            </div>
        </div>
    )
}
export default CardPackage