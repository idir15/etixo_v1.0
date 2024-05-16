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
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControl,
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
    client: false,
    esn: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    requiredFields: [],
  });

  useEffect(() => {
    if (isEditMode && company) {
      setCompanyData(company);
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
        client: false,
        esn: false,
      });
    }
  }, [isEditMode, company]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation selon le champ
    let errorMessage = "";
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Adresse email invalide";
        }
        break;
      case "responsable":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = "Le nom du responsable ne doit contenir que des lettres.";
        }
        break;
      case "address":
        if (!/^[\w\s',]+$/.test(value)) {
          errorMessage = "L'adresse ne doit contenir que des lettres, des chiffres, des virgules et des apostrophes.";
        }
        break;
      case "siret":
      case "tvaIntracom":
        if (!/^\d+$/.test(value)) {
          errorMessage = "Ce champ doit contenir uniquement des chiffres.";
        }
        break;
      case "legalStatus":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = "La forme juridique ne doit contenir que des lettres.";
        }
        break;
      case "naf":
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          errorMessage = "Le code NAF ne doit contenir que des lettres et des chiffres.";
        }
        break;
      default:
        break;
    }

    // Mettre à jour les données de la société
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Mettre à jour les erreurs
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleValidation = () => {
    const newErrors = {
      email: "",
      requiredFields: [],
    };

    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyData.email)) {
      newErrors.email = "Adresse email invalide";
    }
    // Vérifier les champs obligatoires
    const requiredFields = ["name", "address", "responsable", "email", "siret"];
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCompanyData((prevData) => {
      const newState = { ...prevData, [name]: checked };

      if (checked) {
        // When a checkbox is checked, the other is also set to true
        if (name === "esn") newState.client = true;
        if (name === "client") newState.esn = true;
      } else {
        // When a checkbox is unchecked, the other remains true if it's already checked
        if (name === "esn" && !prevData.client) newState.client = false;
        if (name === "client" && !prevData.esn) newState.esn = false;
      }

      return newState;
    });
  };


  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick") {
      // Prevent closing when clicking outside
      return;
    }
    handleClose();

  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
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
      <DialogTitle sx={{ backgroundColor: "#048B9A"}}>

        {isEditMode ? "Modifier l'entreprise" : "Nouvelle Compagnie"}
      </DialogTitle>
      <DialogContent>
        <CardContent>
        <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={companyData.esn}
                    onChange={handleCheckboxChange}
                    name="esn"
                  />
                }
                label="ESN"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={companyData.client}
                    onChange={handleCheckboxChange}
                    name="client"
                  />
                }
                label="Client"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
            </FormGroup>
          </FormControl>

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
                error={errors.requiredFields.includes("responsable") || !!errors.responsable}
                helperText={errors.responsable}

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
                error={errors.requiredFields.includes("address") || !!errors.address}
                helperText={errors.address}
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

                label="N° SIRET *"
                placeholder="Numero SIRET"
                fullWidth
                name="siret"
                value={companyData.siret}
                onChange={handleChange}
                error={errors.requiredFields.includes("siret") || !!errors.siret}
                helperText={errors.siret}
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
                error={errors.requiredFields.includes("tvaIntracom") || !!errors.tvaIntracom}
                helperText={errors.tvaIntracom}
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
                error={errors.requiredFields.includes("legalStatus") || !!errors.legalStatus}
                helperText={errors.legalStatus}
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
                error={errors.requiredFields.includes("naf") || !!errors.naf}
                helperText={errors.naf}
              />
            </Grid>
          </Grid>
        </CardContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmitForm} color="primary">
          {isEditMode ? "Modifier" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyForm;
