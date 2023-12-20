import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const Addblog = () => {
  const [formData, setFormData]:any = useState({
    Titulo: '',
    Autor: '',
    Fecha: '',
    Contenido: '',
  });

  const [formErrors, setFormErrors] = useState({
    Titulo: '',
    Autor: '',
    Fecha: '',
    Contenido: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Validar campos obligatorios
    const errors:any = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        errors[key] = 'Este campo es obligatorio';
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Enviar el formulario o realizar otras acciones
      console.log('Formulario enviado:', formData);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Datos de entrada
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Titulo"
              name="Titulo"
              fullWidth
              margin="normal"
              value={formData.Titulo}
              onChange={handleChange}
              error={Boolean(formErrors.Titulo)}
              helperText={formErrors.Titulo}
              required
            />

            <TextField
              label="Autor"
              name="Autor"
              fullWidth
              margin="normal"
              value={formData.Autor}
              onChange={handleChange}
              error={Boolean(formErrors.Autor)}
              helperText={formErrors.Autor}
              required
            />

            <TextField
              label="Fecha"
              type="Fecha"
              name="Fecha"
              fullWidth
              margin="normal"
              value={formData.Fecha}
              onChange={handleChange}
              error={Boolean(formErrors.Fecha)}
              helperText={formErrors.Fecha}
              required
            />

            <TextField
              label="Contenido"
              type="Contenido"
              name="Contenido"
              fullWidth
              margin="normal"
              value={formData.Contenido}
              onChange={handleChange}
              error={Boolean(formErrors.Contenido)}
              helperText={formErrors.Contenido}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>
              Guardar
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Addblog;