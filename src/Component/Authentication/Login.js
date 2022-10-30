import React, { useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);


    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email,password);

    }
    if (user) {
        navigate('/products');

    }
    let loadingElement;
    if (loading) {
        return loadingElement =
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
    }
    let errorElement;
    if (error) {
        return errorElement =
            <div class="alert alert-danger" role="alert">
                <p>Error: {error.message}</p>
            </div>

    }

    return (
        <div className='container'>
            <div className="content" style={{ height: '80vh', width: '100%', marginTop: '100px' }}>
                <div class="card text-center w-50" style={{ margin: ' 0 auto' }}>
                    <div class="card-header fs-4 fw-bold">
                        Login
                    </div>
                    <div class="card-body">
                        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>

                            <input ref={emailRef} className='w-full p-2' style={{ borderRadius: '7px', border: '1px solid black' }} type="email" name="email" id="2" placeholder='Enter your email' required />
                            <input ref={passwordRef} className='w-full p-2' style={{ borderRadius: '7px', border: '1px solid black' }} type="password" name="password" id="3" placeholder='Enter your password' required />
                            <input type="submit" value="Login" className='btn btn-primary fs-5 fw-bold text-white' />
                        </form>
                        {/* handle loading and error  */}
                        {loadingElement}
                        {errorElement}
                        <Link to="/registration" type="button" class="btn btn-link" style={{ textDecoration: 'none' }}> You have no account? </Link>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;