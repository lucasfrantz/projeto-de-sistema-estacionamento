import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link style={{ textDecoration: "none" }} to="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Funções
    </ListSubheader>
    <Link style={{ textDecoration: "none" }} to="/occupation">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Occupação" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none" }} to="/vehicles">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Carros" />
      </ListItemButton>
    </Link>
    <Link style={{ textDecoration: "none" }} to="/parkingspots">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Vagas" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
