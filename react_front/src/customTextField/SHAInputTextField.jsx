import React from "react";
import CustomInputTextField from './CustomInputTextField'

export default function SHAInputTextField({ label, setValue, iconName }) {
  const [state, setState] = React.useState({
    number: "",
    isFocus: false,
    isError: true,
  });

  const handleChange = (e) => {
    let num = e.target.value.replace(/[^0-9]/g, "");
    if (num === "00") num = "0";
    if (num !== "0") num = num.replace(/^0+/, "");
    setState({ ...state, number: num, isError: num === "" });
  };

  React.useEffect(() => {
    setValue({ number: state.number });
  }, [setValue, state.number]);

  return (
    <CustomInputTextField
      label={label}
      state={state}
      setState={setState}
      iconName={iconName}
      handleChange={handleChange}
    />
  );
}
