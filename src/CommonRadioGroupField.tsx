import React from "react";

type OptionsType = {
  value: string;
  label: string; // Add label here
};

interface CommonRadioProps {
  options: OptionsType[];
  fieldValue: string;
  setFieldValue: (value: string) => void;
}

const CommonRadioGroupField = ({
  options,
  fieldValue,
  setFieldValue,
}: CommonRadioProps) => {
  return (
    <div>
      {options?.map(({ value, label }) => (
        <React.Fragment key={value}>
          <input
            type="radio"
            value={value}
            checked={value === fieldValue}
            onChange={() => setFieldValue(value)}
          />
          {label}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommonRadioGroupField;
