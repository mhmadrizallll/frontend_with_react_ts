import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Car {
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
}

const UpdatePage = () => {
  const { id } = useParams();
  // const [cars, setCars] = useState<Car[]>([]);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [updateCar, setUpdateCar] = useState<Car>({
    plate: "",
    manufacture: "",
    model: "",
    image: "",
    rentPerDay: 0,
    capacity: 0,
    description: "",
    availableAt: "",
    available: false,
    transmission: "",
    type: "",
    year: 0,
  });

  const getCardById = async () => {
    const response = await axios.get("http://localhost:8000/api/cars/" + id, {
      headers: {
        Authorization: "Barear " + sessionStorage.getItem("token"),
      },
    });
    const dataArray = response.data;
    setUpdateCar(dataArray.data);
    console.log(dataArray);
  };

  const uploadImageCdn = async (): Promise<string | undefined> => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wwdcz4c5");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgaeoqlao/image/upload",
        formData
      );
      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdateCar((prevCars) => ({
      ...prevCars,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUpdateCar((prevCars) => ({
      ...prevCars,
      [name]: checked,
    }));
  };

  const update = async () => {
    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImageCdn();
    }
    const updateCars = {
      ...updateCar,
      image: imageUrl,
    };
    console.log("ini updateCars", updateCars);

    const formData = new FormData();
    formData.append("plate", updateCars.plate);
    formData.append("manufacture", updateCars.manufacture);
    formData.append("model", updateCars.model);
    formData.append("rentPerDay", updateCars.rentPerDay.toString());
    formData.append("capacity", updateCars.capacity.toString());
    formData.append("description", updateCars.description);
    formData.append("availableAt", updateCars.availableAt);
    formData.append("available", updateCars.available.toString());
    formData.append("transmission", updateCars.transmission);
    formData.append("type", updateCars.type);
    formData.append("year", updateCars.year.toString());
    if (file) {
      formData.append("image", file);
    }
    try {
      const response = await axios.put(
        "http://localhost:8000/api/cars/" + id,
        formData,
        {
          headers: {
            Authorization: "Barear " + sessionStorage.getItem("token"),
          },
        }
      );
      const dataArray = response.data;
      setUpdateCar(dataArray);
      console.log("ini dataArray", dataArray);
      toast.success("Mobil berhasil diupdate", {
        position: "top-right",
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCardById();
  }, []);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold py-8">Create Car</h1>
      <div className="mb-4 flex flex-wrap">
        <div className="w-6/12">
          <label
            htmlFor="plate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Plate
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="plate"
                id="plate"
                autoComplete="plate"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input plate"
                onChange={handleChange}
                value={updateCar.plate}
              />
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <label
            htmlFor="manufacture"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Manufacture
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="manufacture"
                id="manufacture"
                autoComplete="manufacture"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input manufacture"
                onChange={handleChange}
                value={updateCar.manufacture}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="model"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Model
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="model"
                id="model"
                autoComplete="model"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input model"
                onChange={handleChange}
                value={updateCar.model}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="rentPerDay"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Rent Per Day
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="number"
                name="rentPerDay"
                id="rentPerDay"
                autoComplete="rentPerDay"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input rent per day"
                onChange={handleChange}
                value={updateCar.rentPerDay}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="capacity"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Capacity
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="number"
                name="capacity"
                id="capacity"
                autoComplete="capacity"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input capacity"
                onChange={handleChange}
                value={updateCar.capacity}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <textarea
                name="description"
                id="description"
                autoComplete="description"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input description"
                onChange={handleChange}
                value={updateCar.description}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="availableAt"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Available At
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <select
                name="availableAt"
                id="availableAt"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={updateCar.availableAt}
              >
                <option value="">Select availability</option>
                <option value="08:00">08:00 WIB</option>
                <option value="09:00">09:00 WIB</option>
                <option value="10:00">10:00 WIB</option>
                <option value="11:00">11:00 WIB</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="available"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Available
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="checkbox"
                name="available"
                id="available"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={handleCheckboxChange}
                checked={updateCar.available}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="transmission"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Transmission
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <select
                name="transmission"
                id="transmission"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={updateCar.transmission}
              >
                <option value="">Select transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Type
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="type"
                id="type"
                autoComplete="type"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input type"
                onChange={handleChange}
                value={updateCar.type}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="year"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Year
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="number"
                name="year"
                id="year"
                autoComplete="year"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Input year"
                onChange={handleChange}
                value={updateCar.year}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-6/12">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Image
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="file"
                name="image"
                id="image"
                autoComplete="image"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={handleImageChange}
              />
            </div>
            {image && (
              <img src={image as string} alt="Preview" className="w-1/3" />
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={update}
      >
        Update Car
      </button>
      <ToastContainer />
    </div>
  );
};

export default UpdatePage;
