import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
    <>
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
                type="date"
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                    shrink: true,
                }}
                />

                <TextField
                label="Contenido"
                name="Contenido"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                margin="normal"
                required
                />

                <Button type="submit" variant="contained" color="success" fullWidth style={{ marginTop: 16 }}>
                Guardar
                </Button>
            </form>
            </Paper>
        </Grid>
        </Grid>
        <Link to='/'>
            <Button type="submit" variant="contained" color="primary" style={{marginBottom:'20px'}} >
                    regresar
            </Button>
        </Link>
    </>
  );
};

export default Addblog;