import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { createBlog } from '../api/createBlog';
import { useNavigate } from 'react-router-dom';
const Addblog =  () => {
    const navigate = useNavigate();
   const [errorApi,setError] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]:any = useState({
    title: '',
    author: '',
    content: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    author: '',
    content: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (e:any) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
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
          const fecha = new Date();
          const año = fecha.getFullYear();
          const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
          const dia = String(fecha.getDate()).padStart(2, '0');
          const horas = String(fecha.getHours()).padStart(2, '0');
          const minutos = String(fecha.getMinutes()).padStart(2, '0');
          const segundos = String(fecha.getSeconds()).padStart(2, '0');
  
    // Formateamos la cadena de fecha
    const fechaString = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
        const obj = {
          ...formData,
          date:fechaString
        }
        console.log('Formulario enviado:', obj);
        const res:any = await createBlog(obj);
        if(res?.success == true){
          navigate('/');
        }else{
          const txtError = res.response.data?.message ?? ''; 
          setError(txtError);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally {
      setIsSubmitting(false);
  }
  }
   

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
                name="title"
                fullWidth
                margin="normal"
                value={formData.title}
                onChange={handleChange}
                error={Boolean(formErrors.title)}
                helperText={formErrors.title}
                required
                />

                <TextField
                label="Autor"
                name="author"
                fullWidth
                margin="normal"
                value={formData.author}
                onChange={handleChange}
                error={Boolean(formErrors.author)}
                helperText={formErrors.author}
                required
                />

                <TextField
                label="Contenido"
                name="content"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                margin="normal"
                value={formData.content}
                onChange={handleChange}
                required
                />

                <Button type="submit" variant="contained" color="success" fullWidth style={{ marginTop: 16 }} disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </form>
            <Typography align="center" gutterBottom sx={{ mt: 2, color: 'red' }} >
                {errorApi}
            </Typography>
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