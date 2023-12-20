import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const List: React.FC = ()=>{
const array:Array<any>=[
    {
        Titulo:'Iro man 2',
        Autor:'Test',
        Fecha:'text',
        Contedio:'test testteadsañdsajlkdjfkjdlñfjsdjñfdjslñ'
    },
    {
        Titulo:'Iro man 3',
        Autor:'Test2',
        Fecha:'text2',
        Contedio:'test testteadsañdsajlkdjfkjdlñfjsdjñfdjslñ'
    }
]
    return(
        <>
         <Grid container justifyContent="flex-end">
            <Button variant="contained" color="primary">
                Mi Botón
            </Button>
        </Grid>
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Contedio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((movie, index) => (
            <TableRow key={index}>
              <TableCell>{movie.Titulo}</TableCell>
              <TableCell>{movie.Autor}</TableCell>
              <TableCell>{movie.Fecha}</TableCell>
              <TableCell>{movie.Contedio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};


export default List;
