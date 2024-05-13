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
} from "@mui/material";

const CompanyForm = ({ open, handleClose, company, handleSubmit }) => {
  const isEditMode = !!company;
  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    responsable: "",
    email: "",
    siret: "",
    legalStatus: "",
    naf: "",
    tvaIntracom: "",
    tvaIntraSociete: "",
  });
  const [isClient, setIsClient] = useState(true);
  const [isEsn, setIsEsn] = useState(true);

  const [errors, setErrors] = useState({
    email: "",
    requiredFields: [],
  });


  useEffect(() => {
    if (isEditMode && company) {
      setCompanyData(company);
      setIsClient(company.isClient);
      setIsEsn(company.isEsn);
    } else {
      setCompanyData({
        name: "",
        address: "",
        responsable: "",
        email: "",
        siret: "",
        legalStatus: "",
        naf: "",
        tvaIntracom: "",
        tvaIntraSociete: "",
      });
      setIsClient(true);
      setIsEsn(true);
    }
  }, [isEditMode, company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleValidation = () => {
    const newErrors = {
      email: "",
      requiredFields: [],
    };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyData.email)) {
      newErrors.email = "Adresse email invalide";
    }
    // Check required fields
    const requiredFields = ["name", "address", "responsable", "email"];
    requiredFields.forEach((field) => {
      if (!companyData[field]) {
        newErrors.requiredFields.push(field);
      }
    });

    setErrors(newErrors);

    return newErrors.email === "" && newErrors.requiredFields.length === 0;
  };
  const handleSubmitForm = () => {
    if (handleValidation()) {
      handleSubmit(companyData);
    }
  };


  const [formats, setFormats] = React.useState(() => []);


  const handleFormat = (event, newFormats) => {
    if (newFormats.includes("Client")) {
      setIsClient(true);
      setIsEsn(true);
    } else if (newFormats.includes("ESN")) {
      setIsClient(true);
      setIsEsn(true);
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

      <DialogTitle sx={{ backgroundColor: "#048B9A", color: "#fff" }}>

      {isEditMode ? "Modifier l'entreprise" : "Nouvelle Compagnie"}
      </DialogTitle>
      <DialogContent>
        <CardContent>

        <label>
            Type:
            <ToggleButtonGroup
              value={isClient ? ["Client"] : isEsn ? ["ESN"] : []}
              onChange={handleFormat}
              sx={{ marginBottom: "18px", width: "100%" }}
            >
              <ToggleButton

                sx={{
                  width: "10%",
                  fontSize: "18px",
                }}
                value="Client"
              >
                Client
              </ToggleButton>
              <ToggleButton
                sx={{
                  width: "10%",
                  fontSize: "18px",
                }}
                value="ESN"
              >
                ESN
              </ToggleButton>
            </ToggleButtonGroup>
          </label>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Nom de l'entreprise *"
                placeholder="Nom de l'entreprise"
                fullWidth
                name="name"
                value={companyData.name}
                onChange={handleChange}
                error={errors.requiredFields.includes("name")}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField

              label="Responsable *"
              placeholder="Responsable"

              fullWidth
              name="responsable"
              value={companyData.responsable}
              onChange={handleChange}
              error={errors.requiredFields.includes("responsable")}
              />
              
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Adresse *"
                placeholder="Adresse"
                fullWidth
                name="address"
                value={companyData.address}
                onChange={handleChange}
                error={errors.requiredFields.includes("address")}
              />
              
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Email *"
                placeholder="Email"
                fullWidth
                type="email"
                name="email"
                value={companyData.email}
                onChange={handleChange}
                error={errors.requiredFields.includes("email") || !!errors.email}
                helperText={errors.email}
              />


            </Grid>
            
            <Grid item xs={6}>
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
                label="TVA"
                placeholder="TVA Intra"
                fullWidth
                name="tvaIntracom"
                value={companyData.tvaIntracom}
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


          </Grid>
        </CardContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Annuler
        </Button>

        <Button onClick={() => handleSubmitForm(companyData)} color="primary">



        
          {isEditMode ? "Modifier" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyForm;
