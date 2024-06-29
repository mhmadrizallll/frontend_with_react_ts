import { Link } from "react-router-dom";
import carImage from "../assets/img/car-main.png";

const MainSection = () => {
  return (
    <section id="main" className="bg-[#f1f3ff] py-12 pt-32">
      <div className="container-fluid flex flex-col md:flex-row items-center justify-center p-4 md:p-8 md:pr-0">
        <div className="w-full flex flex-col mx-auto md:p-20">
          <h1 className="text-4xl font-bold text-start md:text-left leading-relaxed md:leading-relaxed font-['Helvetica Neue']">
            Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
          </h1>
          <p className="font-light text-md text-slate-700 mt-4 md:w-[70%] w-full">
            Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas
            terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu
            untuk sewa mobil selama 24 jam.
          </p>
          <div className="mt-8">
            <Link to="/cars">
              <button className="bg-[#5cb85f] text-white py-2 px-4 rounded-sm hover:bg-[#0a800e] transition duration-300 ease-in-out w-auto">
                Mulai Sewa Mobil
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full mt-12 md:mt-0">
          <img src={carImage} alt="Illustration" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
