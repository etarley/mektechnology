import Hero from "./components/hero";
import About from "./components/about";
import Servicios from "./components/services";
import NuestroProceso from "./components/ourProcess";
import Contacto from "./components/contacto";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Hero />
      <About />
      <Servicios />
      <NuestroProceso />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;
