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
        itemReservePrice: '',
        itemImageUrl: '',
        itemImageUrl1: '',
        itemImageUrl2: '',
        itemCategoryID: '',
        auctionStartTime: '',
        auctionEndTime: '',
        buyNowPrice: '',
    });
    const [images, setImages] = useState([null, null, null]); // For previewing images
    const [imageFiles, setImageFiles] = useState([null, null, null]); // To store image files temporarily
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch categories on component mount
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

    // Handle image upload to Cloudinary
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // Ensure this matches your Cloudinary settings

        try {
            const response = await axiosNoToken.post('https://api.cloudinary.com/v1_1/dklnlcse3/image/upload', formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error.response ? error.response.data : error);
            return null;
        }
    };

    // Handle image changes
    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file); // Update local preview

            setImages(newImages);
            const newImageFiles = [...imageFiles];
            newImageFiles[index] = file; // Store the file for later upload
            setImageFiles(newImageFiles);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
    
        try {
            // Upload images first
            const uploadedImageUrls = await Promise.all(imageFiles.map(file => file ? handleImageUpload(file) : null));
    
            // Convert auction start and end times to UTC
            const auctionStartDate = new Date(formData.auctionStartTime);
            const auctionEndDate = new Date(formData.auctionEndTime);
    
            // Prepare payload with converted times
            const payload = {
                itemTitle: formData.itemTitle,
                itemDescription: formData.itemDescription,
                itemCondition: formData.itemCondition,
                itemStartingPrice: parseFloat(formData.itemStartingPrice),
                itemReservePrice: parseFloat(formData.itemReservePrice),
                itemImageUrl: uploadedImageUrls[0],
                itemImageUrl1: uploadedImageUrls[1],
                itemImageUrl2: uploadedImageUrls[2],
                itemCategoryID: parseInt(formData.itemCategoryID),
                auctionStartTime: auctionStartDate.toISOString(), // Convert to UTC
                auctionEndTime: auctionEndDate.toISOString(),     // Convert to UTC
                buyNowPrice: parseFloat(formData.buyNowPrice),
            };
    
            const response = await axios.post('/api/Auction', payload);
            console.log('Product created:', response.data);
            navigate('/user/myprofile');
    
            // Reset form
            setFormData({
                itemTitle: '',
                itemDescription: '',
                itemCondition: '',
                itemStartingPrice: '',
                itemReservePrice: '',
                itemCategoryID: '',
                auctionStartTime: '',
                auctionEndTime: '',
                buyNowPrice: '',
            });
            setImages([null, null, null]);
            setImageFiles([null, null, null]); // Reset image files
        } catch (error) {
            console.error('Error creating product:', error);
            setErrorMessage('User profile is incomplete. Please provide all required information.');
        }
        setLoading(false);
    };

    const triggerFileInput = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };

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
                    name="itemReservePrice" 
                    placeholder="Reserve price" 
                    className="input-field reserve-price" 
                    value={formData.itemReservePrice}
                    onChange={handleChange}
                    required
                />

                <div className="image-upload">
                    {images.map((image, index) => (
                        <div key={index} className="image-placeholder" onClick={() => triggerFileInput(index)}>
                            {image ? <img src={image} alt={`Upload Preview ${index + 1}`} /> : (
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
                    />
                </div>

                <input 
                    type="number" 
                    name="buyNowPrice" 
                    placeholder="Buy Now Price" 
                    className="input-field buy-now-price" 
                    value={formData.buyNowPrice}
                    onChange={handleChange}
                />
                
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Submitting...' : 'Create Product'}
                </button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default CreateProductForm;
