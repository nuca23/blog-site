import React from "react";
import Login from "./Login.Register/Login";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import BLog from './Blog'
import Contact from './Contact';
import Register from './Login.Register/Register';
import Footer from './Footer';
import BlogDetails from './BlogDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; ნახე აბა გაქვს ან იყენეეეეებ ? :D 
import './Index.css'
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Blogs" element={<BLog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/blog/get/:id" element={<BlogDetails />} />
        <Route index path="/" element={<Login />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/news" element={<Navigate to="/home" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
