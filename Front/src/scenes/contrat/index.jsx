import React, { useState, useEffect } from "react";

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
  const [contracts, setContracts] = useState([]);

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
  const getAllContracts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getAllContracts");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch contracts");
        return [];
      }
    } catch (error) {
      console.error("Error fetching contracts:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const contractsData = await getAllContracts();
      setContracts(contractsData);
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "reference", headerName: "Référence du Contrat" },
    {
      field: "collaborator",
      headerName: "Collaborateur",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contractType",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "company",
      headerName: "Société",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Statut",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Date début",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "Date fin",
      flex: 1,
    },
    {
      field: "annualGrossSalary",
      headerName: "Salaire Brut Annuel",
      flex: 1,
    },
    {
      field: "monthlyNetSalary",
      headerName: "Salaire Mensuel Net",
      flex: 1,
    },
    {
      field: "monthlyEmployerCharge",
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
            rows={contracts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
        
      </Box>
    </>
  );
};

export default Contrat;
