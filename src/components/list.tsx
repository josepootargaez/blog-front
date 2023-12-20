import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

const List: React.FC = () => {
  const array: Array<any> = [
    {
      Titulo: "Iro man 2",
      Autor: "Test",
      Fecha: "text",
      Contenido: "test testteadsañdsajlkdjfkjdlñfjsdjñfdjslñ",
    },
    {
      Titulo: "Iro man 3",
      Autor: "Test2",
      Fecha: "text2",
      Contenido: "test testteadsañdsajlkdjfkjdlñfjsdjñfdjslñ",
    },
    {
      Titulo: "hulk",
      Autor: "Test2",
      Fecha: "text2",
      Contenido: "test testteadsañdsajlkdjfkjdlñfjsdjñfdjslñ",
    },
  ];
  const [filter, setFilter] = useState('');

  const filteredData = array.filter(item =>{
    item.Contenido = item.Contenido.slice(0, 70);
    return item.Titulo.toLowerCase().includes(filter.toLowerCase())

  }
  );
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Agregar entrada
        </Button>
      </Grid>
      <TextField
        label="Filtrar por titulo"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Contenido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((movie, index) => (
              <TableRow key={index}>
                <TableCell>{movie.Titulo}</TableCell>
                <TableCell>{movie.Autor}</TableCell>
                <TableCell>{movie.Fecha}</TableCell>
                <TableCell>{movie.Contenido}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
