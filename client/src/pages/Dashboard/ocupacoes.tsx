import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Typography component="p" variant="h5">
        Veiculo: Uno FRD-4456 Preto
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        ParkingSpot: Shopping Lote A4:2
      </Typography>

      <Typography component="p" variant="h5">
        Veiculo: Fox NHW-8912 Vermelho
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        ParkingSpot: Shopping Lote C4:7
      </Typography>
      <div>
        <Link color="primary" href="/occupation" onClick={preventDefault}>
          Mais informações
        </Link>
      </div>
    </React.Fragment>
  );
}