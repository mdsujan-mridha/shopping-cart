
import './App.css';
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import Product from './Component/Product/Product';
import ProductsDetails from './Component/ProductsDetails/ProductsDetails';
import Cart from './Component/Cart/Cart';
import Payment from './Component/Payment/Payment';


function App() {
  return (
   <>
   <Navbar/>
   
   <Routes>
    <Route path='/' element={ <Home/>}></Route>
    <Route path='/home' element={ <Home/>}></Route>
    <Route path='/products' element={ <Product/>}></Route>
    <Route path='/products/:productId' element={ <ProductsDetails/>}></Route>
    <Route path='/cart' element={ <Cart/>}></Route>
    <Route path='/payment' element={ <Payment/>}></Route>
    
   </Routes>
   
   </>
  );
}

export default App;
