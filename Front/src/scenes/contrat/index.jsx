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
import ContratForm from "./contratForm";

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
  ];

  return (
    <>
      <Box m="20px">
        <Header
          title="CONTRATS"
          subtitle="Liste des Contrats"
        />
        <Button color="info" size="small" onClick={handleOpen}>
          Ouvrir
        </Button>
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
              backgroundColor: colors.blueAccent[700],
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

export default Contrat;
