import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutSession = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="px-8 py-6 w-full fixed z-50 backdrop-blur-lg bg-white/50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-[100px] h-[36px] bg-[#0d28a6]"></div>

        <button
          className="block md:hidden text-dark focus:outline-none"
          onClick={handleMobileMenuToggle}
        >
          <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 5h18v1H3V5zm0 7h18v1H3v-1zm0 7h18v1H3v-1z"
            ></path>
          </svg>
        </button>

        <div className="hidden md:flex md:items-center space-x-8">
          <a
            href="#our"
            className="text-dark relative before:content-[''] before:w-full before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-50"
          >
            Our Service
          </a>
          <a
            href="#why-us"
            className="text-dark relative before:content-[''] before:w-full before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-50"
          >
            Why Us
          </a>
          <a
            href="#testimonial"
            className="text-dark relative before:content-[''] before:w-full before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-50"
          >
            Testimonial
          </a>
          <a
            href="#faq"
            className="text-dark relative before:content-[''] before:w-full before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-50"
          >
            FAQ
          </a>
          <a href="#">
            <button
              className="bg-[#5cb85f] text-white py-2 px-4 rounded-sm hover:bg-[#0a800e] transition duration-300 ease-in-out"
              onClick={logoutSession}
            >
              Logout
            </button>
          </a>
        </div>
      </div>

      <div
        className={`pt-8 md:hidden bg-[#f1f3ff] w-[50%] h-[100vh] absolute top-0 ${
          isMobileMenuOpen ? "right-0" : "-right-96"
        } px-8 border-2 shadow-2xl transition-all duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold">BCR</h2>
          <button
            className="relative hover:cursor-pointer"
            onClick={handleMobileMenuToggle}
          >
            <div className="w-6 h-[2px] bg-black rotate-45 absolute top-0 right-0"></div>
            <div className="w-6 h-[2px] bg-black -rotate-45 absolute top-0 right-0"></div>
          </button>
        </div>
        <div className="pt-5 pb-4 space-y-6">
          <div>
            <a
              href="#our"
              className="text-dark relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-[#5cb85f] before:-bottom-2 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-100"
            >
              Our Service
            </a>
          </div>
          <div>
            <a
              href="#why-us"
              className="text-dark relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-[#5cb85f] before:-bottom-2 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-100"
            >
              Why Us
            </a>
          </div>
          <div>
            <a
              href="#testimonial"
              className="text-dark relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-[#5cb85f] before:-bottom-2 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-100"
            >
              Testimonial
            </a>
          </div>
          <div>
            <a
              href="#faq"
              className="text-dark relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-[#5cb85f] before:-bottom-2 before:transform before:origin-center before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:scale-x-100"
            >
              FAQ
            </a>
          </div>
          <div>
            <a href="#" className="block">
              <button className="bg-[#5cb85f] text-white py-2 px-4 rounded-sm w-full hover:bg-[#0a800e] transition duration-300 ease-in-out">
                Register
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
