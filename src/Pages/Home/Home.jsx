import React from 'react';
import ThemeSwitcher from '../../Components/ThemeSwitcher/ThemeSwitcher';
import useAuth from '../../Hooks/useAuth';
import Banner from '../../Components/Banner/Banner';
import Feature from '../../Components/Feature/Feature';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            gallery <br />
            newsletter
        </div>
    );
};

export default Home;