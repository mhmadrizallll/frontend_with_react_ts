import React from "react";

// Definisikan tipe untuk data mobil
interface Car {
  id: string;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  available: boolean;
  transmission: string;
  type: string;
  year: number;
}

interface DataCarsProps {
  cars: Car[];
}

const DataCars: React.FC<DataCarsProps> = ({ cars }) => {
  return (
    <section className="container mx-auto rounded-md bg-[#f1f3ff] mt-[400px] md:-mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="p-4 rounded-xl shadow-xl space-y-2">
            <img
              src={car.image}
              alt={car.manufacture}
              className="w-full h-[200px] object-cover"
            />
            <p className="text-sm font-normal">
              {car.manufacture}/{car.model}
            </p>
            <p className="text-base font-bold">Rp. {car.rentPerDay} / Hari</p>
            <p className="font-light text-sm text-slate-700 w-full car-description" data-testid="car-description">
              {car.description}
            </p>
            <p className="font-light flex items-center gap-3">
              <i className="fa fa-solid fa-user-group"></i>{" "}
              <span>{car.capacity} orang</span>
            </p>
            <p className="font-light flex items-center gap-3">
              <i className="fa fa-solid fa-gear"></i>{" "}
              <span>{car.transmission}</span>
            </p>
            <p className="font-light flex items-center gap-3">
              <i className="fa fa-solid fa-calendar"></i>{" "}
              <span>tahun {car.year}</span>
            </p>
            <button className="bg-[#5cb85f] text-white py-2 px-4 rounded-sm hover:bg-[#0a800e] transition duration-300 ease-in-out w-full">
              Pilih Mobil
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DataCars;
