import {
  Button,
  Checkbox,
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
  const [list, setlist]:Array<any>= useState([]);
  const [loading, setLoading] = useState(true);
  const [connection, setconnection] = useState(navigator.onLine);


  async function handler(){
   return await getListBlog();
  }
  const fetchDataAsync = async () => {
    try {
      const result = await handler();
      setlist(result);
      return true
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally {
      setLoading(false);
    } 
  };

  useEffect(() => {

    const handleConexionChange = () => {
      setconnection(navigator.onLine);
    };
    window.addEventListener('online', handleConexionChange);
    window.addEventListener('offline', handleConexionChange);
    if(connection == true){
     
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

  const [filtro, setFiltro] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState(true);
  const [filtroAutor, setFiltroAutor] = useState(false);
  const [filtroContenido, setFiltroContenido] = useState(false);
  
  const handleFiltrar = async () => {
    const campoFiltrar = filtroTitulo ? 'title' : filtroAutor ? 'author' : filtroContenido ? 'content' : '';
    let lisArray= list;  
    if(list.length == 0){
      lisArray = await handler();
      }
        const datosFiltrados = lisArray.filter((dato:any) =>
        dato[campoFiltrar].toLowerCase().includes(filtro.toLowerCase())
      );
      setlist(datosFiltrados);
    
  };

  const handleLimpiarFiltros = () => {
    setlist(list);
    setFiltro('');
    setFiltroTitulo(true);
    setFiltroAutor(false);
    setFiltroContenido(false);
    fetchDataAsync();
  };
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
        label={`Filtrar por ${filtroTitulo ? 'título' : filtroAutor ? 'autor' : filtroContenido ? 'contenido' : ''}`}
        variant="outlined"
        fullWidth
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Grid container spacing={1} className="mi-fila"   style={{ marginBottom: 15 }}>
        <Grid item xs={2}>
        <div>
        <Checkbox
          checked={filtroTitulo}
          onChange={() => {
            setFiltroTitulo(true);
            setFiltroAutor(false);
            setFiltroContenido(false);
          }}
        />
        <label>Título</label>
      </div>
        </Grid>

        <Grid item xs={2}>
          <div>
          <Checkbox
          checked={filtroAutor}
          onChange={() => {
            setFiltroTitulo(false);
            setFiltroAutor(true);
            setFiltroContenido(false);
          }}
        />
        <label>Autor</label>
        </div>
        </Grid>

        <Grid item xs={2}>
          <div>
          <Checkbox
          checked={filtroContenido}
          onChange={() => {
            setFiltroTitulo(false);
            setFiltroAutor(false);
            setFiltroContenido(true);
          }}
        />
        <label>Contenido</label>
        </div>
        </Grid>

        <Grid item xs={1}>
          <Button
           variant="contained"
           color="primary"
           onClick={handleFiltrar}>FIltrar
           </Button>
        </Grid>
        <Grid item xs={2}>
        <Button variant="contained" color="secondary" onClick={handleLimpiarFiltros}>
          Limpiar Filtros
        </Button>
        </Grid>
      </Grid>
      
      
     
 

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <TableContainer component={Paper} className="tabla-con-encabezados-fijos">
          <Table>
            <TableHead style={{ background:"black", color:"white"}}>
              <TableRow>
                <TableCell style={{ color:"white"}}>Titulo</TableCell>
                <TableCell style={{ color:"white"}}>Autor</TableCell>
                <TableCell style={{ color:"white"}}>Fecha</TableCell>
                <TableCell style={{ color:"white"}}>Contenido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((movie:any, index:any) => (
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
