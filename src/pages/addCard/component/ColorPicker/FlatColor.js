import { ColorPicker, Radio, UploadProps, Upload, Button } from "antd";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { colors, gradient } from "../../AddCardConstants";
import "./ColorPicker.scss"


const FlatColor = ({ onSelectColor }) => {
    const [flatColors, setFlatColors] = useState(colors);
    const [colorPickerShowFlat, setColorPickerShowFlat] = useState(false);
    const [flatColorSelect, setFlatColorSelect] = useState("");
    // const [defaultCard, setDefaultCard] = useRecoilState(storeCard);

    const colorPickerFlatRef = useRef(null);

    const handleChangeBackgroundColor = (e) => {
        setFlatColorSelect(e);
        onSelectColor({ key: 'flat', value: e })
    }

    return (
        <div className="flex flex-wrap space-y-1">
            {flatColors.map((e, i) => {
                return e ? (
                    <div
                        key={i}
                        className="mr-1 rounded cursor-pointer"
                        style={{ backgroundColor: e, width: 20, height: 20,border:flatColorSelect===e?"2px solid #FFFFFF":"" }}
                        onClick={() => {
                            handleChangeBackgroundColor(e);
                        }}
                    />
                ) : (
                    <div
                        key={i}
                        className="mt-1 mr-1 rounded cursor-pointer"
                        onClick={() => {
                            handleChangeBackgroundColor(null);
                        }}
                    >
                        <svg
                            style={flatColorSelect===e?{border:"2px solid red",borderRadius:5}:{}}
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

            <ColorPicker
                open={colorPickerShowFlat}
                placement="bottom"
                // disabledAlpha={true}
                onChangeComplete={(e) => {
                    handleChangeBackgroundColor(e.toHexString());

                }}
                panelRender={(panel) => (
                    <div ref={colorPickerFlatRef} className="custom-panel">
                        {panel}
                        <div className="mt-4 text-right">
                            <Button
                                size="small"
                                className="gradient_btn rounded-lg px-[9px] py-[6px] !shadow-none"
                                onClick={() => {
                                    setFlatColors([...flatColors, flatColorSelect]);
                                    setColorPickerShowFlat(false);
                                }}
                            >
                                <span className=" text-[12px] font-semibold">Chọn</span>
                            </Button>
                        </div>
                    </div>
                )}
            >
                <div className="flex items-center justify-center text-white bg-transparent border border-white border-dashed rounded cursor-pointer" style={{ width: 20, height: 20 }}>
                    <Icon
                        icon="tabler:plus"
                        onClick={() => {
                            setColorPickerShowFlat(true);
                        }}
                    />
                </div>
            </ColorPicker>
        </div>
    );
}

export default FlatColor