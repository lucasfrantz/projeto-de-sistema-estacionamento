import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { api } from "../../services/api";
import { Occupation } from "../../interfaces";
import { Button } from "@mui/material";
import { useOccupations } from "../../hooks/occupations";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface OccupationProps {
  current?: boolean;
}

export default function Deposits({ current }: OccupationProps) {
  const { currentOccupations, loadOccupations } = useOccupations();

  React.useEffect(() => {
    loadOccupations(current);
  }, []);

  const calculatePrice = (occupation: Occupation) => {
    const arrivedAt = new Date(occupation.arrivedAt);
    const now = occupation.leftAt ? new Date(occupation.leftAt) : new Date();
    const diffTime = now.getTime() - arrivedAt.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    const days = Math.floor(diffDays);
    return occupation.parkingSpot.parkingSpotType.price * days;
  };

  const finishOccupation = async (occupation: Occupation) => {
    await api.post(`/occupations/${occupation.id}/finish`);
    loadOccupations();
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {currentOccupations.map((occupation) => {
          return (
            <div
              style={{
                padding: 5,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
              key={`${occupation.arrivedAt}${occupation.parkingSpot.id}${occupation.vehicle.id}`}
            >
              <Typography component="p" variant="h5">
                {`Veiculo: ${occupation.vehicle.model} ${occupation.vehicle.licensePlate} ${occupation.vehicle.color}`}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {`Vaga: ${occupation.parkingSpot.parkingLot.name} Vaga ${occupation.parkingSpot.number}`}
              </Typography>
              <Typography color="text.primary" sx={{ flex: 1 }}>
                {`Valor: R$${calculatePrice(occupation)}`}
              </Typography>
              <Typography color="text.primary" sx={{ flex: 1 }}>
                {`Entrada: ${new Date(
                  occupation.arrivedAt
                ).toLocaleDateString()}`}
              </Typography>
              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button onClick={() => finishOccupation(occupation)}>
                  Finalizar ocupação
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div>
        <Link color="primary" href="/occupation" onClick={preventDefault}>
          Mais informações
        </Link>
      </div> */}
    </React.Fragment>
  );
}
