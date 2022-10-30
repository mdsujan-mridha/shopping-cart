import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const handleLogOut = () => {
        signOut(auth);
    }
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Panda Commerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/products">Product</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="#">About us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="#">Contact</a>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/cart">Cart</Link>
                            </li>

                        </ul>
                        <form className="d-flex">
                            {
                                user ?
                                    <>
                                        <button onClick={handleLogOut} className="btn btn-outline-success"> Logout </button>
                                        <>
                                            <button type="button" class="btn btn-primary position-relative ms-2">
                                                 Hi,{ user.displayName }
                                                <span class="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                                                    <span class="visually-hidden">New alerts</span>
                                                </span>
                                            </button>
                                        </>
                                    </>
                                    :
                                    <Link to="/login" className="btn btn-outline-success"> Login </Link>
                            }


                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;