import React, { createContext, useState, useContext } from "react";
import axios from "axios";

interface Car {
  id: string;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  availableAt: string;
  available: boolean;
  transmission: string;
  type: string;
  year: number;
  is_deleted: boolean;
}

interface ApiContextType {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  getCars: () => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cars, setCars] = useState<Car[]>([]);

  const getCars = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/cars", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const dataArray = response.data.data as Car[];
      setCars(dataArray);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  return (
    <ApiContext.Provider value={{ cars, setCars, getCars }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
