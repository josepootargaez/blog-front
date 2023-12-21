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
import ValidConnection from "./validConnection";
const List: React.FC = () => {
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connection, setconnection] = useState(navigator.onLine);


  async function handler(){
   return await getListBlog();
  }

  useEffect(() => {

    const handleConexionChange = () => {
      setconnection(navigator.onLine);
    };
    window.addEventListener('online', handleConexionChange);
    window.addEventListener('offline', handleConexionChange);
    if(connection == true){
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
      setLoading(false);
      fetchDataAsync();
    }

    return () => {
      window.removeEventListener('online', handleConexionChange);
      window.removeEventListener('offline', handleConexionChange);
    };
  }, []);

  const array: Array<any> = list;
  const [filter, setFilter] = useState('');

  const filteredData = array.length > 0 ? array.filter(item =>{
    if(item.content){
      item.content = item.content.slice(0, 70);
      return item.title.toLowerCase().includes(filter.toLowerCase())
    }
    return []
  }
  ) : []; 


  return (
    <>
     {connection ==false ? <ValidConnection/> : ''}
      <Grid container justifyContent="flex-end" onLoad={handler}>
        {connection == true ? <Link to="/add"  >
          <Button
            variant="contained"
            color="success"
            style={{ marginBottom: "20px",pointerEvents: 'none',}}
          >
            Agregar entrada
          </Button>
        </Link>:''}
        
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
