import React, { useState } from "react";

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ContratForm from "./contratForm";

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Contrat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    
    console.log("Supprimer l'élément avec l'ID :", id);
  };

  const handleEdit = (id) => {
    
    console.log("Modifier l'élément avec l'ID :", id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "Référence du Contrat", headerName: "Référence du Contrat" },
    {
      field: "Collaborateur",
      headerName: "Collaborateur",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "Société",
      headerName: "Société",
      flex: 1,
    },
    {
      field: "Statut",
      headerName: "Statut",
      flex: 1,
    },
    {
      field: "Date debut",
      headerName: "Date debut",
      flex: 1,
    },
    {
      field: "Date fin",
      headerName: "Date fin",
      flex: 1,
    },
    {
      field: "Salaire Brut Annuel",
      headerName: "Salaire Brut Annuel",
      flex: 1,
    },
    {
      field: "Salaire Mensuel Net",
      headerName: "Salaire Mensuel Net",
      flex: 1,
    },
    {
      field: "Charge Mensuel Patronale",
      headerName: "Charge Mensuel Patronale",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.55,
      
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row.id)} startIcon={<EditIcon />}>
          </Button>

          <Button onClick={() => handleDelete(params.row.id)} startIcon={<DeleteIcon />}>
          </Button>
          
        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header
          title="CONTRATS"
          subtitle="Liste des Contrats"
        />

        <div>
          <ContratForm open={open} handleClose={handleClose} />
        </div>

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

<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    variant="contained"
    style={{ backgroundColor: '#82C9D1', color: '#FFFFFF' }} // Utilisez la couleur rouge avec une valeur hexadécimale
    size="large"
    onClick={handleOpen}
    startIcon={<AddIcon />}
  >
    Ajouter
  </Button>
</div>


          <DataGrid
            rows={mockDataContacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
        
      </Box>
    </>
  );
};

export default Contrat;
