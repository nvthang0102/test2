import React, { useState } from "react";
import "./AlignMent.scss"
import { Radio } from "antd";
function AlignMent({ handleChangeAlignment }) {
    return (
        <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max">
            <div className="font-semibold text-[12px] text-white">Bố cục</div>
            <div className="mt-3">
                <Radio.Group
                    className="flex h-full w-full overflow-x-auto !shadow-none !px-0 justify-start checked-select"
                    defaultValue="left"
                    buttonStyle="solid"
                    onChange={(e) => {
                        handleChangeAlignment(e.target.value);
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
