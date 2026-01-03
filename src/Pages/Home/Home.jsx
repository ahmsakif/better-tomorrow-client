import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Feature from '../../Components/Feature/Feature';
import NewsletterSection from '../../Components/NewsletterSection/NewsletterSection';
import Gallery from '../../Components/GallerySlider/GallerySlider';
import ImpactStats from '../../Components/ImpactStats/ImpactStats';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <ImpactStats></ImpactStats>
            <Feature></Feature>
            <Gallery></Gallery>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;