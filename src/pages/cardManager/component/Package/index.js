import React, { useEffect, useRef } from "react"
import "../../cardManager.scss"
import { IconPackageBusiness, IconPackagePro, IconPackageProUp, IconShoppingBag, IconStandard } from "../../../../assets/icons";
import BaseButton from '../../../../components/button/BaseButton'
import CardPackage from "./card";
import ViewProfile from "../ViewProfile";
const Package = () => {

    const packages = [
        {
            title: "Personal",
            selectPackage: "Standard",
            logoTitle: <IconStandard />,
            price: "179.000",
            salePrice: "139.000",
            actions: [{ name: "Thẻ cá nhân hoá", state: 1 }, { name: "Thông tin trực tuyến", state: 1 }, { name: "Liên hệ và kết nối", state: 1 }]
        },
        {
            title: "Freelancer",
            selectPackage: "PRO",
            logoTitle: <IconPackagePro />,
            price: "249.000",
            salePrice: "179.000",
            actions: [{ name: "Thẻ cá nhân hoá", state: 1 }, { name: "Thông tin trực tuyến", state: 1 }, { name: "Liên hệ và kết nối", state: 1 }, { name: "Hồ sơ trực tuyến", state: 0 }]
        },
        {
            title: "E-commerce",
            selectPackage: "PRO +",
            logoTitle: <IconPackageProUp />,
            actions: [{ name: "Thẻ cá nhân hoá", state: 1 }, { name: "Thông tin trực tuyến", state: 1 }, { name: "Liên hệ và kết nối", state: 1 }, { name: "Hồ sơ trực tuyến", state: 0 }, { name: "Dịch vụ lưu trữ", state: 0 }, { name: "Chức năng theo yêu cầu", state: 0 }]

        },
        {
            title: "Corporation",
            selectPackage: "BUSINESS",
            logoTitle: <IconPackageBusiness />,
            actions: [{ name: "Thẻ cá nhân hoá", state: 1 }, { name: "Thông tin trực tuyến", state: 1 }, { name: "Liên hệ và kết nối", state: 1 }, { name: "Hồ sơ trực tuyến", state: 0 }, { name: "Dịch vụ lưu trữ", state: 0 }, { name: "Chức năng theo yêu cầu", state: 0 }, { name: "Đồng hành trọn đời", state: 0 }]
        }
    ]


    return (
        <div className="max-w-[522px] w-full mx-auto">
            <div className="text-white font-bold text-[15px] mb-[18px]">Chọn gói dịch vụ</div>
            <div className="overflow-auto convert-scroll-add-card">
                <div class="flex space-x-4 p-4">
                    {
                        packages?.map((value) => <CardPackage title={value.title} logoTitle={value.logoTitle} price={value.price} salePrice={value.salePrice} actions={value.actions} className={value.title === "Corporation" ? "wrapperBoderPackakeBusiness" : "wrapperBoderPackake"} selectPackage={value.selectPackage} />)
                    }
                </div>
            </div>
            <div className="text-white text-[15px]">
                Xem trước hồ sơ:
            </div>
            <div>
                <ViewProfile />
            </div>
        </div>
    )
}
export default Package