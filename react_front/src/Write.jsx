import React from "react";
import Title from "./dashboard/Title";
import { Grid } from "@material-ui/core";
import { mdiCommentTextOutline, mdiNumeric } from "@mdi/js";
import CustomResultTextField from "./customTextField/ResultTextField";
import WriteInputTextField from "./customTextField/WriteInputTextField";
import { BACK_END_URL } from "./utility";

export default function Write({ serverName }) {
  const [result, setResult] = React.useState({ Hash: "" });
  const [lineNumber, setLineNumber] = React.useState({ number: "" });
  const [resultIsValid, setResultIsValid] = React.useState({ isValid: false });

  const updateHash = React.useCallback(() => {
    if (lineNumber.number === "") return;
    fetch(
      `${BACK_END_URL}/${serverName}/write?lineNumber=${lineNumber.number}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status === 200)
          res
            .json()
            .then((json) => {
              setResultIsValid({ isValid: true });
              setResult(json);
            })
            .catch((e) => console.log(e));
      })
      .catch((err) => console.log(err));
  }, [lineNumber.number, serverName]);

  React.useEffect(() => {
    setResultIsValid({ isValid: false });
    updateHash();
  }, [lineNumber, updateHash]);

  return (
    <React.Fragment>
      <Title>Write-{serverName}</Title>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <WriteInputTextField
            label="lineNumber"
            iconName={mdiNumeric}
            setValue={setLineNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomResultTextField
            label="text"
            onRefresh={() => updateHash()}
            iconName={mdiCommentTextOutline}
            value={resultIsValid.isValid ? result.Line : ""}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
