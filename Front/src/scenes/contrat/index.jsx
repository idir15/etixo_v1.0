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
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "Nom du Contrat",
      headerName: "Nom du Contrat",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Collaborateur",
      headerName: "Collaborateur",
      flex: 1,
    },
    {
      field: "Société du collaborateur",
      headerName: "Société du collaborateur",
      flex: 1,
    },
    {
      field: "Statut du collaborateur",
      headerName: "Statut du collaborateur",
      flex: 1,
    },
    {
      field: "N° SIRET",
      headerName: "N° SIRET",
      flex: 1,
    },
    {
      field: "Forme juridique",
      headerName: "Forme juridique",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "Code NAF",
      headerName: "Code NAF",
      flex: 1,
    },
    {
      field: "TVA",
      headerName: "TVA",
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
    style={{ backgroundColor: '#06668C', color: '#FFFFFF' }} // Utilisez la couleur rouge avec une valeur hexadécimale
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