import React from 'react';
import ReactSwitch from 'react-switch';

interface ISwitchProps {
  description: string;
  // error: string | null;
  offColor: string;
  onColor: string;
  handleDiameter: number;
  height: number;
  width: number;
  checked: boolean;
  value: boolean;
  setIsPerishable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch = ({
  description,
  offColor,
  onColor,
  handleDiameter,
  height,
  width,
  checked,
  value,
  setIsPerishable,
}: ISwitchProps) => {

  const toggleValue = () => {
    console.log(value)
    setIsPerishable(!value)
  }

  return (
    <div className="self-start">
      <p className="text-gray-800 text-lg mb-1">{description}</p>
      <ReactSwitch
        offColor={offColor}
        onColor={onColor}
        handleDiameter={handleDiameter}
        height={height}
        width={width}
        checked={checked}
        onChange={toggleValue}
      />
    </div>
  );
};

export default Switch;
