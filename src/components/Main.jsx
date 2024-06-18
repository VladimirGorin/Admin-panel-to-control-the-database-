import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      spacing={3}
      direction="column"
      sx={{ bgcolor: "background.paper", padding: 3 }}
    >
      <Button size="large" variant="contained" sx={{ textTransform: "none" }}>
        <Link
          to="/users-table"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography variant="button">Users Table</Typography>
        </Link>
      </Button>
      <Button size="large" variant="contained" sx={{ textTransform: "none" }}>
        <Link
          to="/missions-table"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography variant="button">Missions Table</Typography>
        </Link>
      </Button>
    </Stack>
  );
}
