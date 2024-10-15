import React, { useEffect, useState } from "react";
import checked from "/images/checked-radio.png";
import unchecked from "/images/unchecked-radio.png";

const RADIO_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const Practice = () => {
  const [gender, setGender] = useState("");
  console.log(gender, "gender");
  useEffect(() => {
    // dummyApiCall().then((res) => setGender(res));
    setGender("other");
  }, []);
  const handleSubmit = () => {
    const payload = {
      gender: gender,
    };
  };
  return (
    <div>
      <div className="question">Choose Gender</div>
      {RADIO_OPTIONS?.map(({ value, label }, index) => (
        <>
          <label htmlFor={`radio_${index}`}>
            {/* <img src={"/images/checked-radio.png"} className="image" /> */}
            <img
              src={gender === value ? checked : unchecked}
              className="image"
            />
          </label>
          <input
            id={`radio_${index}`}
            type="radio"
            value={value}
            checked={gender === value}
            onChange={(e) => setGender(e.target.value)}
            style={{ display: "none" }}
          />
          {label}
        </>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Practice;
