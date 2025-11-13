import React from 'react';
import { PulseLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <PulseLoader color="#377cfb" size={15} margin={5} />
        </div>
    );
};

export default Loader;