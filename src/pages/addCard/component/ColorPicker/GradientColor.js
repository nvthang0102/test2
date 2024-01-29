import { ColorPicker, Radio, UploadProps, Upload, Button } from "antd";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { colors, gradient } from "../../AddCardConstants";

const GradientColor = ({ onSelectColor }) => {
    const colorPickerGradientFirstRef = useRef(null);
    const colorPickerGradientSecRef = useRef(null);

    const [gradientColors, setGradientColors] = useState(gradient);
    const [firstColor, setFirstColor] = useState("#12417A");
    const [secondColor, setSecondColor] = useState("#12C0F1");
    const [isAddNew, setIsAddNew] = useState(false);
    const [gradientFirstColorSelect, setGradientFirstColorSelect] = useState("");

    const [colorPickerShowFirstGradient, setColorPickerShowFirstGradient] =
        useState(false);
    const [colorPickerShowSecondGradient, setColorPickerShowSecondGradient] =
        useState(false);

    const [gradientSecondColorSelect, setGradientSecondColorSelect] =
        useState("");

    const handleChangeBackgroundColor = (e) => {
        onSelectColor({ key: 'gradient', value: e })
    }

    return (
        <div>
            <div className="flex flex-wrap space-y-1 ">
                {gradientColors.map((e, i) => {
                    return e ? (
                        <div
                            key={i}
                            className="mr-1 rounded cursor-pointer"
                            style={{ background: e, width: 20, height: 20 }}
                            onClick={() => {
                                const pattern1 = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;
                                const match1 = e.match(pattern1);
                                if (match1) {
                                    const colorCode = match1[1];
                                    setSecondColor(`#${colorCode}`)
                                }

                                const pattern2 = /#[A-Fa-f0-9]{6}\b/g;
                                const match2 = e.match(pattern2);
                                if (match2 && match2.length >= 2) {
                                    const colorCode = match2[1];
                                    setFirstColor(colorCode)
                                }
                                handleChangeBackgroundColor(e);
                            }}
                        />
                    ) : (
                        <div
                            key={i}
                            className="mt-1 mr-1 rounded cursor-pointer"
                            style={{ width: 20, height: 20 }}
                            onClick={() => {
                                handleChangeBackgroundColor(null);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_2723_3153)">
                                    <rect width="20" height="20" rx="3" fill="white" />
                                    <line
                                        x1="20.5281"
                                        y1="0.532594"
                                        x2="0.356182"
                                        y2="20.5326"
                                        stroke="#EB5757"
                                        strokeWidth="1.5"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2723_3153">
                                        <rect width="20" height="20" rx="3" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    );
                })}
                <div
                    className={`flex items-center justify-center border border-white bg-transparent text-white ${!isAddNew && "border-dashed"
                        } cursor-pointer rounded`}
                    style={{ width: 20, height: 20 }}
                    onClick={() => {
                        setIsAddNew(!isAddNew);
                    }}
                >
                    <Icon icon="tabler:plus" />
                </div>
            </div>

            {isAddNew && (
                <div className="space-y-3 mt-7">
                    <div
                        className="w-full h-5 border-2 border-white rounded"
                        style={{
                            background: `linear-gradient(270deg, ${secondColor} 0.11%, ${firstColor} 99.89%)`,
                        }}
                    />
                    <div className="flex justify-between">
                        <ColorPicker
                            open={colorPickerShowFirstGradient}
                            disabledAlpha={true}
                            placement="bottom"
                            value={firstColor}
                            onChangeComplete={(e) => {
                                handleChangeBackgroundColor(
                                    `linear-gradient(270deg, ${secondColor} 0.11%, ${e.toHexString()} 99.89%)`,
                                );
                                setGradientFirstColorSelect(e.toHexString());
                            }}
                            panelRender={(panel) => (
                                <div
                                    ref={colorPickerGradientFirstRef}
                                    className="custom-panel"
                                >
                                    {panel}
                                    <div className="mt-4 text-right">
                                        <Button
                                            size="small"
                                            className="gradient_btn rounded-lg px-[9px] py-[6px] !shadow-none"
                                            onClick={() => {
                                                setGradientColors([
                                                    ...gradientColors,
                                                    `linear-gradient(270deg, ${secondColor} 0.11%, ${gradientFirstColorSelect} 99.89%)`,
                                                ]);
                                                setFirstColor(gradientFirstColorSelect);
                                            }}
                                        >
                                            <span
                                                className=" text-[12px] font-semibold"
                                                onClick={() => {
                                                    setColorPickerShowFirstGradient(false);
                                                }}
                                            >
                                                Chọn
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        >
                            <div
                                style={{ backgroundColor: firstColor }}
                                className="flex items-center justify-center w-5 h-5 text-white bg-transparent border-2 border-white rounded cursor-pointer"
                                onClick={() => {
                                    setColorPickerShowFirstGradient(true);
                                }}
                            />
                        </ColorPicker>
                        <ColorPicker
                            open={colorPickerShowSecondGradient}
                            disabledAlpha={true}
                            placement="bottom"
                            value={secondColor}
                            onChangeComplete={(e) => {
                                handleChangeBackgroundColor(
                                    `linear-gradient(270deg, ${e.toHexString()} 0.11%, ${firstColor} 99.89%)`,
                                );
                                setGradientSecondColorSelect(e.toHexString());
                            }}
                            panelRender={(panel) => (
                                <div ref={colorPickerGradientSecRef} className="custom-panel">
                                    {panel}
                                    <div className="mt-4 text-right">
                                        <Button
                                            size="small"
                                            className="gradient_btn rounded-lg px-[9px] py-[6px] !shadow-none"
                                            onClick={() => {
                                                setGradientColors([
                                                    ...gradientColors,
                                                    `linear-gradient(270deg, ${gradientSecondColorSelect} 0.11%, ${firstColor} 99.89%)`,
                                                ]);
                                                setSecondColor(gradientSecondColorSelect);
                                            }}
                                        >
                                            <span
                                                className=" text-[12px] font-semibold"
                                                onClick={() => {
                                                    setColorPickerShowSecondGradient(false);
                                                }}
                                            >
                                                Chọn
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        >
                            <div
                                style={{ backgroundColor: secondColor }}
                                className="flex items-center justify-center w-5 h-5 text-white bg-transparent border-2 border-white rounded cursor-pointer"
                                onClick={() => {
                                    setColorPickerShowSecondGradient(true);
                                }}
                            />
                        </ColorPicker>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GradientColor