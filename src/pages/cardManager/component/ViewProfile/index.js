import React, { useState } from "react";
import "./viewprofile.scss"
import InfoUser from "../InfoUser";
import BackgroundUser from "../BackgroundUser";
import BaseButton from "../../../../components/button/BaseButton";
import Album from "../Album";
import PayPU from "../../../../components/popup/PayPU";
const ViewProfile = () => {
    const [open, setOpen] = useState(false)
    return <div className="text-white font-bold">
        <BackgroundUser />
        <InfoUser />
        <Album />
        <BaseButton
            className="w-full mt-[24px] text-[12px]"
            handleClick={() => { setOpen(true) }}
            content={'Tạo hồ sơ ngay'}
        />
        <PayPU open={open} setOpen={() => setOpen(false)} />
    </div>
}
export default ViewProfile