import "./App.css";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactForm from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
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
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactForm/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
        </Routes>
        <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster />

    </>
  );
}

export default App;
