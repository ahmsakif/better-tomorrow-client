import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Feature from '../../Components/Feature/Feature';
import NewsletterSection from '../../Components/NewsletterSection/NewsletterSection';
import Gallery from '../../Components/GallerySlider/GallerySlider';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <Gallery></Gallery>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;