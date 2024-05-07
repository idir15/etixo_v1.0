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
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  InputLabel, 
} from "@mui/material";
import CollaboratorForm from "../collaborator/collaboratorForm";

const ContratForm = ({ open, handleClose }) => {
  const [contractData, setContractData] = useState({
    reference: "",
    contractType: "",
    startDate: "",
    endDate: "",
    annualGrossSalary: "",
    monthlyNetSalary: "",
    monthlyEmployerCharge: "",
    collaborator: "", // Conservez l'ID du collaborateur ici
    company: "", // Ajoutez un état pour le nom de la société
  });

  const [openCollaboratorForm, setOpenCollaboratorForm] = useState(false);

  const [collaboratorData, setCollaboratorData] = useState(null);

  const [collaborators, setCollaborators] = useState([]); // Liste des collaborateurs

  useEffect(() => {
    fetchCollaborators(); // Appel à la fonction pour récupérer la liste des collaborateurs au chargement du composant
  }, []);

  const fetchCollaborators = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getAllcollaborator");
      if (response.ok) {
        const data = await response.json();
        setCollaborators(data); // Stockage de la liste des collaborateurs dans l'état local
      } else {
        console.error("Failed to fetch collaborators");
      }
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };


  const updateCollaboratorData = (data) => {
    // Mettre à jour les données du collaborateur dans les données du contrat
    setContractData((prevData) => ({
      ...prevData,
      collaborator: data.id, // Mettez à jour l'ID du collaborateur
      company: data.companyName, // Mettez à jour le nom de la société
    }));
  };
  





  useEffect(() => {
    if (collaboratorData) {
      submitCollaboratorToDatabase(collaboratorData);
    }
  }, [collaboratorData]);


  // Soumet les données du collaborateur à la base de données
  const submitCollaboratorToDatabase = async (collaboratorData) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/addcollaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collaboratorData),
      });

      if (response.ok) {
        console.log("Collaborator added successfully");
      } else {
        console.error("Failed to add collaborator");
      }
    } catch (error) {
      console.error("Error adding collaborator:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCollaboratorFormOpen = () => {
    setOpenCollaboratorForm(true);
  };

  const handleCollaboratorFormClose = () => {
    setOpenCollaboratorForm(false);
  };

  const handleSubmit = async () => {
    try {
      // Vérifier que les champs obligatoires sont remplis
      if (
        contractData.reference &&
        contractData.contractType &&
        contractData.startDate &&
        contractData.endDate &&
        contractData.collaborator
      ) {
        // Envoyer les données du contrat à l'API
        const response = await fetch("http://localhost:8080/api/v1/addContract", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contractData),
        });

        // Vérifier la réponse de l'API
        if (response.ok) {
          console.log("Contract added successfully");
          handleClose();
        } else {
          console.error("Failed to add contract");
        }
      } else {
        console.error("Veuillez remplir tous les champs obligatoires");
      }
    } catch (error) {
      console.error("Error adding contract:", error);
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" sx={{
      "& .MuiDialog-paper": {
        width: "70%",
        maxWidth: "none",
        maxHeight: "70vh"
      }
    }}>
      <DialogTitle sx={{ backgroundColor: "#82C9D1", color: "#fff" }}>
        Nouveau Contrat
      </DialogTitle>
      <DialogContent>
      <CardContent >




<br />
<Grid container spacing={3} mb={4}>

  <Grid item xs={6}>
    <TextField
      id="outlined-multiline-flexible"
      placeholder="Référence du Contrat"
      name="reference"
      label="Référence du Contrat"
      value={contractData.reference}
      onChange={handleChange}
      fullWidth
      color="success"
      sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
    />
  </Grid>
  <Grid item xs={6}>
  <Select
                label="Collaborateur"
                placeholder="Collaborateur"
                fullWidth
                name="collaborator"
                value={contractData.collaborator}
                onChange={handleChange}
                color="success"
                sx={{ "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { fontSize: "18px" } }}
              >
                {collaborators.map((collaborator) => (
                  <MenuItem key={collaborator.id} value={collaborator.id}>
                    {collaborator.name} {/* Remplacer "name" par le nom de votre attribut dans la réponse */}
                  </MenuItem>
                ))}
              </Select>
  </Grid>
</Grid>

          <Grid container spacing={3} mb={4}>
          <Grid item xs={4}>
              <TextField
                label="Type de Contrat"
                placeholder="Type de Contrat"
                fullWidth
                name="contractType"
                value={contractData.contractType}
                onChange={handleChange}
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Nom de Société du collaborateur"
                placeholder="Société du collaborateur"
                fullWidth
                name="company"
                value={contractData.company}
                onChange={handleChange}
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Statut du collaborateur"
                placeholder="Statut du collaborateur"
                fullWidth
                name="statut"
                value={contractData.status}
                onChange={handleChange}
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                name="startDate"
                label="Date début Contrat"
                type="date"
                value={contractData.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
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
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
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
              sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
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
              sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="monthlyEmployerCharge"
              label="Charge Mensuel Patronale"
              type="number"
              value={contractData.monthlyEmployerCharge}
              onChange={handleChange}
              fullWidth
             
              color="success"
              sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
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
        <Button onClick={() => setOpenCollaboratorForm(true)} color="primary">
        Nouveau Collaborateur
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
