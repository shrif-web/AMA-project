import React from "react";
import Write from "../Write";
import SHA256 from "../SHA-256";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function DashboardPaper() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/go/sha" />
                </Route>
                <Route exact path="/go/sha">
                  <SHA256 serverName="go" />
                </Route>
                <Route exact path="/node/sha">
                  <SHA256 serverName="node" />
                </Route>
                <Route exact path="/go/write">
                  <Write serverName="go" />
                </Route>
                <Route exact path="/node/write">
                  <Write serverName="node" />
                </Route>
                <Route path="/">
                  <div>404</div>
                </Route>
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
