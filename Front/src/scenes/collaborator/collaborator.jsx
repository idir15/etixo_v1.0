// Collaborator.js

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
import CollaboratorForm from "./collaboratorForm";

const Collaborator = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [collaborator, setCollaborator] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenForm(false);
    setEditData(null);
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
        const transformedData = data.map(collaborator => ({
          ...collaborator,
          companyName: collaborator.company.name ,
        }));
        return transformedData;
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
    const collaboratorToEdit = collaborator.find(collab => collab.id === id);
    setEditData(collaboratorToEdit);
    setOpenForm(true);

  };

  const columns = [
    { field: "name", headerName: "Nom", flex: 1 },
    { field: "firstname", headerName: "Prénom", flex: 1 },
    { field: "dateOfBirth", headerName: "Date de Naissance", flex: 1 },
    { field: "nationality", headerName: "Nationalité", flex: 1, hide: true }, 
    { field: "phone", headerName: "Télephone", flex: 1, hide: true },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "companyName", headerName: "Nom Compagnie", flex: 1 },
    { field: "address", headerName: "Adresse Collaborateur", flex: 1, hide: true },
    { field: "socialSecurityNumber", headerName: "Numéro Securité Sociale", flex: 1, hide: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row.id)} startIcon={<EditIcon style={{ color: '#124660' }} />} />
          <Button onClick={() => handleDialogOpen(params.row.id)} startIcon={<DeleteIcon style={{ color: '#D42633' }} />} />

        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header
          title="Collaborateur"
        />
        <Box
          m="30px 0 0 0"
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
              fontSize: "16px !important",
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
              fontSize: "14px !important",
            },
          }}
        >
          <DataGrid
            rows={collaborator}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            sx={{
              "& .MuiDataGrid-cell": {
                fontSize: "16px !important",
              },
            }}
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
          <Button onClick={handleDialogClose} color="info" size="large"
style={{ color: '#999', minWidth: '120px', border: 'none', minHeight: '40px', borderRadius: '3px', margin: '0 5px', outline: 'none !important' }}>
Annuler
</Button>
<Button onClick={handleDelete} color="error" size="large" style={{ color: '#fff', minWidth: '120px', border: 'none', minHeight: '40px', borderRadius: '3px', margin: '0 5px', outline: 'none !important', background: '#f15e5e' }}>
Supprimer
</Button>
</DialogActions>
</Dialog>
<CollaboratorForm
open={openForm}
handleClose={handleClose}
updateCollaboratorData={(updatedCollaborator) => {
const updatedList = collaborator.map(item => item.id === updatedCollaborator.id ? updatedCollaborator : item);
setCollaborator(updatedList);
}}
editData={editData}
/>
</>
);
};

export default Collaborator;