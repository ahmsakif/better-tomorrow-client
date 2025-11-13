import React from 'react';
import ThemeSwitcher from '../../Components/ThemeSwitcher/ThemeSwitcher';
import useAuth from '../../Hooks/useAuth';
import Banner from '../../Components/Banner/Banner';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            Feature <br />
            gallery <br />
            newsletter
        </div>
    );
};

export default Home;