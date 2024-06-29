import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import slide1 from "../assets/img/slide1.png";
import slide2 from "../assets/img/testi1.png";
import slide3 from "../assets/img/testi2.png";

interface Testimonial {
  stars: number;
  text: string;
  name: string;
  img: string;
}

const testimonials: Testimonial[] = [
  {
    img: slide1,
    stars: 5,
    text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”",
    name: "Son Goku 32, Bromo",
  },
  {
    img: slide2,
    stars: 3,
    text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”",
    name: "John Dee 32, Bromo",
  },
  {
    img: slide3,
    stars: 4,
    text: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”",
    name: "John Dee 32, Bromo",
  },
];

const TestimonialCarousel: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section id="testimonial" className="bg-[#f1f3ff] py-12 overflow-hidden">
      <div className="text-center space-y-4 pb-6">
        <h2 className="text-2xl font-bold">Testimonial</h2>
        <p className="text-sm font-light">
          Berbagai review positif dari para pelanggan kami
        </p>
      </div>
      <div className="w-full">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="flex flex-col space-y-4 md:flex-row justify-center items-center border-2 shadow-lg rounded-lg h-full p-6 gap-4">
                <div className="w-3/12 flex justify-center">
                  <img
                    src={testimonial.img}
                    alt={`slide${index + 1}`}
                    width="100"
                    height="100"
                    className="rounded-full"
                  />
                </div>
                <div className="w-9/12 space-y-3">
                  <div className="flex justify-center gap-2 md:block">
                    {[...Array(testimonial.stars)].map((_, starIndex) => (
                      <FontAwesomeIcon
                        key={starIndex}
                        icon={faStar}
                        className="text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="font-light text-sm text-slate-700">
                    {testimonial.text}
                  </p>
                  <p className="font-medium">{testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex justify-center mt-10">
          <PrevArrow onClick={handlePrev} />
          <NextArrow onClick={handleNext} />
        </div>
      </div>
    </section>
  );
};

const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-[#5cb85f] hover:text-white">
        <FontAwesomeIcon icon={faChevronRight} className="fa-md" />
        <span className="sr-only">Berikutnya</span>
      </span>
    </button>
  );
};

const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-[#5cb85f] hover:text-white">
        <FontAwesomeIcon icon={faChevronLeft} className="fa-md" />
        <span className="sr-only">Sebelumnya</span>
      </span>
    </button>
  );
};

export default TestimonialCarousel;
