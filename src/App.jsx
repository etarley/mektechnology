import { lazy } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Hero from "./components/hero";

// Lazy load components
const About = lazy(() =>
  import("./components/about" /* webpackChunkName: "about" */)
);
const Servicios = lazy(() =>
  import("./components/services" /* webpackChunkName: "services" */)
);
const NuestroProceso = lazy(() =>
  import("./components/ourProcess" /* webpackChunkName: "process" */)
);
const Contacto = lazy(() =>
  import("./components/contacto" /* webpackChunkName: "contact" */)
);
const Footer = lazy(() =>
  import("./components/footer" /* webpackChunkName: "footer" */)
);

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
