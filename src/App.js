import "./App.css";
import { Route, Routes } from "react-router-dom";
import { About, Home, Products } from "./pages";
import { Checkout, NavBar, ProductDetails } from "./components";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </div>
    </>
  );
};
export default App;
