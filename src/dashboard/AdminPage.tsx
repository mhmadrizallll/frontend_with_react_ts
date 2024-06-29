import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../Context/ApiContext";

const AdminPage: React.FC = () => {
  const { cars, getCars } = useApi();
  const navigate = useNavigate();

  const handleUpdate = async (id: string) => {
    navigate(`/cars/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/cars/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      toast.success("Mobil berhasil dihapus", {
        position: "top-right",
        autoClose: 1500,
      });
      getCars(); // Ambil ulang data setelah hapus
    } catch (err) {
      console.error("Error deleting car:", err);
      toast.error("Gagal menghapus mobil", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    getCars(); // Ambil data saat komponen dimount
  }, []);

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-center text-4xl font-bold">Halaman Admin</h1>
      <button
        onClick={() => navigate("/cars/add")}
        className="bg-[#5cb85f] text-white py-2 px-4 rounded-sm hover:bg-[#0a800e] transition duration-300 ease-in-out w-auto"
      >
        Tambah Mobil
      </button>
      <table className="container mx-auto border-2 border-slate-700 text-center mt-4">
        <thead>
          <tr className="border-2 border-slate-700">
            <th className="border-2 border-slate-700">Plat</th>
            <th className="border-2 border-slate-700">Merek</th>
            <th className="border-2 border-slate-700">Model</th>
            <th className="border-2 border-slate-700">Tahun</th>
            <th className="border-2 border-slate-700">Gambar</th>
            <th className="border-2 border-slate-700">Status</th>
            <th className="border-2 border-slate-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="border-2 border-slate-700">{car.plate}</td>
              <td className="border-2 border-slate-700">{car.manufacture}</td>
              <td className="border-2 border-slate-700">{car.model}</td>
              <td className="border-2 border-slate-700">{car.year}</td>
              <td className="border-2 border-slate-700 flex justify-center">
                <img src={car.image} alt="" className="w-[100px]" />
              </td>
              <td className="border-2 border-slate-700">
                {car.is_deleted ? "Dihapus" : "Aktif"}
              </td>
              <td className="border-2 border-slate-700">
                <button
                  onClick={() => handleUpdate(car.id)}
                  className="bg-[#5cb85f] text-white py-2 px-4 rounded-sm hover:bg-[#0a800e] transition duration-300 ease-in-out w-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-700 transition duration-300 ease-in-out w-auto"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
