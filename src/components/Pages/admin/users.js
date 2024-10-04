import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { Button, Modal, Form } from 'react-bootstrap'; // Import Bootstrap components

function AdminUser() {
    const [users, setUsers] = useState([]); // State to store users
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const itemsPerPage = 12; // Number of items per page
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [currentUser, setCurrentUser] = useState(null); // State to store the current user for editing/creating

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/Admin/users');
                setUsers(response.data.$values || response.data); // Set users in state
            } catch (error) {
                setError(error.response ? error.response.data : 'Error fetching users'); // Handle error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUsers(); // Call fetch function
    }, []); // Empty dependency array means this will run once when component mounts

    const handleEdit = (userId) => {
        // Find the user to edit
        const userToEdit = users.find(user => user.userID === userId);
        setCurrentUser(userToEdit); // Set the current user for editing
        setShowModal(true); // Show the modal
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/Admin/users/${userId}`); // Send delete request
                setUsers(users.filter(user => user.userID !== userId)); // Update users state
                alert("User deleted successfully!");
            } catch (error) {
                alert("Error deleting user: " + (error.response ? error.response.data : error.message));
            }
        }
    };

    const handleCreateUser = () => {
        setCurrentUser({}); // Reset current user to empty for creating new user
        setShowModal(true); // Show the modal
    };

    const handleSaveUser = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            if (currentUser.userID) {
                // Update existing user
                await axios.put(`/api/Admin/users/${currentUser.userID}`, currentUser);
                alert("User updated successfully!");
            } else {
                // Create new user
                await axios.post(`/api/Admin/users`, currentUser);
                alert("User created successfully!");
            }
            setShowModal(false); // Close the modal
            setCurrentUser(null); // Reset current user

            // Re-fetch users to refresh the list
            const response = await axios.get('/api/Admin/users');
            setUsers(response.data.$values || response.data);
        } catch (error) {
            alert("Error saving user: " + (error.response ? error.response.data : error.message));
        }
    };

    // Pagination Logic
    const totalPages = Math.ceil(users.length / itemsPerPage); // Calculate total pages
    const indexOfLastItem = currentPage * itemsPerPage; // Index of the last item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Index of the first item on the current page
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem); // Get the items for the current page

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Update the current page
    };

    const renderPagination = () => {
        const paginationItems = [];
        const maxVisiblePages = 5; // Maximum number of page links to show
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (startPage > 1) {
            paginationItems.push(
                <li className="page-item" key={1}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>
                        1
                    </button>
                </li>
            );
            if (startPage > 2) {
                paginationItems.push(<li className="page-item disabled" key="start-ellipsis">...</li>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationItems.push(<li className="page-item disabled" key="end-ellipsis">...</li>);
            }
            paginationItems.push(
                <li className="page-item" key={totalPages}>
                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                    </button>
                </li>
            );
        }

        return paginationItems;
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Users List</h1>
            <Button variant="primary" onClick={handleCreateUser} className="mb-3">
                Create User
            </Button>
            {currentItems.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Balance</th> {/* Added balance column */}
                            <th>Created At</th> {/* Added createdAt column */}
                            <th>Updated At</th> {/* Added updatedAt column */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(user => (
                            <tr key={user.userID}>
                                <td>{user.userID}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{`${user.firstName} ${user.lastName}`}</td> {/* Full name from first and last name */}
                                <td>{user.phoneNumber}</td>
                                <td>{user.balance}</td> {/* Display balance */}
                                <td>{new Date(user.createdAt).toLocaleString()}</td> {/* Display createdAt */}
                                <td>{new Date(user.updatedAt).toLocaleString()}</td> {/* Display updatedAt */}
                                <td>
                                    <Button variant="warning" onClick={() => handleEdit(user.userID)} className="me-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(user.userID)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
            {/* Pagination Controls */}
            <nav>
                <ul className="pagination">
                    {renderPagination()}
                </ul>
            </nav>

            {/* Modal for Editing/Creating User */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser?.userID ? 'Edit User' : 'Create User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveUser}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                value={currentUser?.username || ''} 
                                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={currentUser?.email || ''} 
                                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formPasswordHash">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                value={currentUser?.passwordHash || ''} 
                                onChange={(e) => setCurrentUser({ ...currentUser, passwordHash: e.target.value })} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter first name" 
                                value={currentUser?.firstName || ''} 
                                onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter last name" 
                                value={currentUser?.lastName || ''} 
                                onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter phone number" 
                                value={currentUser?.phoneNumber || ''} 
                                onChange={(e) => setCurrentUser({ ...currentUser, phoneNumber: e.target.value })} 
                                required 
                            />
                        </Form.Group>
                        {/* Add other fields as necessary */}
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminUser;
