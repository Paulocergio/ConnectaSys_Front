import Menu from "../components/Landing/Menu";
import Header from "../components/Landing/Header";
import Features from "../components/Landing/Features";
import Pricing from "../components/Landing/Pricing";
import Testimonials from "../components/Landing/Testimonials";
import Footer from "../components/Landing/Footer";




export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#101218] text-gray-100">
      <Menu />
      <Header />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}
