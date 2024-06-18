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
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const MissionsTable = (props) => {
  const [editingMissionId, setEditingMissionId] = useState(null);
  const [editedMission, setEditedMission] = useState(null);
  const [newMission, setNewMission] = useState({ category: "", text: "", icon: "", link: "", points: "" });
  const [addMissionDialogOpen, setAddMissionDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (missionId) => {
    setEditingMissionId(missionId);
    const missionToEdit = props.missions.find((mission) => mission.id === missionId);
    setEditedMission(missionToEdit);
  };

  const handleSaveEdit = async () => {
    const updatedMissions = props.missions.map((mission) => {
      if (mission.id === editedMission.id) {
        return { ...mission, ...editedMission };
      }
      return mission;
    });

    try {
      await axios.post(`${props.api}/update-mission`, editedMission);
      props.setMissions(updatedMissions);
    } catch (error) {
      console.error(error);
      alert(`Error while trying to save data: ${error}`);
    }

    setEditingMissionId(null);
    setEditedMission(null);
  };

  const handleDeleteMission = async (missionId) => {
    try {
      await axios.post(`${props.api}/delete-mission`, { id: missionId });
      props.setMissions(props.missions.filter(mission => mission.id !== missionId));
    } catch (error) {
      console.error(error);
      alert(`Error while trying to delete mission: ${error}`);
    }
  };

  const handleCloseEdit = () => {
    setEditingMissionId(null);
    setEditedMission(null);
  };

  const handleFieldChange = (field, value) => {
    setEditedMission({ ...editedMission, [field]: value });
  };

  const handleOpenAddMissionDialog = () => {
    setAddMissionDialogOpen(true);
  };

  const handleCloseAddMissionDialog = () => {
    setAddMissionDialogOpen(false);
    setNewMission({ category: "", text: "", icon: "", link: "", points: "" });
  };

  const handleAddMission = async () => {
    try {
      const response = await axios.post(`${props.api}/add-mission`, newMission);

      props.setMissions([...props.missions, response.data?.mission]);
      handleCloseAddMissionDialog();
    } catch (error) {
      console.error(error);
      alert(`Error while trying to add mission: ${error}`);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Text</TableCell>
              <TableCell align="right">Icon</TableCell>
              <TableCell align="right">Link</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.missions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((mission) => (
              <TableRow key={mission.id}>
                <TableCell component="th" scope="row">
                  {mission.id}
                </TableCell>
                <TableCell align="right">{mission.category}</TableCell>
                <TableCell align="right">{mission.text}</TableCell>
                <TableCell align="right">
                  <img src={mission.icon} alt="icon" style={{ width: '30px', height: '30px' }} />
                </TableCell>
                <TableCell align="right">{mission.link}</TableCell>
                <TableCell align="right">{mission.points}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => handleEditClick(mission.id)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteMission(mission.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.missions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={Boolean(editingMissionId)}
        onClose={handleCloseEdit}
        PaperProps={{ style: { maxHeight: "70vh" } }}
        scroll="paper"
      >
        <DialogTitle>Editing a Mission</DialogTitle>
        <DialogContent className="dialogContent">
          <TextField
            label="Category"
            value={editedMission?.category || ""}
            onChange={(e) => handleFieldChange("category", e.target.value)}
            fullWidth
          />
          <TextField
            label="Text"
            value={editedMission?.text || ""}
            onChange={(e) => handleFieldChange("text", e.target.value)}
            fullWidth
          />
          <TextField
            label="Icon"
            value={editedMission?.icon || ""}
            onChange={(e) => handleFieldChange("icon", e.target.value)}
            fullWidth
          />
          <TextField
            label="Link"
            value={editedMission?.link || ""}
            onChange={(e) => handleFieldChange("link", e.target.value)}
            fullWidth
          />
          <TextField
            label="Points"
            value={editedMission?.points || ""}
            onChange={(e) => handleFieldChange("points", parseInt(e.target.value, 10) || 0)}
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
      <Dialog
        open={addMissionDialogOpen}
        onClose={handleCloseAddMissionDialog}
        PaperProps={{ style: { maxHeight: "70vh" } }}
        scroll="paper"
      >
        <DialogTitle>Add a New Mission</DialogTitle>
        <DialogContent className="dialogContent">
          <TextField
            label="Category"
            value={newMission.category}
            onChange={(e) => setNewMission({ ...newMission, category: e.target.value })}
            fullWidth
          />
          <TextField
            label="Text"
            value={newMission.text}
            onChange={(e) => setNewMission({ ...newMission, text: e.target.value })}
            fullWidth
          />
          <TextField
            label="Icon"
            value={newMission.icon}
            onChange={(e) => setNewMission({ ...newMission, icon: e.target.value })}
            fullWidth
          />
          <TextField
            label="Link"
            value={newMission.link}
            onChange={(e) => setNewMission({ ...newMission, link: e.target.value })}
            fullWidth
          />
          <TextField
            label="Points"
            value={newMission.points}
            onChange={(e) => setNewMission({ ...newMission, points: parseInt(e.target.value, 10) || 0 })}
            fullWidth
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddMissionDialog}>Cancel</Button>
          <Button onClick={handleAddMission} variant="contained" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleOpenAddMissionDialog} variant="contained" style={{ marginTop: '16px' }}>
        Add New Mission
      </Button>
    </>
  );
};

export default MissionsTable;
