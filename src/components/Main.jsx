import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, Typography } from "@mui/material";

export default function Main() {
  //          <UsersTable users={users} setUsers={setUsers} api={api} />

  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      spacing={3}
      direction="column"
      sx={{ bgcolor: 'background.paper', padding: 3 }}
    >
      <Button
        size="large"
        variant="contained"
        sx={{ textTransform: 'none' }}
      >
        <Link
          href="/users-table"
          color="inherit"
          underline="none"
          sx={{ padding: '0 16px' }}
        >
          <Typography variant="button">Users Table</Typography>
        </Link>
      </Button>
      <Button
        size="large"
        variant="contained"
        sx={{ textTransform: 'none' }}
      >
                <Link
          href="/missions-table"
          color="inherit"
          underline="none"
          sx={{ padding: '0 16px' }}
        >
        <Typography variant="button">Missions Table</Typography>
        </Link>
      </Button>
    </Stack>
  );
}
