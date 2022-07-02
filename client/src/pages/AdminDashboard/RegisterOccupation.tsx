import { Form } from "@unform/web";
import React, { useRef } from "react";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import { IVehicle, IParkingSpot, IParkingLot } from "../../interfaces";

import Select from "react-select";
import { useField } from "@unform/core";
import { useOccupations } from "../../hooks/occupations";

interface OccupationFormData {
  vehicleId: string;
  parkingSpotId: string;
  parkingLot: IParkingLot;
}

export default function RegisterOccupation() {
  const formRef = React.useRef(null);
  const [vehicles, setVehicles] = React.useState<IVehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = React.useState();
  const [selectedSpot, setSelectedSpot] = React.useState();
  const [vehicleSelectOptions, setVehicleSelectOptions] = React.useState([]);
  const [parkingSpots, setParkingSpots] = React.useState<IParkingSpot[]>([]);
  const [parkingSpotsSelectOptions, setParkingSpotsSelectOptions] =
    React.useState([]);

  const { loadOccupations } = useOccupations();

  const vehicleInputRef = useRef();
  const spotInputRef = useRef();

  const handleSubmit = async (data: OccupationFormData) => {
    console.log(data);

    try {
      await api.post("/occupations", {
        vehicleId: selectedVehicle,
        parkingSpotId: selectedSpot,
      });
      loadOccupations();
    } catch (e) {
      console.log(e);
    }
  };
  function handleVehicleChange(e: any) {
    setSelectedVehicle(e.value);
  }
  function handleSpotChange(e: any) {
    setSelectedSpot(e.value);
  }
  React.useEffect(() => {
    const loadData = async () => {
      const vehiclesResponse = await api.get("/vehicles");
      const vehiclesData = vehiclesResponse.data;
      setVehicles(vehiclesData);
      setVehicleSelectOptions(
        vehiclesData.map((vehicle: IVehicle) => {
          return { value: vehicle.id, label: vehicle.licensePlate };
        })
      );

      const parkingSpotsResponse = await api.get("/parking-spots/empty");
      const parkingSpotsData = parkingSpotsResponse.data;
      setParkingSpots(parkingSpotsData);
      setParkingSpotsSelectOptions(
        parkingSpotsData.map((parkingSpot: IParkingSpot) => {
          return {
            value: parkingSpot.id,
            label: `${parkingSpot.parkingLot.name} - ${parkingSpot.number}`,
          };
        })
      );
    };
    loadData();
  }, []);
  return (
    <Form
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <Select
        name="vehicleId"
        placeholder="Placa do veiculo"
        options={vehicleSelectOptions}
        isClearable
        // value={selectedVehicle}
        onChange={handleVehicleChange}
      />
      <Select
        name="parkingSpotId"
        placeholder="Vaga"
        options={parkingSpotsSelectOptions}
        isClearable
        // value={selectedSpot}
        onChange={handleSpotChange}
      />
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <button type="submit">Adicionar</button>
      </div>
    </Form>
  );
}
