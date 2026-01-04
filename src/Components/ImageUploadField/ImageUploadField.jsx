import React, { useState } from 'react';
import { IoCloudUploadOutline, IoImageOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { uploadImage } from '../../Utilities/uploadImage';
import toast from 'react-hot-toast';

const ImageUploadField = ({ onUploadSuccess, currentImage }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Set local preview immediately
        setPreview(URL.createObjectURL(file));
        
        const toastId = toast.loading("Processing image sequence...");
        setIsUploading(true);

        try {
            const uploadedUrl = await uploadImage(file);
            onUploadSuccess(uploadedUrl); // Update your form state with the new URL
            toast.success("Image synced to cloud.", { id: toastId });
        } catch (error) {
            toast.error("Upload failed.", { id: toastId });
            setPreview(currentImage); // Reset preview on error
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
                <IoImageOutline /> Event Visual Asset
            </label>
            
            <div className={`relative group border-2 border-dashed rounded-[2rem] h-48 overflow-hidden transition-all duration-500 flex flex-col items-center justify-center
                ${preview ? 'border-primary/40 bg-base-100' : 'border-base-300 bg-base-200/50 hover:border-primary/20'}`}>
                
                {preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <IoCloudUploadOutline className="text-4xl text-white mb-2" />
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Replace Image</span>
                        </div>
                        {/* Success Indicator */}
                        {!isUploading && (
                            <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg">
                                <IoCheckmarkCircleOutline className="text-xl" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center">
                        <IoCloudUploadOutline className="text-4xl text-base-content/20 mb-3 mx-auto" />
                        <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Drop Image or Click</p>
                    </div>
                )}

                {isUploading && (
                    <div className="absolute inset-0 bg-base-100/80 backdrop-blur-sm flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}

                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                />
            </div>
        </div>
    );
};

export default ImageUploadField;