import React from 'react';
import ThemeSwitcher from '../../Components/ThemeSwitcher/ThemeSwitcher';
import useAuth from '../../Hooks/useAuth';
import Banner from '../../Components/Banner/Banner';
import Feature from '../../Components/Feature/Feature';
import GallerySlider from '../../Components/GallerySlider/GallerySlider';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <GallerySlider></GallerySlider>
            newsletter
        </div>
    );
};

export default Home;