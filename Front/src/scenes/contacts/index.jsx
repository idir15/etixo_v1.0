import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Contacts() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ margin: 20 }}>
      <FormControl fullWidth>
      <TextField   color="success" focused />

      </FormControl>
    </div>
  );
}

export default Contacts;
