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

const Company = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

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
          <Button onClick={() => handleDialogOpen(params.row.id)} startIcon={<DeleteIcon />} />
        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <div>
          {/* Ajoutez votre composant de formulaire d'entreprise ici */}
        </div>

        <Box
          m="40px 0 0 0"
          height="75vh"
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
