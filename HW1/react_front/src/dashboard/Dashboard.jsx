
import React from "react";
import DashboardPaper from "./DashboardPaper";
import DashboardDrawer from "./DashboardDrawer";
import DashboardAppBar from "./DashboardAppBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function CustomDashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <CssBaseline />
        <DashboardAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <DashboardDrawer open={open} handleDrawerClose={handleDrawerClose} />
        <DashboardPaper />
    </div>
  );
}

