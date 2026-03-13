import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Logistics from "./sections/Logistics";
import Solutions from "./sections/Solutions";
import About from "./sections/About";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Hero />
        <Features />
        <Logistics />
        <Solutions />
        <About />
      </div>
    </>
  );
}