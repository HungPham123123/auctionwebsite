import React, { useState, useEffect } from 'react';
import './CreateAuction.css';
import { useNavigate } from 'react-router-dom';
import axiosNoToken from '../../../utils/axiosNoToken';
import axios from '../../../utils/axios';

function CreateProductForm() {
    const [formData, setFormData] = useState({
        itemTitle: '',
        itemDescription: '',
        itemCondition: '',
        itemStartingPrice: '',
        itemImageUrl: '',
        itemImageUrl1: '',
        itemImageUrl2: '',
        itemCategoryID: '',
        auctionStartTime: '',
        auctionEndTime: '',
        minimumBidJump: '',
    });

    const [images, setImages] = useState([null, null, null]);
    const [imageFiles, setImageFiles] = useState([null, null, null]);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category');
                setCategories(response.data.$values);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Failed to fetch categories.');
            }
        };
        fetchCategories();
    }, []);

    const handleImageUpload = async (file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        try {
            const response = await axiosNoToken.post('https://api.cloudinary.com/v1_1/dklnlcse3/image/upload', formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error.response ? error.response.data : error);
            return null;
        }
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file);

            setImages(newImages);
            const newImageFiles = [...imageFiles];
            newImageFiles[index] = file;
            setImageFiles(newImageFiles);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateTimes = () => {
        const startTime = new Date(formData.auctionStartTime);
        const endTime = new Date(formData.auctionEndTime);

        const currentTime = new Date();

        // Check if start time is in the past
        if (startTime < currentTime) {
            setErrorMessage('Auction start time cannot be in the past.');
            return false;
        }

        // Check if end time is at least 2 hours after start time
        const twoHoursLater = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
        if (endTime <= twoHoursLater) {
            setErrorMessage('Auction end time must be at least 2 hours after start time.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        if (!validateTimes()) {
            setLoading(false);
            return; // Exit if validation fails
        }

        try {
            const uploadedImageUrls = await Promise.all(imageFiles.map(handleImageUpload));

            const payload = {
                itemTitle: formData.itemTitle,
                itemDescription: formData.itemDescription,
                itemCondition: formData.itemCondition,
                itemStartingPrice: parseFloat(formData.itemStartingPrice),
                itemImageUrl: uploadedImageUrls[0] || '',
                itemImageUrl1: uploadedImageUrls[1] || '',
                itemImageUrl2: uploadedImageUrls[2] || '',
                itemCategoryID: parseInt(formData.itemCategoryID),
                auctionStartTime: formData.auctionStartTime,
                auctionEndTime: formData.auctionEndTime,
                minimumBidJump: parseFloat(formData.minimumBidJump),
            };

            const response = await axios.post('/api/Auction', payload);
            console.log('Product created:', response.data);
            navigate('/user/myprofile');

            setFormData({
                itemTitle: '',
                itemDescription: '',
                itemCondition: '',
                itemStartingPrice: '',
                itemCategoryID: '',
                auctionStartTime: '',
                auctionEndTime: '',
                minimumBidJump: '',
            });
            setImages([null, null, null]);
            setImageFiles([null, null, null]);
        } catch (error) {
            console.error('Error creating product:', error);
            const errorMessage = typeof error.response?.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response?.data) || "An error occurred while creating a bid. Please try again.";
            setErrorMessage(errorMessage);
        }
        setLoading(false);
    };

    const triggerFileInput = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };

    // Get current date and format it for the input
    const currentDateTime = new Date().toISOString().slice(0, 16);

    return (
        <div className="form-container">
            <h2 className="form-title">Create New Product</h2>
            <form className="auction-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="itemTitle"
                    placeholder="Product title"
                    className="input-field title"
                    value={formData.itemTitle}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="itemDescription"
                    placeholder="Description"
                    className="input-field description"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    required
                ></textarea>

                <input
                    type="text"
                    name="itemCondition"
                    placeholder="Item Condition (e.g. New, Used)"
                    className="input-field condition"
                    value={formData.itemCondition}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="itemStartingPrice"
                    placeholder="Starting price"
                    className="input-field starting-price"
                    value={formData.itemStartingPrice}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="minimumBidJump"
                    placeholder="Minimum Bid Jump"
                    className="input-field minimum-bid-jump"
                    value={formData.minimumBidJump}
                    onChange={handleChange}
                    required
                />

                <div className="image-upload">
                    {images.map((image, index) => (
                        <div key={index} className="image-placeholder" onClick={() => triggerFileInput(index)}>
                            {image ? (
                                <img src={image} alt={`Upload Preview ${index + 1}`} />
                            ) : (
                                <div className="add-image">
                                    <span>+</span>
                                </div>
                            )}
                            <input
                                type="file"
                                id={`fileInput${index}`}
                                style={{ display: 'none' }}
                                onChange={(event) => handleImageChange(index, event)}
                            />
                        </div>
                    ))}
                </div>

                <select
                    name="itemCategoryID"
                    className="input-field category"
                    value={formData.itemCategoryID}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.categoryID} value={category.categoryID}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div className="product-duration-section">
                    <label className="product-duration-label">Auction Start Time</label>
                    <input
                        type="datetime-local"
                        name="auctionStartTime"
                        className="input-field product-duration"
                        value={formData.auctionStartTime}
                        onChange={handleChange}
                        required
                        min={currentDateTime} // Set min to current date and time
                    />
                </div>

                <div className="product-duration-section">
                    <label className="product-duration-label">Auction End Time</label>
                    <input
                        type="datetime-local"
                        name="auctionEndTime"
                        className="input-field product-duration"
                        value={formData.auctionEndTime}
                        onChange={handleChange}
                        required
                        min={formData.auctionStartTime || currentDateTime} // Set min to auction start time or current time
                    />
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Auction'}
                </button>

                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default CreateProductForm;
