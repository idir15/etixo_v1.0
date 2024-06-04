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

const CollaboratorForm = ({ open, handleClose, updateCollaboratorData, editData }) => {
  const [collaboratorData, setCollaboratorData] = useState({
    name: "",
    firstname: "",
    address: "",
    dateOfBirth: "",
    nationality: "",
    phone: "",
    email: "",
    company: null,
    socialSecurityNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (editData) {
      setCollaboratorData(editData);
    }
  }, [editData]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getAllCompanies");
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        console.error("Failed to fetch companies");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollaboratorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleNationalityChange = (event, value) => {
    setCollaboratorData((prevData) => ({
      ...prevData,
      nationality: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      nationality: "",
    }));
  };
  
  const handleCompanyChange = (event, value) => {
    setCollaboratorData((prevData) => ({
      ...prevData,
      company: value ? value : null,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      company: "",
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ["name", "firstname", "dateOfBirth", "nationality", "email", "company"];

    requiredFields.forEach((field) => {
      if (!collaboratorData[field]) {
        newErrors[field] = "Ce champ est obligatoire";
      }
    });

    if (collaboratorData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(collaboratorData.email)) {
      newErrors.email = "Adresse email invalide";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        let url = "http://localhost:8080/api/v1/addcollaborator";
        let method = "POST"; 
    
        if (collaboratorData.id) {
          url = `http://localhost:8080/api/v1/updateCollaborator/${collaboratorData.id}`;
          method = "PUT";
        }
    
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(collaboratorData),
        });
    
        if (response.ok) {
          handleClose();
          updateCollaboratorData(collaboratorData);
        } else {
          console.error("Failed to add/update collaborator");
        }
      } catch (error) {
        console.error("Error adding/updating collaborator:", error);
      }
    }
  };

  const nationalityOptions = [
    "France", "Algérie", "Maroc", "Suisse", "Belgique", "Espagne", "Italie", "Tunisie",
  ];

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
        {editData ? "Modifier Collaborateur" : "Nouveau Collaborateur"}
      </DialogTitle>
      <DialogContent>
        <CardContent>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                label="Nom Collaborateur *"
                placeholder="Nom Collaborateur"
                fullWidth
                name="name"
                value={collaboratorData.name}
                color="success"
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Prénom Collaborateur *"
                placeholder="Prénom Collaborateur"
                fullWidth
                name="firstname"
                value={collaboratorData.firstname}
                color="success"
                onChange={handleChange}
                error={!!errors.firstname}
                helperText={errors.firstname}
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                name="dateOfBirth"
                label="Date de Naissance *"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={collaboratorData.dateOfBirth}
                color="success"
                onChange={handleChange}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={nationalityOptions}
                value={collaboratorData.nationality}
                onChange={handleNationalityChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nationalité *"
                    placeholder="Nationalité"
                    fullWidth
                    color="success"
                    error={!!errors.nationality}
                    helperText={errors.nationality}
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
                label="Téléphone"
                placeholder="Téléphone"
                fullWidth
                type="number"
                name="phone"
                value={collaboratorData.phone}
                color="success"
                onChange={handleChange}
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Email *"
                placeholder="Email"
                fullWidth
                type="email"
                name="email"
                value={collaboratorData.email}
                color="success"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Numéro Sécurité Sociale"
                placeholder="Numéro Sécurité Sociale"
                fullWidth
                type="number"
                name="socialSecurityNumber"
                value={collaboratorData.socialSecurityNumber}
                color="success"
                onChange={handleChange}
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                label="Adresse Collaborateur"
                placeholder="Adresse Collaborateur"
                fullWidth
                name="address"
                value={collaboratorData.address}
                color="success"
                onChange={handleChange}
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={companies}
                getOptionLabel={(option) => option.name}
                value={collaboratorData.company}
                onChange={handleCompanyChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Entreprise *"
                    placeholder="Entreprise"
                    fullWidth
                    color="success"
                    error={!!errors.company}
                    helperText={errors.company}
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
        </CardContent>
        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
      </DialogContent>
      <DialogActions>

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
              {editData ? "Modifier" : "Ajouter"}
            </Button>

      </DialogActions>
    </Dialog>
  );
};

export default CollaboratorForm;
