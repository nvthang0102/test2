import React from "react";
import "./backgrounduser.scss"
const BackgroundUser = () => {
    return (
        <div className="background-user h-[320px]">
            <div className="pt-[290px] p-[20px] flex items-center">
                <div>
                    <img
                        src={require("./avatar.png")}
                        style={{ borderRadius: 200, width: 101, height: 101 }}
                        alt=""
                        className="cardIcon"
                    />
                </div>
                <div className="ml-[12px]">
                    <div className="text-white font-bold text-[18px]">
                        Lê Hoàng
                    </div>
                    <div className="text-[12px]">
                        OtD Founder
                    </div>
                </div>
            </div>
        </div>)
}
export default BackgroundUser