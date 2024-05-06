import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ContratForm from "./contratForm";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Contrat = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [contractToEdit, setContractToEdit] = useState(null);
 

  const handleOpen = () => {
    setContractToEdit(null); // Réinitialise les détails du contrat pour un nouvel ajout
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/deleteContract/${idToDelete}`, {
        method: 'DELETE',
      });
 
      if (response.ok) {
        console.log('Contrat supprimé avec succès');
        const updatedContracts = contracts.filter(contract => contract.id !== idToDelete);
        setContracts(updatedContracts);
        handleDialogClose();
      } else {
        console.error('Erreur lors de la suppression du contrat');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
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
    { field: "index", headerName: "N°", flex: 0.1, renderCell: (params) => params.api.getRowIndex(params.id) + 1},
    { field: "reference", headerName: "Référence", flex: 0.75 },
    { field: "collaborator", headerName: "Collaborateur", flex: 1 },
    { field: "contractType", headerName: "Type", flex: 0.75 },
    { field: "company", headerName: "Société", flex: 1 },
    { field: "status", headerName: "Statut", flex: 1 , hide: true},
    { field: "startDate", headerName: "Date début", flex: 0.75},
    { field: "endDate", headerName: "Date fin", flex: 0.75 },
    { field: "annualGrossSalary", headerName: "Salaire Brut Annuel", flex: 1, hide: true },
    { field: "monthlyNetSalary", headerName: "Salaire Mensuel Net", flex: 1, hide: true },
    { field: "monthlyEmployerCharge", headerName: "Charge Mensuel Patronale", flex: 1, hide: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
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
      <Box m="15px">
        <Header
          title="CONTRATS"
        />
 
        <div>
        {open && <ContratForm handleClose={handleClose} contract={contractToEdit} />}
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1px' }}>

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
            rows={contracts}
            sx={{
              "& .MuiDataGrid-cell": {
                fontSize: "16px !important",
              },
            }}
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
          <p>Voulez-vous vraiment supprimer ce contrat ? Cette opération ne peut pas être annulée.</p>
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
 
export default Contrat;
