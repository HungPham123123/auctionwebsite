import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button, Row, Col, Card, Pagination, Modal, Form } from 'react-bootstrap';

function AdminAuction() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentAuction, setCurrentAuction] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/Admin/categories');
                setCategories(response.data.$values);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('/api/Admin/auctions');
                setAuctions(response.data.$values);
            } catch (error) {
                const errorMessage = error.response ? error.response.data : 'Network error or no response from server.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchAuctions();
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = auctions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(auctions.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCreateAuction = () => {
        setCurrentAuction(null);
        setShowCreateModal(true);
    };

    const handleEditAuction = (auction) => {
        setCurrentAuction(auction);
        setShowEditModal(true);
    };

    const handleDeleteAuction = async (auctionID) => {
        if (window.confirm("Are you sure you want to delete this auction?")) {
            try {
                await axios.delete(`/api/Admin/auctions/${auctionID}`);
                // Update state to remove the deleted auction
                setAuctions(prev => prev.filter(a => a.auctionID !== auctionID));
                alert("Auction deleted successfully.");
            } catch (error) {
                console.error('Error deleting auction:', error);
                alert("An error occurred while deleting the auction.");
            }
        }
    };

    const handleSubmitAuction = async (event) => {
        event.preventDefault();

        const auctionData = {
            auctionID: currentAuction?.auctionID || 0,
            itemID: currentAuction?.itemID || 0,
            userID: currentAuction?.userID || 0,
            startTime: currentAuction?.startTime || new Date(),
            endTime: currentAuction?.endTime || new Date(),
            buyNowPrice: currentAuction?.buyNowPrice || 0,
            itemTitle: currentAuction?.itemTitle || '',
            itemDescription: currentAuction?.itemDescription || '',
            itemCondition: currentAuction?.itemCondition || '',
            itemStartingPrice: currentAuction?.itemStartingPrice || 0,
            itemReservePrice: currentAuction?.itemReservePrice || 0,
            itemImageUrl: currentAuction?.itemImage || '',
            itemImageUrl1: currentAuction?.itemImage1 || '',
            itemImageUrl2: currentAuction?.itemImage2 || '',
        };

        try {
            const request = currentAuction
                ? axios.put(`/api/Admin/auctions/${auctionData.auctionID}`, auctionData)
                : axios.post('/api/Admin/auctions', auctionData); // Assuming a POST request for creation

            const response = await request;

            setAuctions(prev => {
                const updatedAuctions = currentAuction
                    ? prev.map(a => (a.auctionID === auctionData.auctionID ? response.data : a))
                    : [...prev, response.data]; // Add new auction on creation
                    window.location.reload()
                return updatedAuctions;
            });

            setShowCreateModal(false);
            setShowEditModal(false);
            setCurrentAuction(null);
        } catch (error) {
            console.error('Error submitting auction:', error);
        }
    };

    if (loading) {
        return <div>Loading auctions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Auction List</h1>
            {auctions.length > 0 ? (
                <>
                    <Row className="g-3">
                        {currentItems.map(auction => (
                            <Col key={auction.auctionID} xs={6} md={4} lg={3}>
                                <Card style={{ height: '100%', border: '1px solid #dee2e6', padding: '5px' }}>
                                    <Card.Img variant="top" src={auction.itemImageUrl} style={{ maxHeight: '150px', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1.1rem' }}>{auction.itemTitle}</Card.Title>
                                        <Card.Text>
                                            <strong>Starting Price:</strong> ${auction.itemStartingPrice}<br />
                                            <strong>Buy Now Price:</strong> ${auction.buyNowPrice}<br />
                                            <strong>Status:</strong> {auction.auctionStatus ? 'Active' : 'Ended'}<br />
                                            <strong>End Time:</strong> {new Date(auction.endTime).toLocaleString()}<br />
                                            <strong>Created At:</strong> {new Date(auction.createdAt).toLocaleString()}<br />
                                        </Card.Text>
                                        <Button variant="warning" onClick={() => handleEditAuction(auction)} className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteAuction(auction.auctionID)}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Pagination className="mt-3">
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>

                    {/* Create Auction Modal */}
                    <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Auction</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmitAuction}>
                                <Form.Group controlId="formAuctionTitle">
                                    <Form.Label>Auction Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter auction title"
                                        value={currentAuction ? currentAuction.itemTitle : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemTitle: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAuctionDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter auction description"
                                        value={currentAuction ? currentAuction.itemDescription : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemDescription: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAuctionPrice">
                                    <Form.Label>Starting Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter starting price"
                                        value={currentAuction ? currentAuction.itemStartingPrice : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemStartingPrice: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAuctionBuyNowPrice">
                                    <Form.Label>Buy Now Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter buy now price"
                                        value={currentAuction ? currentAuction.buyNowPrice : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, buyNowPrice: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAuctionStartTime">
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={currentAuction ? new Date(currentAuction.startTime).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, startTime: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAuctionEndTime">
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={currentAuction ? new Date(currentAuction.endTime).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, endTime: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                {/* Add other fields like images, conditions, etc. */}
                                <Button variant="primary" type="submit">
                                    Submit Auction
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Edit Auction Modal */}
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Auction</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmitAuction}>
                            <Form.Group controlId="formAuctionTitle">
                                    <Form.Label>Auction Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter auction title"
                                        value={currentAuction ? currentAuction.itemTitle : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemTitle: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuctionDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter auction description"
                                        value={currentAuction ? currentAuction.itemDescription : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemDescription: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuctionPrice">
                                    <Form.Label>Starting Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter starting price"
                                        value={currentAuction ? currentAuction.itemStartingPrice : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemStartingPrice: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuctionBuyNowPrice">
                                    <Form.Label>Buy Now Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter buy now price"
                                        value={currentAuction ? currentAuction.buyNowPrice : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, buyNowPrice: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuctionStartTime">
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={currentAuction ? new Date(currentAuction.startTime).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, startTime: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuctionEndTime">
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={currentAuction ? new Date(currentAuction.endTime).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, endTime: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                {/* Category Dropdown */}
                               

                                {/* Image URLs */}
                                <Form.Group controlId="formAuctionImage1">
                                    <Form.Label>Image URL 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter image URL 1"
                                        value={currentAuction ? currentAuction.itemImage : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemImage: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuctionImage2">
                                    <Form.Label>Image URL 2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter image URL 2"
                                        value={currentAuction ? currentAuction.itemImage1 : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemImage1: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAuctionImage3">
                                    <Form.Label>Image URL 3</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter image URL 3"
                                        value={currentAuction ? currentAuction.itemImage2 : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemImage2: e.target.value })}
                                    />
                                </Form.Group>


                                <Form.Group controlId="formAuctionCondition">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter item condition"
                                        value={currentAuction ? currentAuction.itemCondition : ''}
                                        onChange={(e) => setCurrentAuction({ ...currentAuction, itemCondition: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update Auction
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            ) : (
                <div>No auctions found.</div>
            )}
        </div>
    );
}

export default AdminAuction;
