import React, { useState, useEffect } from 'react';
import './CreateAuction.css';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';

function CreateProductForm() {
    const [images, setImages] = useState([null, null, null]);
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
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/category');
                console.log('Categories response:', response.data);
                setCategories(response.data.$values);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Failed to fetch categories.'); // Handle category fetch error
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            const imageUrl = URL.createObjectURL(file); // Create a local URL for the uploaded image
            newImages[index] = imageUrl; // Update the preview
            
            // Update formData with the corresponding image URL
            setFormData((prevFormData) => ({
                ...prevFormData,
                [`itemImageUrl${index === 0 ? '' : index}`]: imageUrl, // Set the correct itemImageUrl
            }));

            setImages(newImages);
        }
    };

    const triggerFileInput = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages

        try {
            // Filter out blob URLs from the image URLs
            const filteredImages = [
                formData.itemImageUrl.replace(/^blob:/, ''),  // Remove blob prefix
                formData.itemImageUrl1.replace(/^blob:/, ''),
                formData.itemImageUrl2.replace(/^blob:/, ''),
            ];
    
            // Adjust formData to match the backend structure
            const payload = {
                itemTitle: formData.itemTitle,
                itemDescription: formData.itemDescription,
                itemCondition: formData.itemCondition,
                itemStartingPrice: parseFloat(formData.itemStartingPrice),
                itemReservePrice: parseFloat(formData.itemReservePrice),
                itemImageUrl: filteredImages[0], // This is the first image without blob
                itemImageUrl1: filteredImages[1], // This is the second image without blob
                itemImageUrl2: filteredImages[2], // This is the third image without blob
                itemCategoryID: parseInt(formData.itemCategoryID),
                auctionStartTime: formData.auctionStartTime,
                auctionEndTime: formData.auctionEndTime,
                buyNowPrice: parseFloat(formData.buyNowPrice),
            };
    
            const response = await axios.post('/api/Auction', payload);
            console.log('Product created:', response.data);
            navigate('/user/myprofile')
            // Clear the form or display a success message
            setFormData({
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
            setImages([null, null, null]);
        } catch (error) {
            console.error('Error creating product:', error);
            setErrorMessage('User profile is incomplete. Please provide all required information.');
        }
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
                
                <button type="submit" className="submit-button">Create Product</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
            </form>
        </div>
    );
}

export default CreateProductForm;
