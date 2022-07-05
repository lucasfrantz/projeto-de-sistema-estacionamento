export interface IVehicle {
  id: string;
  licensePlate: string;
  model: string;
  color: string;
}

export interface IParkingLot {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface IParkingSpotType {
  name: string;
  price: number;
  size: string;
}
export interface IParkingSpot {
  id: string;
  number: number;
  parkingLot: IParkingLot;
  parkingSpotType: IParkingSpotType;
  occupied: boolean;
}

export interface Occupation {
  id: string;
  arrivedAt: Date;
  leftAt?: Date;
  vehicle: IVehicle;
  parkingSpot: IParkingSpot;
}
