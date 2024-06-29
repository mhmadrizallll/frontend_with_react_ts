const Footer = () => {
  return (
    <section id="footer" className="py-12 bg-[#ffffff]">
      <div className="container mx-auto flex flex-col lg:flex-row p-4 lg:p-0 space-y-8 lg:space-y-0 lg:space-x-8 items-start">
        <div className="w-full lg:w-3/12 space-y-4">
          <p className="font-light text-sm">
            Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000
          </p>
          <p className="font-light text-sm">binarcarrental@gmail.com</p>
          <p className="font-light text-sm">081-233-334-808</p>
        </div>
        <div className="w-full lg:w-3/12 flex flex-col space-y-4">
          <a
            href="#"
            className="text-dark font-medium relative before:content-[''] before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transition-all before:duration-500 before:ease-in-out before:w-0 hover:before:w-[20%]"
          >
            Our services
          </a>
          <a
            href="#"
            className="text-dark font-medium relative before:content-[''] before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transition-all before:duration-500 before:ease-in-out before:w-0 hover:before:w-[20%]"
          >
            Why Us
          </a>
          <a
            href="#"
            className="text-dark font-medium relative before:content-[''] before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transition-all before:duration-500 before:ease-in-out before:w-0 hover:before:w-[20%]"
          >
            Testimonial
          </a>
          <a
            href="#"
            className="text-dark font-medium relative before:content-[''] before:h-[2px] before:bg-[#5cb85f] before:absolute before:-bottom-1 before:transition-all before:duration-500 before:ease-in-out before:w-0 hover:before:w-[20%]"
          >
            FAQ
          </a>
        </div>
        <div className="w-full lg:w-3/12 space-y-4">
          <p className="font-light text-sm">Connect with us</p>
          <div className="flex flex-row gap-4 flex-wrap">
            <div>
              <a href="https://facebook.com">
                <i className="fa-brands fa-facebook fa-2xl text-[#0d28a6] hover:cursor-pointer hover:text-[#000000]"></i>
              </a>
            </div>
            <div>
              <a href="https://instagram.com">
                <i className="fa-brands fa-instagram fa-2xl text-[#0d28a6] hover:cursor-pointer hover:text-[#000000]"></i>
              </a>
            </div>
            <div>
              <a href="https://twitter.com">
                <i className="fa-brands fa-twitter fa-2xl text-[#0d28a6] hover:cursor-pointer hover:text-[#000000]"></i>
              </a>
            </div>
            <div>
              <a href="https://linkedin.com">
                <i className="fa-solid fa-envelope fa-2xl text-[#0d28a6] hover:cursor-pointer hover:text-[#000000]"></i>
              </a>
            </div>
            <div>
              <a href="https://twitch.com">
                <i className="fa-brands fa-twitch fa-2xl text-[#0d28a6] hover:cursor-pointer hover:text-[#000000]"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12 space-y-4">
          <p className="font-light text-sm">Copyright Binar 2022</p>
          <div className="w-[100px] h-[36px] bg-[#0d28a6]"></div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
