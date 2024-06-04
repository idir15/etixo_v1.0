import React, { useState } from "react";
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

const CollaboratorForm = ({ open, handleClose }) => {
  const [collaboratorData, setCollaboratorData] = useState({
    name: "",
    firstName: "",
    address: "",
    dateOfBirth: "",
    nationality: "",
    phone: "",
    email: "",
    companyName: "",
    socialSecurityNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollaboratorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const sendDataToParent = (data) => {
    // Mettre à jour l'état du parent avec les données du collaborateur
    setCollaboratorData(data);
  };
  
  const handleSubmit = async () => {
    try {
      if (collaboratorData.name && collaboratorData.firstName && collaboratorData.address) {
        console.log("Données du collaborateur:", collaboratorData);
        handleClose();
        // Appeler la fonction du parent pour envoyer les données du collaborateur
        sendDataToParent(collaboratorData);
      } else {
        console.error("Veuillez remplir tous les champs obligatoires");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du collaborateur:", error);
    }
  };
  
  
  

  // Liste des nationalités
  const nationalites = [
    "France", "Algérie", "Maroc", "Suisse", "Belgique", "Espagne", "Italie" /* Ajoutez d'autres nationalités ici */
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
                name="firstName"
                value={collaboratorData.firstName}
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
            <TextField
              label="Nom Compagnie"
              placeholder="Nom Compagnie"
              fullWidth
              name="companyName"
              value={collaboratorData.companyName}
              color="success"
              onChange={handleChange}
            />
          </Grid>
          
        
        </Grid>
        </CardContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Soumettre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollaboratorForm;