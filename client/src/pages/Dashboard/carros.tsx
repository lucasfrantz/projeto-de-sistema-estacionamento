import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(
  id: number,
  date: string,
  placa: string,
  modelo: string,
  cor: string,
) {
  return { id, date, placa, modelo, cor};
}

const rows = [
  createData(
    0,
    '1 Jan, 2022',
    'FRD-4456',
    'Uno',
    'Preto',
  ),
  createData(
    1,
    '5 Mar, 2022',
    'NHW-8912',
    'Fox',
    'Vermelho',
  )
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Carros() {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Cor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.placa}</TableCell>
              <TableCell>{row.modelo}</TableCell>
              <TableCell>{row.cor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 2 }}>
        Ver mais informações
      </Link>
    </React.Fragment>
  );
}