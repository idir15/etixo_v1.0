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

const CompanyForm = ({ open, handleClose }) => {
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

      <DialogTitle sx={{ backgroundColor: "#0c54fa", color: "#fff" }}>
        Nouvelle Compagnie
      </DialogTitle>
      <DialogContent>
        <CardContent >
          <br />
          <label>
          Type:
          <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      sx={{ marginBottom: '18px', width: '100%' }}
    >
      <ToggleButton value="italic" aria-label="italic"
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


<br />
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
               id="outlined-multiline-flexible"
                label="Nom de l'entreprise"
                placeholder="Nom de l'entreprise"
                fullWidth
                name="nom"
                color="success"
                sx={{ 
                    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' },
                    '& .MuiInputLabel-root': { fontSize: '18px' },
                    '& .MuiOutlinedInput-input': { padding: '14.5px 16px' } // Ajustez le padding selon vos besoins
                  }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Adresse"
                placeholder="Adresse"
                fullWidth
                name="adresse"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6}>
              <TextField
                label="Nom du responsable"
                placeholder="Nom du responsable"
                fullWidth
                name="nomResponsable"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                placeholder="email@example.com"
                fullWidth
                type="email"
                name="email"
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
                label="TVA Intracom"
                placeholder="TVA Intracom"
                fullWidth
                name="tva"
                color="success"
                sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '18px' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="TVA Intra Societe"
                placeholder="TVA Intra Societe"
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

export default CompanyForm;
