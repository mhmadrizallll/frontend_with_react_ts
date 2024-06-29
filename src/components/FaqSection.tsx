import { useState } from "react";

type AccordionState = {
  [key: string]: boolean;
};

const FAQSection = () => {
  // State untuk mengontrol status buka/tutup accordion
  const [accordionOpen, setAccordionOpen] = useState<AccordionState>({
    "animated-collapse-1": false,
    "animated-collapse-2": false,
    "animated-collapse-3": false,
    "animated-collapse-4": false,
    "animated-collapse-5": false,
  });

  // Fungsi untuk menangani klik pada tombol accordion
  const toggleAccordion = (targetId: string) => {
    setAccordionOpen((prevState) => ({
      ...prevState,
      [targetId]: !prevState[targetId],
    }));
  };

  return (
    <section id="faq" className="py-12 bg-[#ffffff]">
      <div className="container mx-auto flex flex-col lg:flex-row p-4 lg:p-0 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-6/12 space-y-4 text-center lg:text-left">
          <h2 className="text-2xl font-bold">Frequently Asked Question</h2>
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
        <div className="w-full lg:w-6/12 space-y-4">
          {/* Accordions */}
          {[
            {
              id: "animated-collapse-1",
              question: "Apa saja syarat yang dibutuhkan?",
            },
            {
              id: "animated-collapse-2",
              question: "Berapa hari minimal sewa mobil lepas kunci?",
            },
            {
              id: "animated-collapse-3",
              question: "Berapa hari sebelumnya sabaiknya booking sewa mobil?",
            },
            {
              id: "animated-collapse-4",
              question: "Apakah Ada biaya antar-jemput?",
            },
            {
              id: "animated-collapse-5",
              question: "Bagaimana jika terjadi kecelakaan?",
            },
          ].map(({ id, question }) => (
            <div
              key={id}
              className="relative mb-3 shadow-sm border-2 rounded-md"
            >
              <h6 className="mb-0">
                <button
                  className="relative flex items-center w-full p-4 font-light text-sm text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 rounded-t-1 group"
                  onClick={() => toggleAccordion(id)}
                  aria-expanded={accordionOpen[id]}
                >
                  <span>{question}</span>
                  <i
                    className={`absolute right-4 pt-1 text-base transition-transform fa fa-chevron-${
                      accordionOpen[id] ? "up" : "down"
                    } group-open:rotate-180`}
                  ></i>
                </button>
              </h6>
              <div
                data-collapse={id}
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                  accordionOpen[id] ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
                  We're not always in the position that we want to be at. We're
                  constantly growing. We're constantly making mistakes. We're
                  constantly trying to express ourselves and actualize our
                  dreams.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
