import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from state and local storage
        setUser(null);
        localStorage.removeItem('user');

        // Dispatch a storage event to ensure all tabs/components are aware of logout
        window.dispatchEvent(new Event('storage'));

        navigate('/login');
    };

    return (
        <nav>
            <Link to="/">
                <h2>MERN Blog</h2>
            </Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span>Hello, {user.username}</span>
                        <Link to="/create-post">Create Post</Link>
                        <a href="#" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;