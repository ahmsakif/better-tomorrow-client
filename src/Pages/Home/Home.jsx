import React from 'react';
import ThemeSwitcher from '../../Components/ThemeSwitcher/ThemeSwitcher';
import useAuth from '../../Hooks/useAuth';

const Home = () => {

    const {
        signOutUser
    } = useAuth()

    return (
        <div>
            Home Page
            <button className='btn btn-primary mr-5'>Primary</button>
            <button className='btn btn-secondary'>Secondary</button>
            <button onClick={signOutUser} className="btn">Log Out</button>
            <ThemeSwitcher></ThemeSwitcher>
        </div>
    );
};

export default Home;