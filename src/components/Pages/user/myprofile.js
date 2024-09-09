import React, { useState } from 'react';
import { Form, Row, Col } from "react-bootstrap";
import  './myprofile.css';
function Myprofile() {

    return (
        <div>
        <div className="container mt-5">
            <div className="">
                <div className="text-center mb-4">
                    <img
                        src="https://via.placeholder.com/150" // replace with actual image
                        alt="Profile"
                        className="rounded-circle"
                        width="100"
                        height="100"
                    />
                    <h3 className="mt-3">Johan Martin SR-</h3>
                    <p>Johan Martin SR</p>
                </div>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control type="text" placeholder="Your first name" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control type="text" placeholder="Your last name" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="contactNumber">
                                <Form.Label>Contact Number *</Form.Label>
                                <Form.Control type="text" placeholder="+8801" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control type="email" placeholder="Your Email" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="address">
                        <Form.Label>Address *</Form.Label>
                        <Form.Control type="text" placeholder="Your Address" />
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="city">
                                <Form.Label>City *</Form.Label>
                                <Form.Control as="select">
                                    <option>Dhaka</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="state">
                                <Form.Label>State *</Form.Label>
                                <Form.Control as="select">
                                    <option>Dhaka</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="zipCode">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" placeholder="00000" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="country">
                        <Form.Label>Country *</Form.Label>
                        <Form.Control as="select">
                            <option>Bangladesh</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='id-card'>
                        <Form.Label>Identification card *</Form.Label>
                        <Form.Control type='text' placeholder='Identification card' />
                    </Form.Group>


                    <div className="text-center mt-4">
                        <button className='my-profile-submit' variant="success" type="submit">
                            Update Profile
                        </button>
                        <button variant="light" className="ms-3 my-profile-cancel">
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    )
}

export default Myprofile;