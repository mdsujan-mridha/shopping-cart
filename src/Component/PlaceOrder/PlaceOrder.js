import React, { useRef, useState } from 'react';
import { useCart } from 'react-use-cart';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const PlaceOrder = () => {
   const [userInfo, setUserInfo]  = useState([]);
   const[ user ] = useAuthState(auth);
    
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
     const customerName= user?.displayName;
     const customerEmail= user?.email;
    //  handle order 
      const nameRef = useRef('');
      const emailRef = useRef('');
      const phoneRef = useRef('');
      const addressRef = useRef('');

      const handleUserInfo = (e) =>{

         e.preventDefault();
        //  const name= nameRef.current.value;
        //  const email= emailRef.current.value;
         const phone= phoneRef.current.value;
         const address= addressRef.current.value;
         setUserInfo({phone,address});

      }
      
    const order = {
        cartTotal,
        totalItems,
        items,
        customerName,
        customerEmail,
        userInfo

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


    return (
        <section className='container'>
            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col-12 col-md-6 col-lg-6">
                    <div class="card text-center">
                        <div class="card-header bg-info">
                            <p className='fs-3 fw-bold text-white'> Your Details </p>
                        </div>
                        <div class="card-body">
                            <form className='d-flex flex-column gap-3' onSubmit={handleUserInfo}>
                                <input ref={nameRef} className='w-full' style={{ height: '40px', borderRadius: '7px', border: '1px solid black', padding: '15px', fontSize: '15px' }} type="text" name="name" id="1" placeholder='Enter you name' value={user?.displayName} readOnly />
                                <input ref={ emailRef } className='w-full' style={{ height: '40px', borderRadius: '7px', border: '1px solid black', padding: '15px', fontSize: '15px' }} type="email" name="email" id="2" placeholder='Enter you email' value={user?.email} readOnly />
                                <input ref={ phoneRef } className='w-full' style={{ height: '40px', borderRadius: '7px', border: '1px solid black', padding: '15px', fontSize: '15px' }} type="number" name="number" id="3" placeholder='Enter your number' required />
                                <input ref={ addressRef } className='w-full' style={{ height: '80px', borderRadius: '7px', border: '1px solid black', padding: '15px', fontSize: '15px' }} type="text" name="number" id="4" placeholder='Enter your address' required/>
                                <input onClick={()=>handleOrder()}  className='btn btn-success' style={{ height: '40px' }} type="submit" value="Confirm order" />
                            </form>
                        </div>

                    </div>

                </div>
                <div className="col-12 col-md-6 col-lg-6">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items?.map((item) => {
                                    return (
                                        <tr
                                            key={item._id}
                                        >
                                            <th scope="row"> <img src={item?.img} alt="" className='w-75' style={{ height: '80px' }} /> </th>
                                            <td> {item.title} </td>
                                            <td> {item.price} </td>
                                            <td> {item.quantity} </td>


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
                                    )
                                })
                            }



                        </tbody>
                    </table>
                     <div>
                        
                         <p className='text-center fs-5 fw-bold'> Total Price: ${cartTotal} </p>
                     </div>
                </div>
            </div>

        </section>
    );
};

export default PlaceOrder;