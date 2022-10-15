import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';

const Cart = () => {
    const navigate = useNavigate()
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();
  
//  handle order 
    const order = {
        cartTotal,
        totalItems,
        items

    };

    
    const handleOrder = () => {
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }



    //   handle payment 
    const handlePayment = () => {
        navigate('/payment')
    }
    if (isEmpty) return <>
        <div className="container">
            <div class="alert alert-danger mt-5" role="alert">
                <p className='text-center d-flex items-center justify-content-center fs-2 font-bold'>  Your cart is empty </p>
            </div>

        </div>
    </>;
    return (
        <section className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className='d-flex justify-content-between mb-3 mt-4'>
                        <h5>
                            {" "}
                            Cart ({totalUniqueItems}) total Item :({totalItems})
                        </h5>
                        <Link to="/products" className='btn btn-primary'> Continue to shopping </Link>
                    </div>
                    <table className="table table-light m-0">
                        <tbody>
                            <tr>
                                <td className='fs-5 font-bold'> Item </td>
                                <td className='fs-5 font-bold'> Product Name </td>
                                <td className='fs-5 font-bold'> Price </td>
                                <td className='fs-5 font-bold'> Quantity </td>
                                <td className='fs-5 font-bold'> Action </td>
                            </tr>
                            {items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={item?.img} style={{ height: "6rem" }} alt="" />
                                        </td>

                                        <td>{item.title}</td>

                                        <td>{item.price}</td>

                                        <td>Quantity({item.quantity})</td>

                                        <td>
                                            <button
                                                onClick={() =>
                                                    updateItemQuantity(item.id, item.quantity - 1)
                                                }
                                                className="btn btn-info ms-2"
                                            >
                                                {" "}
                                                -{" "}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    updateItemQuantity(item.id, item.quantity + 1)
                                                }
                                                className="btn btn-info ms-2"
                                            >
                                                {" "}
                                                +{" "}
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="btn btn-danger ms-2"
                                            >
                                                {" "}
                                                RemoveItem{" "}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="col-auto ms-auto">
                        <h2> total price: {cartTotal} USD </h2>
                    </div>
                </div>

                <div className="col-auto mb-2">
                    <button onClick={() => emptyCart()} className="btn btn-danger ms-2">
                        Clear Cart
                    </button>
                    <button onClick={() => handlePayment()} className="btn btn-success ms-2">
                        Make payment
                    </button>
                    <button onClick={() => handleOrder()} className="btn btn-success ms-2">
                        Buy Now !
                    </button>

                </div>
            </div>
        </section>
    );
};

export default Cart;