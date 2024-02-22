import React, { useState } from "react";
import "./ColorPicker.scss"
import { Radio, Switch } from "antd";
import FlatColor from "./FlatColor";
import GradientColor from "./GradientColor";
import ImageBackground from "./ImageBackground";
import SelectImageCustom from "../../../../components/SelectImageCustom";
function ColorPicker({ onChangeSelect,selectImage }) {
    const [selectkey, setSelectKey] = useState("flat")

    return (
        <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max" style={{ marginTop: 12 }}>
            <div className="font-semibold text-[12px] text-white">Nền</div>
            <div className="mt-3">
                <Radio.Group
                    className="flex h-full w-full overflow-x-auto !shadow-none !px-0 justify-start checked-select"
                    defaultValue="flat"
                    buttonStyle="solid"
                    onChange={(e) => {
                        setSelectKey(e.target.value);
                    }}
                >
                    <Radio.Button
                        className="text-[12px]"
                        value="flat"
                    >
                        Màu trơn
                    </Radio.Button>
                    <Radio.Button
                        className="text-[12px]"
                        value="gradient"
                    >
                        Gradient
                    </Radio.Button>
                    <Radio.Button
                        className="text-[12px]"
                        value="image"
                    >
                        Ảnh nền
                    </Radio.Button>
                </Radio.Group>
            </div>
            {
                selectkey === "flat" && <FlatColor onSelectColor={onChangeSelect} />
            }
            {
                selectkey === "gradient" && <GradientColor onSelectColor={onChangeSelect} />
            }
            {
                selectkey === "image" &&
                <SelectImageCustom
                selectImage= {selectImage}
                    Content="Tải ảnh lên"
                    aspectRate={1.5}
                    modalTitle={"Chọn ảnh làm hình nền"}
                    note="(khuyên dùng: 1024 x 639 px)"
                    onSelectColor={onChangeSelect} />
            }
        </div>
    );
}

export default ColorPicker;
