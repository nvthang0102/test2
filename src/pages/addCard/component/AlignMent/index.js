import React, { useEffect, useState } from "react";
import "./AlignMent.scss"
import { Radio } from "antd";
function AlignMent({ handleChangeAlignment,alignment }) {
    const [alignMent,setAlignMent] = useState('left')
    useEffect(()=>{
        setAlignMent(alignment)
    },[alignment])
    return (
        <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max wrapperBoder">
            <div className="font-semibold text-[12px] text-white">Bố cục</div>
            <div className="mt-3">
                <Radio.Group
                    className="flex h-full w-full overflow-x-auto !shadow-none !px-0 justify-start checked-select"
                    buttonStyle="solid"
                    value={alignMent}
                    onChange={(e) => {
                        handleChangeAlignment(e.target.value);
                        setAlignMent(e.target.value)
                    }}
                >
                    <Radio.Button value="left" className="text-[12px]">
                        Căn trái
                    </Radio.Button>
                    <Radio.Button value="center" className="text-[12px]">
                        Căn giữa
                    </Radio.Button>
                    <Radio.Button value="right" className="text-[12px]">
                        Căn phải
                    </Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );
}

export default AlignMent;
