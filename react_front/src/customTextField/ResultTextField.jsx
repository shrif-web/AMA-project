import React from "react";
import { mdiRefreshCircle } from "@mdi/js";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

function CustomResultTextField({ label, value, onRefresh, iconName }) {
  return (
    <TextField
      required
      disabled
      fullWidth
      variant="outlined"
      margin={"normal"}
      label={label}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon color="action">
              <path d={iconName} />
            </SvgIcon>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" onClick={onRefresh}>
            <SvgIcon color="action">
              <path d={mdiRefreshCircle} />
            </SvgIcon>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default CustomResultTextField;
