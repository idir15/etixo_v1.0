import React, { useState, useEffect } from "react";
import {
  Button,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import CollaboratorForm from "../collaborator/collaboratorForm";
import AddIcon from '@mui/icons-material/Add';

const ContratForm = ({ open, handleClose, contractToEdit }) => {
  const [contractData, setContractData] = useState({
    reference: "",
    contractType: "",
    startDate: "",
    endDate: "",
    annualGrossSalary: "",
    monthlyNetSalary: "",
    monthlyEmployerCharge: "",
    collaborator: null,
    company: null,
  });

  const [errors, setErrors] = useState({});
  const [openCollaboratorForm, setOpenCollaboratorForm] = useState(false);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    fetchCollaborators();
  }, []);

  useEffect(() => {
    if (contractToEdit) {
      setContractData(contractToEdit);
    } else {
      resetForm();
    }
  }, [contractToEdit]);

  const resetForm = () => {
    setContractData({
      reference: "",
      contractType: "",
      startDate: "",
      endDate: "",
      annualGrossSalary: "",
      monthlyNetSalary: "",
      monthlyEmployerCharge: "",
      collaborator: null,
      company: null,
    });
  };

  const fetchCollaborators = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getAllcollaborator");
      if (response.ok) {
        const data = await response.json();
        setCollaborators(data);
      } else {
        console.error("Failed to fetch collaborators");
      }
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  const updateCollaboratorData = (data) => {
    if (!collaborators.some(collab => collab.id === data.id)) {
      setCollaborators(prevCollaborators => [...prevCollaborators, data]);
    }
    setContractData(prevData => ({
      ...prevData,
      collaborator: data,
      company: data.company,
    }));
  };

  useEffect(() => {
    if (contractData.collaborator) {
      const selectedCollaborator = collaborators.find(
        (collab) => collab.id === contractData.collaborator.id
      );
      if (selectedCollaborator) {
        setContractData(prevData => ({
          ...prevData,
          company: selectedCollaborator.company,
        }));
      }
    }
  }, [contractData.collaborator, collaborators]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCollaboratorSelect = (event, value) => {
    setContractData(prevData => ({
      ...prevData,
      collaborator: value ? value : null,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      collaborator: "",
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ["reference", "contractType", "startDate", "collaborator"];

    requiredFields.forEach((field) => {
      if (!contractData[field] || (field === "collaborator" && !contractData.collaborator?.id)) {
        newErrors[field] = "Ce champ est obligatoire";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        let url = "http://localhost:8080/api/v1/addContract";
        let method = "POST";

        if (contractToEdit) {
          url = `http://localhost:8080/api/v1/updateContract/${contractToEdit.id}`;
          method = "PUT";
        }

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contractData),
        });

        if (response.ok) {
          handleClose();
          window.location.reload();
        } else {
          console.error("Failed to add/update contract");
        }
      } catch (error) {
        console.error("Error adding/updating contract:", error);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          width: "70%",
          maxWidth: "none",
          maxHeight: "70vh",
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: "#048B9A", color: "#fff", fontSize: "18px" }}>
        {contractToEdit ? "Modifier Contrat" : "Nouveau Contrat"}
      </DialogTitle>
      <DialogContent>
        <CardContent>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-flexible"
                placeholder="Référence du Contrat"
                name="reference"
                label="Référence du Contrat *"
                value={contractData.reference}
                onChange={handleChange}
                fullWidth
                color="success"
                error={!!errors.reference}
                helperText={errors.reference}
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={collaborators}
                getOptionLabel={(option) => `${option.name} ${option.firstname}`}
                onChange={handleCollaboratorSelect}
                value={contractData.collaborator}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Collaborateur *"
                    placeholder="Collaborateur"
                    fullWidth
                    name="collaborator"
                    color="success"
                    error={!!errors.collaborator}
                    helperText={errors.collaborator}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '18px',
                      },
                    }}
                  
                    
                  />
                )}
                
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={4}>
              <TextField
                label="Type de Contrat *"
                placeholder="Type de Contrat"
                fullWidth
                name="contractType"
                value={contractData.contractType}
                onChange={handleChange}
                color="success"
                error={!!errors.contractType}
                helperText={errors.contractType}
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Nom de la société du collaborateur"
                placeholder="Société du collaborateur"
                fullWidth
                value={contractData.company?.name || ""}
                InputProps={{
                  readOnly: true,
                }}
                color="success"
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Statut du collaborateur"
                placeholder="Statut du collaborateur"
                fullWidth
                name="status"
                value={contractData.status}
                onChange={handleChange}
                color="success"
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                name="startDate"
                label="Date début Contrat *"
                type="date"
                value={contractData.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                color="success"
                error={!!errors.startDate}
                helperText={errors.startDate}
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="endDate"
                label="Date fin Contrat"
                type="date"
                value={contractData.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                color="success"
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={4}>
            <Grid item xs={4}>
              <TextField
                name="annualGrossSalary"
                label="Salaire Brut Annuel"
                type="number"
                value={contractData.annualGrossSalary}
                onChange={handleChange}
                fullWidth
                color="success"
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="monthlyNetSalary"
                label="Salaire Mensuel Net"
                type="number"
                value={contractData.monthlyNetSalary}
                onChange={handleChange}
                fullWidth
                color="success"
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="monthlyEmployerCharge"
                label="Charge Mensuelle Employeur"
                type="number"
                value={contractData.monthlyEmployerCharge}
                onChange={handleChange}
                fullWidth
                color="success"
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </DialogContent>
      <DialogActions>
      {!contractToEdit && (
          <Button 

          style={{ color: '#06668c' }}
          startIcon={<AddIcon />}

          onClick={() => setOpenCollaboratorForm(true)}
          >
            Ajouter Collaborateur
          </Button>
        )}
          <Button
          variant="contained"
          style={{ backgroundColor: '#ecf0f0', color: '#000000' }}
          size="large"
          onClick={handleClose}
          >
          Annuler
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#048B9A', color: '#FFFFFF' }}
            size="large"
            onClick={handleSubmit}
            >
            {contractToEdit ? "Modifier" : "Enregistrer"}
            </Button>

      </DialogActions>
      <CollaboratorForm
        open={openCollaboratorForm}
        handleClose={() => setOpenCollaboratorForm(false)}
        updateCollaboratorData={updateCollaboratorData}
      />
    </Dialog>
  );
};

export default ContratForm;
