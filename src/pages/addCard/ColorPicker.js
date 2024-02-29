// ColorPicker.js
import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

const defaultColors = [
  '#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F',
  '#00FFFF', '#007FFF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F',
  '#000000', '#808080', '#C0C0C0', '#FFFFFF', '#FFD700', '#A52A2A', '#008000', '#800080'
];

const ColorPicker = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColors[0]);
  const [customColor, setCustomColor] = useState('#000000');

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    onSelectColor(color.hex);
  };

  const handleCustomColorChange = (e) => {
    setCustomColor(e.target.value);
  };

  const handleAddCustomColor = () => {
    if (customColor && !defaultColors.includes(customColor)) {
      onSelectColor(customColor);
      setSelectedColor(customColor);
    }
  };

  return (
    <div className='flex'>
      <CirclePicker color={selectedColor} colors={defaultColors} onChange={handleColorChange} />
      <input type="color" value={customColor} onChange={handleCustomColorChange} />
      {/* <div>
        <label>Custom Color:</label>
        
        <button onClick={handleAddCustomColor}>Add Custom Color</button>
      </div> */}
    </div>
  );
};

export default ColorPicker;
