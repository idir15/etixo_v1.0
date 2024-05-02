import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const Collaborator = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [collaborator, setCollaborator] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = (id) => {
    setDialogOpen(true);
    setIdToDelete(id);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const getAllcollaborator = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getAllcollaborator");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch collaborator");
        return [];
      }
    } catch (error) {
      console.error("Error fetching collaborator:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const companiesData = await getAllcollaborator();
      setCollaborator(companiesData);
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/deleteCollaborator/${idToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Collaborateur supprimé avec succès');
        const updatedCollaborator = collaborator.filter(collaborator => collaborator.id !== idToDelete);
        setCollaborator(updatedCollaborator);
        handleDialogClose();
      } else {
        console.error('Erreur lors de la suppression du collaborateur');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  const handleEdit = (id) => {
    console.log("Modifier l'élément avec l'ID :", id);
  };

  const columns = [
    { field: "firstname", headerName: "Nom", flex: 1 },
    { field: "name", headerName: "Prénom", flex: 1 },
    { field: "status", headerName: "Statut", flex: 1 },
    { field: "startDateContract", headerName: "Date début contrat", flex: 1 }, 
    { field: "endDateContract", headerName: "Date fin contrat", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row.id)} startIcon={<EditIcon />} />
          <Button onClick={() => handleDialogOpen(params.row.id)} startIcon={<DeleteIcon />} />
        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header
          title="Collaborateur"
          subtitle="Liste des collaborateurs"
        />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#82CFD8",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#82C9D1",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={collaborator}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle style={{ textAlign: 'center', position: 'relative' }}>
          <CloseIcon style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={handleDialogClose} />
          <Typography variant="h4" component="h4" style={{ fontSize: '26px', margin: '30px 0 -10px' }}>
            Êtes-vous sûr ?
          </Typography>
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center', color: '#999', padding: '20px', fontSize: '14px' }}>
          <p>Voulez-vous vraiment supprimer ce collaborateur ? Cette opération ne peut pas être annulée.</p>
        </DialogContent>
        <DialogActions style={{ border: 'none', textAlign: 'center', borderRadius: '5px', fontSize: '13px', padding: '10px 15px 25px' }}>
          <Button onClick={handleDialogClose} color="info" size="large" style={{ color: '#999', minWidth: '120px', border: 'none', minHeight: '40px', borderRadius: '3px', margin: '0 5px', outline: 'none !important' }}>
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error" size="large" style={{ color: '#fff', minWidth: '120px', border: 'none', minHeight: '40px', borderRadius: '3px', margin: '0 5px', outline: 'none !important', background: '#f15e5e' }}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Collaborator;
