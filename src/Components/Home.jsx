import { useContext } from "react";
import BgSection from "./BgSection";
import Banner from "./Home/Banner";
import DurableOurTags from "./Home/DurableOurTags";
import GalleryMedia from "./Home/GalleryMedia";
import LifecodeAppFeatures from "./Home/LifecodeAppFeatures";
import LifecodeAppSecurity from "./Home/LifecodeAppSecurity";
import LimitedOffer from "./Home/LimitedOffer";
import OurProducts from "./Home/OurProducts";
import OurSmartPet from "./Home/OurSmartPet";
import PrivacyFocusedProducts from "./Home/PrivacyFocusedProducts";
import PrivacySecurity from "./Home/PrivacySecurity";
import SaveYourLife from "./Home/SaveYourLife";
import SearchVehicle from "./Home/SearchVehicle";
import SmartBusinessCard from "./Home/SmartBusinessCard";
import Testimonial from "./Home/Testimonial";
import TestimonialLogo from "./Home/TestimonialLogo";
import Layout from "./Shared/Layout";
import { ShopContext } from "../Context/ShopContext";

const Home = () => {
    const {
        loading
    } = useContext(ShopContext);


    return (
        <>
            {loading ? (
                <div class="page-loader">
                    <div class="spinner"></div>
                </div>
            ) : (
                <Layout>
                    <Banner />
                    {/* <SearchVehicle /> */}
                    <PrivacyFocusedProducts />
                    <BgSection />
                    <OurProducts />
                    <LimitedOffer />
                    <PrivacySecurity />
                    <OurSmartPet />
                    <DurableOurTags />
                    <SmartBusinessCard />
                    <LifecodeAppSecurity />
                    {/* <LifecodeAppFeatures /> */}
                    <SaveYourLife />
                    <GalleryMedia />
                    <Testimonial />
                    <TestimonialLogo />
                </Layout>
            )}
        </>
    );
}

export default Home;