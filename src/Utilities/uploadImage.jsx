import axios from 'axios';

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData
        );
        return response.data.data.display_url; // Returns the permanent image URL
    } catch (error) {
        console.error("Image Upload Failed:", error);
        throw new Error("Failed to upload image to ImgBB.");
    }
};