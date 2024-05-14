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
import { useTheme } from "@mui/material";
import CompanyForm from "./companyForm";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
 
import CloseIcon from '@mui/icons-material/Close';
 
import { tokens } from "../../theme";
import Header from "../../components/Header";
 
 
const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
 
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
 
  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/getCompany/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEditingCompany(data); // Met à jour l'état avec les informations de l'entreprise à modifier
        setOpen(true); // Ouvre le formulaire de modification
      } else {
        console.error("Failed to fetch company for editing");
      }
    } catch (error) {
      console.error("Error fetching company for editing:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/deleteCompany/${idToDelete}`, {
        method: 'DELETE',
      });
 
      if (response.ok) {
        console.log('Compagnie supprimée avec succès');
        const updatedCompanies = companies.filter(company => company.id !== idToDelete);
        setCompanies(updatedCompanies);
        handleDialogClose();
      } else {
        console.error('Erreur lors de la suppression de la compagnie');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };
 
  const handleFormSubmit = async (companyData) => {
    try {
      let url = "http://localhost:8080/api/v1/addCompany"; // URL par défaut pour l'ajout d'une entreprise
      let method = "POST"; // Méthode par défaut pour l'ajout
  
      if (companyData.id) {
        // S'il y a un ID dans les données de l'entreprise, cela signifie que c'est une mise à jour
        url = `http://localhost:8080/api/v1/updateCompany/${companyData.id}`; // Ajoutez l'ID à l'URL pour la mise à jour
        method = "PUT"; // Utilisez la méthode PUT pour la mise à jour
      }
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });
  
      if (response.ok) {
        console.log("Company added/updated successfully");
        handleClose();
      } else {
        console.error("Failed to add/update company");
      }
    } catch (error) {
      console.error("Error adding/updating company:", error);
    }
  };
  
 
  const getType = (client, esn) => {
 if (client && esn) {
return "Client & ESN";
 } else if (client) {
      return "Client";
    } else if (esn) {
      return "ESN";
    } else{
      return "Erreur";
    }
  };
  const columns = [
    { field: "id", headerName: "N°", flex: 0.2,},
    { field: "name", headerName: "Nom", flex: 1 },
    { 
      field: "type", 
      headerName: "Type", 
      flex: 0.8,
      valueGetter: (params) => {
        const { client, esn} = params.row;
        return getType(client, esn);
      }
    },
    { field: "address", headerName: "Adresse", flex: 1,hide: true },
    { field: "responsable", headerName: "Responsable", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "siret", headerName: "N° SIRET", flex: 1 },
    { field: "legalStatus", headerName: "Forme juridique", flex: 1, hide: true },
    { field: "naf", headerName: "Code NAF", flex: 1, hide: true },
    { field: "tva", headerName: "TVA", flex: 1, hide: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.55,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row.id)} startIcon={<EditIcon style={{ color: '#124660' }} />} />
          <Button onClick={() => handleDialogOpen(params.row.id)} startIcon={<DeleteIcon style={{ color: '#D42633' }}/>} />
        </>
      ),
    },
  ];
 
  return (
    <>
      <Box m="20px">
      <Header
          title="Companies"
        />
        <div>
          <CompanyForm
            open={open}
            handleClose={handleClose}
            company={editingCompany} // Passe les informations de l'entreprise à modifier au formulaire
            handleSubmit={handleFormSubmit} // Passe la fonction de soumission du formulaire
          />
        </div>

        
 
        <Box
          m="0"
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#048B9A', color: '#FFFFFF' }}
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
          <p>Voulez-vous vraiment supprimer cette entreprise ? Cette opération ne peut pas être annulée.</p>
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
 
export default Company;