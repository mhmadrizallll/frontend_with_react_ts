import MainSection from "../components/MainSection";
import Navbar from "../components/Navbar";
import OurSection from "../components/OurSection";
import WhyUsSection from "../components/WhyUsSection";
// import TestimonialSection from "../components/TestimonialSection";
import TestimonialCarousel from "../components/TestimonialSection";
import GettingStartedSection from "../components/GettingStartedSection";
import FAQSection from "../components/FaqSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <MainSection />
      <OurSection />
      <WhyUsSection />
      {/* <TestimonialSection /> */}
      <TestimonialCarousel />
      <GettingStartedSection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default HomePage;
