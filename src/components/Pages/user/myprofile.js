import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from "react-bootstrap";
import './myprofile.css';
import axios from '../../../utils/axios';

function MyProfile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        idCard: ''
    });

    const [updateMessage, setUpdateMessage] = useState(''); // State for update message
    const [messageType, setMessageType] = useState(''); // State for message type (success/error)

    // Fetch the current user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user/current');
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/user/update', userData);
            setUpdateMessage('Profile updated successfully!');
            setMessageType('success'); // Set message type to success
        } catch (error) {
            console.error("Error updating profile:", error);
            setUpdateMessage('Failed to update profile. Please try again.');
            setMessageType('error'); // Set message type to error
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <div>
                    <div className="text-center mb-4">
                        <img
                            src="https://via.placeholder.com/150" // replace with actual image
                            alt="Profile"
                            className="rounded-circle"
                            width="100"
                            height="100"
                        />
                        <h3 className="mt-3">{userData.firstName} {userData.lastName}</h3>
                        <p>{userData.email}</p>
                    </div>

                    {/* Notification Message */}
                    {updateMessage && (
                        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {updateMessage}
                        </div>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First Name *</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Your first name" 
                                        name="firstName" 
                                        value={userData.firstName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last Name *</Form.Label>
                                    <Form.Control
                                        type="text" 
                                        placeholder="Your last name" 
                                        name="lastName" 
                                        value={userData.lastName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Contact Number *</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="+8801" 
                                        name="phoneNumber" 
                                        value={userData.phoneNumber}
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Your Email" 
                                        name="email" 
                                        value={userData.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="address">
                            <Form.Label>Address *</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Your Address" 
                                name="address" 
                                value={userData.address} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId='idCard'>
                            <Form.Label>Identification Card *</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Identification card' 
                                name="idCard" 
                                value={userData.idCard} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <div className="text-center mt-4">
                            <button className='my-profile-submit' variant="success" type="submit">
                                Update Profile
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
