import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Feature from '../../Components/Feature/Feature';
import GallerySlider from '../../Components/GallerySlider/GallerySlider';
import NewsletterSection from '../../Components/NewsletterSection/NewsletterSection';

const Home = () => {

    return (
        <div>
            <Banner></Banner>

            <Feature></Feature>
            <GallerySlider></GallerySlider>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;