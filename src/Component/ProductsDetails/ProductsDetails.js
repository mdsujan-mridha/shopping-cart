import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';

const ProductsDetails = () => {

    const { productId } = useParams();
    const { addItem } = useCart();
    const navigate = useNavigate();
    
    const [products, setProducts] = useState({});

    useEffect(() => {

        const url = `http://localhost:5000/products/${productId}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                
                setProducts(data);
            })

    }, []);

    const handleBuyNow = () =>{
        navigate('/placeorder'); 
    }
  
    const { Price, img, desc, discount, review, title, subTitle, originalPrice,_id
    } = products;
    return (
        <div className='container'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-5 mt-4">
                    <div className='w-75 bg-primary'>
                        <img src={img} alt="" className='w-100' />
             
                    </div>
                    <div className='mt-5 d-flex align-items-center gap-5'>
                    
                        <button onClick={() => addItem(products)} type="button" class="btn btn-info">Add to cart</button>
                        <button onClick={() => {
                            addItem(products);
                            handleBuyNow();
                        }}   type="button" class="btn btn-warning">Buy Now!</button>

                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-7">
                    <div className='mt-3 text-center'>
                        <h1 className="fs-2"> { title } </h1>
                         <h3 className="fs-5">  {subTitle} </h3>
                        <h1 className='text-center fs-4'> <span> {Price} </span> <del> <span> {discount} </span> </del> {originalPrice} </h1>
                        <p> { desc } </p>
                        <h5 className="fs-4"> { review } </h5>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductsDetails;