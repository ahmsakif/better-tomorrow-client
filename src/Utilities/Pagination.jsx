import React from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-16">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="btn btn-circle bg-base-100 border-base-200 hover:bg-primary hover:text-white disabled:opacity-30 transition-all shadow-md"
            >
                <IoArrowBackOutline className="text-xl" />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-12 h-12 rounded-2xl font-black transition-all shadow-md border 
                    ${currentPage === page 
                        ? 'bg-primary text-white border-primary scale-110' 
                        : 'bg-base-100 border-base-200 hover:border-primary/50 text-base-content/60'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="btn btn-circle bg-base-100 border-base-200 hover:bg-primary hover:text-white disabled:opacity-30 transition-all shadow-md"
            >
                <IoArrowForwardOutline className="text-xl" />
            </button>
        </div>
    );
};

export default Pagination;