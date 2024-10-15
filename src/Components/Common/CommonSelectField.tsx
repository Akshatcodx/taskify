import { PRIORITY_OPTIONS } from "../../Constants/constant";
import { CommonReactSelectProps } from "../../Interfaces/interfaces";
import Select from "react-select";

const CommonSelectField = ({
  fieldName,
  setFieldValue,
  isMulti = false,
  options,
}: CommonReactSelectProps) => {
  return (
    <div>
      <Select
        name={fieldName}
        options={options}
        onChange={(newValue) => {
          setFieldValue(fieldName, newValue);
        }}
        isMulti={isMulti}
      ></Select>
    </div>
  );
};

export default CommonSelectField;
