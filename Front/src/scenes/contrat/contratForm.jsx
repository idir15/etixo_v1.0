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
                label="Nom du Contrat"
                placeholder="Nom du Contrat"
                fullWidth
                name="Nom du Contrat"
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
            <Grid item xs={6}>
              <TextField
                label="Nom de Société du collaborateur"
                placeholder="Société du collaborateur"
                fullWidth
                name="Société du collaborateur"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
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

          <Grid container spacing={2} mb={4}>
            <Grid item xs={4}>
              <TextField
                label="N° SIRET"
                placeholder="Numero SIRET"
                fullWidth
                type="number"
                name="siret"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Forme juridique"
                placeholder="Forme juridique"
                fullWidth
                name="formeJuridique"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Code NAF"
                placeholder="Code NAF"
                fullWidth
                name="codeNAF"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="TVA"
                placeholder="TVA Intra"
                fullWidth
                name="tva"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="TVA"
                placeholder="TVA Intra"
                fullWidth
                name="tva"
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
