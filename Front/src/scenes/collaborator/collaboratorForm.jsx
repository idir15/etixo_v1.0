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

const CollaboratorForm = ({ open, handleClose, updateCollaboratorData }) => {
  const [collaboratorData, setCollaboratorData] = useState({
    name: "",
    firstname: "",
    address: "",
    dateOfBirth: "",
    nationality: "",
    phone: "",
    email: "",
    company: null, // Utiliser l'objet Company
    socialSecurityNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [companies, setCompanies] = useState([]);

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
  };

  const handleCompanyChange = (event, value) => {
    setCollaboratorData((prevData) => ({
      ...prevData,
      company: value ? value : null, // Mettre à jour l'objet Company
    }));
  };

  const addCollaboratorToDB = async (collaborator) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/addcollaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collaborator),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout du collaborateur");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'ajout du collaborateur:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      if (
        collaboratorData.name &&
        collaboratorData.firstname &&
        collaboratorData.address &&
        collaboratorData.dateOfBirth &&
        collaboratorData.nationality &&
        collaboratorData.email &&
        collaboratorData.company.id
      ) {
        const addedCollaborator = await addCollaboratorToDB(collaboratorData);
        updateCollaboratorData(addedCollaborator);
        console.log("Données du collaborateur:", addedCollaborator);
        handleClose();
      } else {
        setErrorMessage("Veuillez remplir tous les champs obligatoires");
      }
    } catch (error) {
      setErrorMessage(error.message || "Erreur lors de l'ajout du collaborateur");
    }
  };

  const nationalites = [
    "France", "Algérie", "Maroc", "Suisse", "Belgique", "Espagne", "Italie", "Tunisie"
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
      <DialogTitle sx={{ backgroundColor: "#82C9D1", color: "#fff" }}>
        Nouveau Collaborateur
      </DialogTitle>
      <DialogContent>
        <CardContent>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                label="Nom Collaborateur"
                placeholder="Nom Collaborateur"
                fullWidth
                name="name"
                value={collaboratorData.name}
                color="success"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Prénom Collaborateur"
                placeholder="Prénom Collaborateur"
                fullWidth
                name="firstname"
                value={collaboratorData.firstname}
                color="success"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                name="dateOfBirth"
                label="Date de Naissance"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={collaboratorData.dateOfBirth}
                color="success"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                options={nationalites}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nationalité"
                    placeholder="Nationalité"
                    fullWidth
                    name="nationality"
                    value={collaboratorData.nationality}
                    color="success"
                    onChange={handleChange}
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
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Email"
                placeholder="Email"
                fullWidth
                type="email"
                name="email"
                value={collaboratorData.email}
                color="success"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Numéro Securité Sociale"
                placeholder="Numero Securité Sociale"
                fullWidth
                type="number"
                name="socialSecurityNumber"
                value={collaboratorData.socialSecurityNumber}
                color="success"
                onChange={handleChange}
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
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={companies}
                getOptionLabel={(option) => option.name}
                onChange={handleCompanyChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Entreprise"
                    placeholder="Entreprise"
                    fullWidth
                    name="company"
                    sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollaboratorForm;
