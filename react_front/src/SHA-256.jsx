import React from "react";
import Title from "./dashboard/Title";
import { Grid } from "@material-ui/core";
import { mdiNumeric2Box } from "@mdi/js";
import { mdiNumeric1Box, mdiPoundBox } from "@mdi/js";
import SHAInputTextField from "./customTextField/SHAInputTextField";
import CustomResultTextField from "./customTextField/ResultTextField";
import { BACK_END_URL } from "./utility";

export default function SHA256({ serverName }) {
  const [number1, setNumber1] = React.useState({ number: "" });
  const [number2, setNumber2] = React.useState({ number: "" });
  const [hashResult, setHashRsult] = React.useState({ Hash: "" });
  const [resultIsValid, setResultIsValid] = React.useState({ isValid: false });

  const updateHash = React.useCallback(() => {
    if (number1.number === "" || number2.number === "") return;
    fetch(`${BACK_END_URL}/${serverName}/sha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `number1=${number1.number}&number2=${number2.number}`,
    })
      .then((res) => {
        if (res.status === 200)
          res
            .json()
            .then((json) => {
              setResultIsValid({ isValid: true });
              setHashRsult(json);
            })
            .catch((e) => console.log(e));
      })
      .catch((err) => console.log(err));
  }, [number1.number, number2.number, serverName]);

  React.useEffect(() => {
    setResultIsValid({ isValid: false });
    updateHash();
  }, [number1, number2, updateHash]);

  return (
    <React.Fragment>
      <Title>sha256-{serverName}</Title>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <SHAInputTextField
            label="number1"
            setValue={setNumber1}
            iconName={mdiNumeric1Box}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SHAInputTextField
            label="number2"
            setValue={setNumber2}
            iconName={mdiNumeric2Box}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomResultTextField
            label="hash"
            iconName={mdiPoundBox}
            onRefresh={() => updateHash()}
            value={resultIsValid.isValid ? hashResult.Hash : ""}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
