import React from "react";
import { IconFacebook, IconGoogleDrive, IconPhoneBook, IconZalo } from "../../../../assets/icons";
const InfoUser = () => {
    return (<div className="mt-[105px]">
        <div className="wrapperBoder">
            <div className="flex rounded-[8px] mb-[12px]">
                <div className="w-[36px] h-[36px">
                    <IconFacebook className="rounded-tl-[8px] rounded-bl-[8px]" />
                </div>
                <div className="h-[36px] bg-[#1877F2] w-full rounded-tr-[8px] rounded-br-[8px] items-center flex pl-[6px] text-[12px]">
                    Facebook
                </div>
            </div>
            <div className="flex rounded-[8px] mb-[12px]">
                <div className="w-[36px] h-[36px">
                    <IconZalo className="rounded-tl-[8px] rounded-bl-[8px]" />
                </div>
                <div className="h-[36px] bg-[#0066FF] w-full rounded-tr-[8px] rounded-br-[8px] items-center flex pl-[6px] text-[12px]">
                    Zalo
                </div>
            </div>
            <div className="flex rounded-[8px] mb-[12px]">
                <div className="w-[36px] h-[36px">
                    <IconGoogleDrive className="rounded-tl-[8px] rounded-bl-[8px]" />
                </div>
                <div className="h-[36px] bg-[#28B446] w-full rounded-tr-[8px] rounded-br-[8px] items-center flex pl-[6px] text-[12px]">
                    Google Drive
                </div>
            </div>
            <div className="flex rounded-[8px] mb-[12px]">
                <div className="w-[36px] h-[36px">
                    <IconPhoneBook className="rounded-tl-[8px] rounded-bl-[8px]" />
                </div>
                <div className="h-[36px] bg-[#908D84] w-full rounded-tr-[8px] rounded-br-[8px] items-center flex pl-[6px] text-[12px]">
                    Lưu danh bạ
                </div>
            </div>
        </div>

    </div>)
}
export default InfoUser