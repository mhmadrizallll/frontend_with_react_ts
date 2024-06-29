import React, { useState } from "react";
import axios from "axios";
import DataCars from "./DataCars";

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
  availableAt: string;
  transmission: string;
  type: string;
  year: number;
}

const SearchCars: React.FC = () => {
  const [tipeDriver, setTipeDriver] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");
  const [waktuJemput, setWaktuJemput] = useState<string>("");
  const [jumlahPenumpang, setJumlahPenumpang] = useState<string>("");
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/cars", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const dataArray = response.data.data as Car[];
      const filteredCars = dataArray.filter(
        (car) =>
          car.available.toString() === tipeDriver ||
          car.capacity === parseInt(jumlahPenumpang) ||
          car.year === parseInt(tanggal) ||
          car.availableAt === waktuJemput
      );
      setCars(filteredCars);
      if (filteredCars.length === 0) {
        setError("No cars available");
      } else {
        setError("");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch cars");
    }
  };

  return (
    <>
      <section id="banner-main" className="container mx-auto relative">
        <div className="w-full bg-[#f1f3ff] absolute top-0 md:relative md:top-0 lg:top-[-130px] rounded-md shadow-xl py-4">
          <div className="flex flex-col md:flex-row p-4 gap-4 items-center">
            <div className="w-full md:w-3/12">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="tipeDriver"
                data-testid="tipeDriver"
              >
                Tipe Drive
              </label>
              <div className="mt-1.5">
                <select
                  id="tipeDriver"
                  name="tipeDriver"
                  value={tipeDriver}
                  onChange={(e) => setTipeDriver(e.target.value)}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option disabled value="" className="text-gray-400">
                    Pilih Tipe Drive
                  </option>
                  <option value="true">Dengan supir</option>
                  <option value="false">Tanpa supir (Lepas kunci)</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-3/12">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="tanggal"
              >
                Tanggal
              </label>
              <div className="mt-1.5">
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="w-full md:w-3/12">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="waktuJemput"
              >
                Pilih Waktu
              </label>
              <div className="mt-1.5">
                <select
                  id="waktuJemput"
                  name="waktuJemput"
                  value={waktuJemput}
                  onChange={(e) => setWaktuJemput(e.target.value)}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option disabled value="" className="text-gray-400">
                    Pilih Waktu
                  </option>
                  <option value="08:00">08:00 WIB</option>
                  <option value="09:00">09:00 WIB</option>
                  <option value="10:00">10:00 WIB</option>
                  <option value="11:00">11:00 WIB</option>
                  <option value="12:00">12:00 WIB</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-3/12">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="jumlahPenumpang"
              >
                Jumlah Penumpang (Optional)
              </label>
              <div className="mt-1.5">
                <input
                  type="number"
                  id="jumlahPenumpang"
                  name="jumlahPenumpang"
                  value={jumlahPenumpang}
                  onChange={(e) => setJumlahPenumpang(e.target.value)}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Jumlah Penumpang"
                />
              </div>
            </div>
            <div className="w-full md:w-2/12 flex justify-center md:justify-end">
              <button
                id="load-btn"
                onClick={handleSearch}
                data-testid="load-btn"
                className="bg-[#5cb85f] text-white py-1.5 px-4 rounded-sm hover:bg-[#0a800e] transition duration-300 ease-in-out w-full md:w-auto"
              >
                Cari Mobil
              </button>
            </div>
          </div>
        </div>
      </section>

      {error && <div data-testid="error-message">{error}</div>}
      <DataCars cars={cars} />
    </>
  );
};

export default SearchCars;
