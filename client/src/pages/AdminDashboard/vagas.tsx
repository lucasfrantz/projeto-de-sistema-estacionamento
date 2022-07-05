import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { api } from "../../services/api";
import { IParkingLot, IParkingSpot, IVehicle } from "../../interfaces";
import Modal from "react-modal";
import { Form } from "@unform/web";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import { Button } from "@mui/material";
import { useOccupations } from "../../hooks/occupations";
import Select from "react-select";
function createData(
  id: number,
  date: string,
  placa: string,
  modelo: string,
  cor: string
) {
  return { id, date, placa, modelo, cor };
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const rows = [
  createData(0, "1 Jan, 2022", "FRD-4456", "Uno", "Preto"),
  createData(1, "5 Mar, 2022", "NHW-8912", "Fox", "Vermelho"),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface VehicleFormData {
  number: number;
  price: number;
}

interface CarrosProps {
  editable?: boolean;
}

export default function Vagas() {
  const formRef = React.useRef(null);
  const [vehicles, setVehicles] = React.useState<IParkingSpot[]>([]);
  const [isCreateVehicleOpen, setCreateVehicleOpen] = React.useState(false);
  const { user } = useAuth();
  const { loadOccupations, parkingLots } = useOccupations();
  const [selectedLot, setSelectedLot] = React.useState();
  const loadVehicles = async () => {
    const response = await api.get("/parking-spots");
    const vehicles = response.data;
    setVehicles(vehicles);
  };
  const handleSubmit = async (data: VehicleFormData) => {
    console.log(data);
    console.log({
      ...data,
      parkingLotId: selectedLot,
    });
    try {
      const response = await api.post("/parking-spots", {
        ...data,
        parkingLotId: selectedLot,
      });
      setCreateVehicleOpen(false);
      loadVehicles();
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadOccupations();
    loadVehicles();
  }, []);

  function handleLotChange(e: any) {
    setSelectedLot(e.value);
  }
  return (
    <React.Fragment>
      <Modal style={customStyles} isOpen={isCreateVehicleOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Select
            name="parkingLotId"
            placeholder="Estacionamento"
            options={parkingLots.map((parkingLot) => {
              return {
                value: parkingLot.id,
                label: parkingLot.name,
              };
            })}
            isClearable
            // value={selectedSpot}
            onChange={handleLotChange}
          />
          <Input label="Preço" type="number" name="price" placeholder="Preço" />
          <Input
            label="Número"
            type="number"
            name="number"
            placeholder="Número"
          />

          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button type="submit">Adicionar</Button>
          </div>
        </Form>
      </Modal>
      <Button onClick={() => setCreateVehicleOpen(true)}>
        Adicionar veiculo
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* <TableCell>Date</TableCell> */}
            <TableCell>Estacionamento</TableCell>
            <TableCell>Numero</TableCell>
            <TableCell>Preço por dia</TableCell>
            <TableCell>Ocupada</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              {/* <TableCell>{vehicle.date}</TableCell> */}
              <TableCell>{vehicle.parkingLot.name}</TableCell>
              <TableCell>{vehicle.number}</TableCell>
              <TableCell>R${vehicle.parkingSpotType.price}</TableCell>
              <TableCell>{vehicle.occupied ? "Ocupada" : "Vaga"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/car" onClick={preventDefault} sx={{ mt: 2 }}>
        Ver mais informações
      </Link>
    </React.Fragment>
  );
}
