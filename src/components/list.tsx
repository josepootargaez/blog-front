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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListBlog } from "../api/getListBlog";

const List: React.FC = () => {
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(true);
  async function handler(){
   return await getListBlog();
  
  }
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await handler();
        setlist(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally {
        setLoading(false);
      } 
    };

    fetchDataAsync();
  }, []);

  const array: Array<any> = list;
  console.log(array);
  const [filter, setFilter] = useState('');

  const filteredData = array.filter(item =>{
    if(item.content){
      item.content = item.content.slice(0, 70);
      return item.tittle.toLowerCase().includes(filter.toLowerCase())
    }
    return []
  }
  );
  return (
    <>
      <Grid container justifyContent="flex-end" onLoad={handler}>
        <Link to="/add">
          <Button
            variant="contained"
            color="success"
            style={{ marginBottom: "20px" }}
          >
            Agregar entrada
          </Button>
        </Link>
      </Grid>

      <TextField
        label="Filtrar por título"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {loading ? (
        <div>Cargando...</div>
      ) : (
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
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.author}</TableCell>
                  <TableCell>{movie.date}</TableCell>
                  <TableCell>{movie.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default List;
