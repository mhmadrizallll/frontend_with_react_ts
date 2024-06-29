import ourImage from "../assets/img/our-image.png";
import ourIcon from "../assets/img/our-icon.png";

const OurSection = () => {
  return (
    <section id="our" className="bg-[#f1f3ff] pt-8 sm:py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center p-4 lg:p-0">
        <div className="w-full md:w-1/2" data-aos="fade-right">
          <img
            src={ourImage}
            alt="Illustration"
            className="w-[80%] md:w-[60%] mx-auto"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mt-8 md:mt-0">
          <h2
            className="text-2xl font-bold text-center md:text-left leading-relaxed md:leading-relaxed font-['Helvetica Neue'] w-full md:w-[80%]"
            data-aos="fade-up"
          >
            Best Car Rental for any kind of trip in (Lokasimu)!
          </h2>
          <p
            className="font-light text-sm text-slate-700 w-full md:w-[75%] mt-4"
            data-aos="fade-down"
          >
            Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
            lebih murah dibandingkan yang lain, kondisi mobil baru, serta
            kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding,
            meeting, dll.
          </p>
          <div className="space-y-5 mt-4 w-full">
            <div
              className="flex items-center justify-start gap-4"
              data-aos="fade-right"
            >
              <img src={ourIcon} alt="" className="w-[25px]" />
              <p className="text-sm font-light text-slate-700 w-full">
                Sewa Mobil Dengan Supir di Bali 12 Jam
              </p>
            </div>
            <div className="flex items-center gap-4" data-aos="fade-up">
              <img src={ourIcon} alt="" className="w-[25px]" />
              <p className="text-sm font-light text-slate-700 w-full">
                Sewa Mobil Lepas Kunci di Bali 24 Jam
              </p>
            </div>
            <div className="flex items-center gap-4" data-aos="fade-up">
              <img src={ourIcon} alt="" className="w-[25px]" />
              <p className="text-sm font-light text-slate-700 w-full">
                Sewa Mobil Jangka Panjang Bulanan
              </p>
            </div>
            <div className="flex items-center gap-4" data-aos="fade-up">
              <img src={ourIcon} alt="" className="w-[25px]" />
              <p className="text-sm font-light text-slate-700 w-full">
                Gratis Antar - Jemput Mobil di Bandara
              </p>
            </div>
            <div className="flex items-center gap-4" data-aos="fade-up">
              <img src={ourIcon} alt="" className="w-[25px]" />
              <p className="text-sm font-light text-slate-700 w-full">
                Layanan Airport Transfer / Drop In Out
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSection;
