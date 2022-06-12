import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { api } from "../../services/api";
import { Occupation } from "../../interfaces";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  const [occupations, setOcuppations] = React.useState<Occupation[]>([]);

  React.useEffect(() => {
    const loadOccupations = async () => {
      const response = await api.get("/occupations");
      const occupations = response.data;
      setOcuppations(occupations);
    };
    loadOccupations();
  }, []);

  const calculatePrice = (occupation: Occupation) => {
    const arrivedAt = new Date(occupation.arrivedAt);
    const now = new Date();
    const diffTime = now.getTime() - arrivedAt.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    const days = Math.floor(diffDays);
    return occupation.parkingSpot.parkingSpotType.price * days;
  };

  return (
    <React.Fragment>
      {occupations.map((occupation) => {
        return (
          <>
            <div
              key={`${occupation.arrivedAt}${occupation.parkingSpot.id}${occupation.vehicle.id}`}
            >
              <Typography component="p" variant="h5">
                {`Veiculo: ${occupation.vehicle.model} ${occupation.vehicle.licensePlate} ${occupation.vehicle.color}`}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {`Vaga: ${occupation.parkingSpot.parkingLot.name} Vaga ${
                  occupation.parkingSpot.number
                } R$: ${calculatePrice(occupation)}`}
              </Typography>
            </div>
          </>
        );
      })}
      <div>
        <Link color="primary" href="/occupation" onClick={preventDefault}>
          Mais informações
        </Link>
      </div>
    </React.Fragment>
  );
}
