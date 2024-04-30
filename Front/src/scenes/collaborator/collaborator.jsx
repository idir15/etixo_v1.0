/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Collaborator = () => {
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
    
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
     
    },
    {
        field: "lastname",
        headerName: "Prénom",
        flex: 1,
        
      },
      {
        field: "statut",
        headerName: "Statut",
        flex: 1,
        
      },
      { field: "startDate",
       headerName: "Date début contrat",
        flex: 1 }, 

     { field: "endDate", 
       headerName: "Date fin contrat",
       flex: 1 
      },

      {
        field: "actions",
        headerName: "Actions",
        flex: 0.3,
        
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
            rows={mockDataContacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Collaborator;