import { Radio, UploadProps, Upload, Button, Modal } from "antd";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { colors, gradient } from "../../AddCardConstants";
import ColorPicker from "react-best-gradient-color-picker";
import PopupLayout from "../../../../layouts/PopupLayout";
import ColorPickerPU from "../../../../components/popup/ColorPickerPU";

const GradientColor = ({ onSelectColor }) => {
    const [gradientColors, setGradientColors] = useState(gradient);
    const [secondColor, setSecondColor] = useState("#12C0F1");
    const [isAddNew, setIsAddNew] = useState(false);


    const handleChangeBackgroundColor = (e) => {
        onSelectColor({ key: 'gradient', value: e })
        setIsAddNew(false)
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
            <ColorPickerPU open={isAddNew} setOpen={()=>setIsAddNew(false)} onSubmit={(value)=>{handleChangeBackgroundColor(value); setGradientColors([...gradientColors,value])}}/>
        </div>
    );
}

export default GradientColor