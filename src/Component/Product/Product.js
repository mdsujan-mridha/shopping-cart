import React, { useEffect, useState } from 'react';
import SingleProduct from '../SingleProduct/SingleProduct';





const Product = () => {
    const [ products,setProducts] = useState([]);

    useEffect( ()=>{
          
        fetch('http://localhost:5000/products')
         .then(res =>res.json())
          .then(data => setProducts(data))
    } ,[])
    
    return (
        <div className='container my-5'>
            <div className='d-flex flex-wrap gap-2'>
            {
                products?.map(product=>(
                    <SingleProduct
                     key={product._id}
                     product={product}
                    ></SingleProduct>
                ))
            }
            </div>
           
        </div>
    );
};

export default Product;