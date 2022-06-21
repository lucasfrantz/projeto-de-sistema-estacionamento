import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { api } from "../../services/api";
import { IVehicle } from "../../interfaces";
import Modal from "react-modal";
import { Form } from "@unform/web";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";
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
  licensePlate: string;
  model: string;
  color: string;
}

interface CarrosProps {
  editable?: boolean;
}

export default function Carros({ editable }: CarrosProps) {
  const formRef = React.useRef(null);
  const [vehicles, setVehicles] = React.useState<IVehicle[]>([]);
  const [isCreateVehicleOpen, setCreateVehicleOpen] = React.useState(false);
  const { user } = useAuth();
  const loadVehicles = async () => {
    const response = await api.get("/vehicles");
    const vehicles = response.data;
    setVehicles(vehicles);
  };
  const handleSubmit = async (data: VehicleFormData) => {
    console.log(data);

    try {
      const response = await api.post("/vehicles", {
        ...data,
      });
      setCreateVehicleOpen(false);
      loadVehicles();
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadVehicles();
  }, []);
  return (
    <React.Fragment>
      <Modal style={customStyles} isOpen={isCreateVehicleOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Modelo" type="text" name="model" placeholder="Modelo" />
          <Input label="Cor" type="text" name="color" placeholder="Cor" />
          <Input
            label="Placa"
            type="text"
            name="licensePlate"
            placeholder="Placa"
          />
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <button type="submit">Adicionar</button>
          </div>
        </Form>
      </Modal>
      {editable && (
        <button onClick={() => setCreateVehicleOpen(true)}>
          Adicionar veiculo
        </button>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* <TableCell>Date</TableCell> */}
            <TableCell>Placa</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Cor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              {/* <TableCell>{vehicle.date}</TableCell> */}
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.color}</TableCell>
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
