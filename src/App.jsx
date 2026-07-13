import Home from "./pages/Home";
import Episodios from "./pages/Episodios";
import InfoPersonaje from "./pages/InfoPersonaje";
import Contacto from "./pages/Contacto";
import {Route, Routes} from "react-router-dom";

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episodios" element={<Episodios />} />
        <Route path="/personaje/:id" element={<InfoPersonaje />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  )
}

export default App
