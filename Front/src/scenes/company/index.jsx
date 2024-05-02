import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import CompanyForm from "./companyForm";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { tokens } from "../../theme";
import Header from "../../components/Header";


const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllCompanies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getAllCompanies");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch companies");
        return [];
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const companiesData = await getAllCompanies();
      setCompanies(companiesData);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    console.log("Supprimer l'élément avec l'ID :", id);
  };

  const handleEdit = (id) => {
    console.log("Modifier l'élément avec l'ID :", id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Nom", flex: 1 },
    { field: "address", headerName: "Adresse", flex: 1 },
    { field: "responsable", headerName: "Responsable", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "siret", headerName: "N° SIRET", flex: 1 },
    { field: "legalStatus", headerName: "Forme juridique", flex: 1 },
    { field: "phone", headerName: "Numero téléphone", flex: 1 },
    { field: "naf", headerName: "Code NAF", flex: 1 },
    { field: "tva", headerName: "TVA", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.55,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row.id)} startIcon={<EditIcon />} />
          <Button onClick={() => handleDelete(params.row.id)} startIcon={<DeleteIcon />} />
        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
      <Header
          title="Companies"
          subtitle="Liste des Compagnies"
        />
        <div>
          <CompanyForm open={open} handleClose={handleClose} />
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#06668C', color: '#FFFFFF' }}
              size="large"
              onClick={handleOpen}
              startIcon={<AddIcon />}
            >
              Ajouter
            </Button>
          </div>

          <DataGrid
            rows={companies}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Company;
