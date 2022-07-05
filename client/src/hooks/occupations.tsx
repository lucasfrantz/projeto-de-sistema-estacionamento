import React, { createContext, useState, useContext } from "react";
import { IParkingLot, Occupation } from "../interfaces";
import { api } from "../services/api";

interface OccupationsContextData {
  occupations: Occupation[];
  currentOccupations: Occupation[];
  parkingLots: IParkingLot[];
  loadOccupations: (current?: boolean) => void;
}

const OccupationsContext = createContext<OccupationsContextData>(
  {} as OccupationsContextData
);

export const OccupationProvider: React.FC<any> = ({ children }) => {
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [currentOccupations, setCurrentOccupations] = useState<Occupation[]>(
    []
  );
  const [parkingLots, setParkingLots] = useState<IParkingLot[]>([]);

  const loadOccupations = async () => {
    const response = await api.get("/occupations");
    const response2 = await api.get("/occupations/current");
    const occupations = response.data;
    const occupations2 = response2.data;
    const response3 = await api.get("/parking-lots");
    const occupations3 = response3.data;
    setOccupations(occupations);
    setCurrentOccupations(occupations2);
    setParkingLots(occupations3);
  };

  return (
    <OccupationsContext.Provider
      value={{ occupations, currentOccupations, parkingLots, loadOccupations }}
    >
      {children}
    </OccupationsContext.Provider>
  );
};

export function useOccupations() {
  const context = useContext(OccupationsContext);

  return context;
}
