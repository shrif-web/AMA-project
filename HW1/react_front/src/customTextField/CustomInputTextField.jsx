import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function CustomInputTextField({
  label,
  state,
  iconName,
  handleChange,
  setState,
}) {
  return (
    <TextField
      fullWidth
      required
      label={label}
      margin={"normal"}
      variant="outlined"
      value={state.number}
      error={state.isError}
      onChange={handleChange}
      onFocus={(e) => setState({ ...state, isFocus: true })}
      onBlur={(e) => setState({ ...state, isFocus: false })}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon
              color={
                state.isError ? "error" : state.isFocus ? "primary" : "action"
              }
            >
              <path d={iconName} />
            </SvgIcon>
          </InputAdornment>
        ),
      }}
    />
  );
}
