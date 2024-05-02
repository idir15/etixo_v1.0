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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const CompanyForm = ({ open, handleClose }) => {
  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    responsable: "",
    email: "",
    siret: "",
    legalStatus: "",
    phone: "",
    naf: "",
    tvaIntracom: "",
    tvaIntraSociete: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/addCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        console.log("Company added successfully");
        handleClose();
      } else {
        console.error("Failed to add company");
      }
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
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
      <DialogTitle sx={{ backgroundColor: "#0c54fa", color: "#fff" }}>
        Nouvelle Compagnie
      </DialogTitle>
      <DialogContent>
        <CardContent>
                    <label>
          Type:
          <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      sx={{ marginBottom: '18px', width: '100%' }}
    >
      <ToggleButton value="true" aria-label="italic"
                sx={{
                    width: '10%',
                    fontSize: '18px',
                  }}>Client
        
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined"
                sx={{
                    width: '10%',
                    fontSize: '18px',
                  }}>
        ESN
      </ToggleButton>
    </ToggleButtonGroup>
        </label>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Nom de l'entreprise"
                placeholder="Nom de l'entreprise"
                fullWidth
                name="name"
                value={companyData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Adresse"
                placeholder="Adresse"
                fullWidth
                name="address"
                value={companyData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Responsable"
                placeholder="Responsable"
                fullWidth
                name="responsable"
                value={companyData.responsable}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                placeholder="Email"
                fullWidth
                type="email"
                name="email"
                value={companyData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="N° SIRET"
                placeholder="Numero SIRET"
                fullWidth
                type="number"
                name="siret"
                value={companyData.siret}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Forme juridique"
                placeholder="Forme juridique"
                fullWidth
                name="legalStatus"
                value={companyData.legalStatus}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Code NAF"
                placeholder="Code NAF"
                fullWidth
                name="naf"
                value={companyData.naf}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="TVA Intracom"
                placeholder="TVA Intracom"
                fullWidth
                name="tvaIntracom"
                value={companyData.tvaIntracom}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="TVA Intra Societe"
                placeholder="TVA Intra Societe"
                fullWidth
                name="tvaIntraSociete"
                value={companyData.tvaIntraSociete}
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

export default CompanyForm;
