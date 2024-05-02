import React from "react";
import { useState } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
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

const CollaboratorForm = ({ open, handleClose }) => {
    const [alignment, setAlignment] = useState('esn');
    const [collaboratorData, setCollaboratorData] = useState({
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

    const handleChange = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };
    const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

    const handleFormat = (event, newFormats) => {
      setFormats(newFormats);
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

        Nouveau Collaborateur
      </DialogTitle>
      <DialogContent>
        <CardContent >




<br />
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
               id="outlined-multiline-flexible"
                label="Nom Collaborateur"
                placeholder="Nom Collaborateur"
                fullWidth
                name="Nom Collaborateur"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
               
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
               id="outlined-multiline-flexible"
                label="Prénom Collaborateur"
                placeholder="Prénom Collaborateur"
                fullWidth
                name="Prénom Collaborateur"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
               
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Adresse Collaborateur"
                placeholder="Adresse Collaborateur"
                fullWidth
                name="Adresse Collaborateur"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                label="Date de Naissance"
                placeholder="Date de Naissance"
                fullWidth
                type="date"
                name="Date de Naissance"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Nationalité"
                placeholder="Nationalité"
                fullWidth
                name="Nationalité"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                label="Téléphone"
                placeholder="Téléphone"
                fullWidth
                type="number"
                name="Téléphone"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                placeholder="Email"
                fullWidth
                type="email"
                name="Email"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                label="Nom Compagnie"
                placeholder="Nom Compagnie"
                fullWidth
                name="Nom Compagnie"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Numéro Securité Sociale"
                placeholder="Numero Securité Sociale"
                fullWidth
                type="number"
                name="Numero Securité Sociale"
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
        <Button  color="primary">
          Soumettre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollaboratorForm;
