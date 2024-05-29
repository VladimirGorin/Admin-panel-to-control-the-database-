import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TablePagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import axios from "axios";

const UsersTable = (props) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
    const userToEdit = props.users.find((user) => user.id === userId);
    setEditedUser(userToEdit);
  };

  const handleSaveEdit = async () => {
    const updatedUsers = props.users.map((user) => {
      if (user.id === editedUser.id) {
        return { ...user, ...editedUser };
      }
      return user;
    });

    try {
      await axios.post(`${props.api}/update-users`, editedUser);
      props.setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
      alert(`Error while trying to save data: ${error}`);
    }

    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleCloseEdit = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleFieldChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Chat ID</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Is Subscribe</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Game Coins</TableCell>
              <TableCell align="right">Referral Coins</TableCell>
              <TableCell align="right">Referral Number</TableCell>
              <TableCell align="right">Booster</TableCell>
              <TableCell align="right">App Starts</TableCell>
              <TableCell align="right">Balance Sets</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.chatId}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">
                    {String(user.isSubscribe)}
                  </TableCell>
                  <TableCell align="right">{user.startDate}</TableCell>
                  <TableCell align="right">{user.balance}</TableCell>
                  <TableCell align="right">{user.gameCoins}</TableCell>
                  <TableCell align="right">{user.refCoins}</TableCell>
                  <TableCell align="right">{user.refNum}</TableCell>
                  <TableCell align="right">{user.booster}</TableCell>
                  <TableCell align="right">{user.appStarts}</TableCell>
                  <TableCell align="right">{user.balanceSets}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleEditClick(user.id)}
                    >
                      Редактировать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={Boolean(editingUserId)}
        onClose={handleCloseEdit}
        PaperProps={{ style: { maxHeight: "70vh" } }}
        scroll="paper"
      >
        <DialogTitle>Editing a user</DialogTitle>
        <DialogContent className="dialogContent">
          <TextField
            label="Chat ID"
            value={editedUser?.chatId || ""}
            onChange={(e) =>
              handleFieldChange("chatId", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
            type="number"
          />
          <TextField
            label="Username"
            value={editedUser?.username || ""}
            onChange={(e) => handleFieldChange("username", e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Is Subscribe</InputLabel>
            <Select
              value={editedUser?.isSubscribe || false}
              onChange={(e) => handleFieldChange("isSubscribe", e.target.value)}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            value={editedUser?.startDate || ""}
            onChange={(e) =>
              handleFieldChange("startDate", e.target.value || "")
            }
            fullWidth
            type="date"
          />
          <TextField
            label="Balance"
            value={editedUser?.balance || ""}
            onChange={(e) =>
              handleFieldChange("balance", parseFloat(e.target.value) || 0)
            }
            fullWidth
            type="number"
          />
          <TextField
            label="Game Coins"
            value={editedUser?.gameCoins || ""}
            onChange={(e) =>
              handleFieldChange("gameCoins", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
            type="number"
          />
          <TextField
            label="Referral Coins"
            value={editedUser?.refCoins || ""}
            onChange={(e) =>
              handleFieldChange("refCoins", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
            type="number"
          />
          <TextField
            label="Referral Number"
            value={editedUser?.refNum || ""}
            onChange={(e) =>
              handleFieldChange("refNum", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
            type="number"
          />
          <TextField
            label="Booster"
            value={editedUser?.booster || ""}
            onChange={(e) =>
              handleFieldChange("booster", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
            type="number"
          />
          <TextField
            label="App Starts"
            value={editedUser?.appStarts || ""}
            onChange={(e) =>
              handleFieldChange("appStarts", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
            type="number"
          />
          <TextField
            label="Balance Sets"
            value={editedUser?.balanceSets || ""}
            onChange={(e) =>
              handleFieldChange("balanceSets", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersTable;
