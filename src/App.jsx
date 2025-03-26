import "./App.css";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from "./pages/Layout";
import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import Experience from "./components/Experience";
// import Testimonial from "./components/Testimonial";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <Navbar />
      <Hero />
      <Features />
      <Experience />
      <Testimonial />
      <Footer /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
