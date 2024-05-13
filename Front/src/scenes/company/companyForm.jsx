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
  Typography
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
    isClient: false,
    isEsn: false,
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
 

  const handleTypeSelection = (value) => {
    if (value === 'client') {
      setCompanyData((prevData) => ({
        ...prevData,
        isClient: true,
        isEsn: false,
      }));
    } else if (value === 'esn') {
      setCompanyData((prevData) => ({
        ...prevData,
        isClient: false,
        isEsn: true,
      }));
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

          maxHeight: "70vh"
        }
      }}>

      <DialogTitle sx={{ backgroundColor: "#06668C", color: "#fff" }}>

        Nouvelle Compagnie
      </DialogTitle>
      <DialogContent>
      <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Type sélectionné: {companyData.isClient ? "Client" : companyData.isEsn ? "ESN" : ""}
          </Typography>
          <label>
            Type:
            <ToggleButtonGroup
  value={companyData.isClient ? 'client' : companyData.isEsn ? 'esn' : ''}
  onChange={(event, value) => handleTypeSelection(value)}
  aria-label="text formatting"
  sx={{ marginBottom: '18px', width: '100%' }}
>
<ToggleButton
  value="client"
  sx={{
    width: '10%',
    fontSize: '18px',
    backgroundColor: companyData.isClient ? '#FF0000' : '',
    color: companyData.isClient ? '#fff' : '',
    '&.Mui-selected': {
      backgroundColor: '#FF0000',
      color: '#fff',
    },
  }}
>
  Client
</ToggleButton>
<ToggleButton
  value="esn"
  sx={{
    width: '10%',
    fontSize: '18px',
    backgroundColor: companyData.isEsn ? '#FF0000' : '',
    color: companyData.isEsn ? '#fff' : '',
    '&.Mui-selected': {
      backgroundColor: '#FF0000',
      color: '#fff',
    },
  }}
>
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
                label="TVA"
                placeholder="TVA Intra"
                fullWidth
                name="tvaIntracom"
                value={companyData.tvaIntracom}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="TVA"
                placeholder="TVA Intra"
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
