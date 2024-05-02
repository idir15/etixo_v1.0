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

const ContratForm = ({ open, handleClose }) => {
    const [alignment, setAlignment] = useState('esn');

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

        Nouveau Contrat
      </DialogTitle>
      <DialogContent>
        <CardContent >




<br />
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
               id="outlined-multiline-flexible"
                label="Référence du Contrat"
                placeholder="Référence du Contrat"
                fullWidth
                name="Référence du Contrat"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
                /* sx={{ 
                    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' },
                    '& .MuiInputLabel-root': { fontSize: '18px' },
                    '& .MuiOutlinedInput-input': { padding: '14.5px 16px' } // Ajustez le padding selon vos besoins
                  }} */
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Collaborateur"
                placeholder="Collaborateur"
                fullWidth
                name="Collaborateur"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={4}>
          <Grid item xs={4}>
              <TextField
                label="Type de Contrat"
                placeholder="Type de Contrat"
                fullWidth
                name="Type de Contrat"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Nom de Société du collaborateur"
                placeholder="Société du collaborateur"
                fullWidth
                name="Société du collaborateur"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Statut du collaborateur"
                placeholder="Statut du collaborateur"
                fullWidth
                name="Statut du collaborateur"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
               id="outlined-multiline-flexible"
                label="Date début Contrat"
                placeholder="Date début Contrat"
                fullWidth
                name="Date debut Contrat"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date fin Contrat"
                placeholder="Date fin Contrat"
                fullWidth
                name="Date fin Contrat"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={4}>
            <Grid item xs={4}>
              <TextField
                label="Salaire Brut Annuel"
                placeholder="Salaire Brut Annuel"
                fullWidth
                type="number"
                name="siret"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Salaire Mensuel Net"
                placeholder="Salaire Mensuel Net"
                fullWidth
                name="Salaire Mensuel Net"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Charge Mensuel Patronale"
                placeholder="Charge Mensuel Patronale"
                fullWidth
                name="Charge Mensuel Patronale"
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

export default ContratForm;
