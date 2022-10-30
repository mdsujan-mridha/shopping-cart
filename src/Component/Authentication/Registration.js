import React, { useRef } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from "../../firebase.init";

const Registration = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, update_error] = useUpdateProfile(auth);

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
       await createUserWithEmailAndPassword(email, password);
       await updateProfile({displayName:name});

    }
    if (user) {
        navigate('/products');

    }
    let loadingElement;
    if (loading ||updating) {
        return loadingElement =
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
    }
    let errorElement;
    if (error ||update_error) {
        return errorElement =
            <div class="alert alert-danger" role="alert">
                <p>Error: {error.message}</p>
            </div>

    }
    console.log(user);
    return (
        <div className='container'>
            <div className="content" style={{ height: '80vh', width: '100%', marginTop: '100px' }}>
                <div class="card text-center w-50" style={{ margin: ' 0 auto' }}>
                    <div class="card-header fs-4 fw-bold">
                        Login
                    </div>
                    <div class="card-body">
                        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
                            <input ref={nameRef} className='w-full p-2' style={{ borderRadius: '7px', border: '1px solid black' }} type="text" name="name" id="1" placeholder='Enter your name' required />
                            <input ref={emailRef} className='w-full p-2' style={{ borderRadius: '7px', border: '1px solid black' }} type="email" name="email" id="2" placeholder='Enter your email' required />
                            <input ref={passwordRef} className='w-full p-2' style={{ borderRadius: '7px', border: '1px solid black' }} type="password" name="password" id="3" placeholder='Enter your password' required />
                            {/* ============handle error and loading===========  */}
                            {loadingElement}
                            {errorElement}
                            <input type="submit" value="Login" className='btn btn-primary fs-5 fw-bold text-white' />
                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Registration;