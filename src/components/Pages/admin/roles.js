import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap'; // Import Bootstrap components

function AdminRoles() {
    const [roles, setRoles] = useState([]); // State to store roles
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(5); // Number of items per page
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [editingRole, setEditingRole] = useState(null); // State to hold the role being edited
    const [newRoleName, setNewRoleName] = useState(""); // State for new role name

    useEffect(() => {
        // Fetch roles from the API
        axios.get('/api/Admin/roles')
            .then(response => {
                console.log(response.data);
                setRoles(response.data.$values); // Store roles in state
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Error fetching roles'); // Handle error
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = roles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(roles.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowModal = (role = null) => {
        setEditingRole(role);
        setNewRoleName(role ? role.roleName : ""); // Set role name for editing or clear for new
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingRole(null);
        setNewRoleName("");
    };

    const handleSaveRole = () => {
        if (editingRole) {
            // Edit existing role
            axios.put(`/api/Admin/roles/${editingRole.roleID}`, {
                RoleID: editingRole.roleID, 
                RoleName: newRoleName
            })
                .then(response => {
                    setRoles(roles.map(role => (role.roleID === editingRole.roleID ? response.data : role)));
                    window.location.reload()
                })
                .catch(error => {
                    setError(error.response ? error.response.data : 'Error updating role'); // Handle error
                });
        } else {
            // Add new role
            axios.post('/api/Admin/roles', { roleName: newRoleName })
                .then(response => {
                    setRoles([...roles, response.data]);
                })
                .catch(error => {
                    setError(error.response ? error.response.data : 'Error adding role'); // Handle error
                });
        }
        handleCloseModal(); // Close modal
    };

    const handleDeleteRole = (roleID) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            axios.delete(`/api/Admin/roles/${roleID}`)
                .then(() => {
                    setRoles(roles.filter(role => role.roleID !== roleID));
                })
                .catch(error => {
                    setError(error.response ? error.response.data : 'Error deleting role'); // Handle error
                });
        }
    };

    return (
        <div>
            <h1>Roles</h1>

            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <Button variant="primary" onClick={() => handleShowModal()}>Add Role</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Role Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((role, index) => (
                            <tr key={role.roleID}>
                                <td>{index + 1 + indexOfFirstItem}</td>
                                <td>{role.roleName}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleShowModal(role)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDeleteRole(role.roleID)} className="ms-2">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No roles found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Pagination Controls */}
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

            {/* Modal for Add/Edit Role */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingRole ? "Edit Role" : "Add Role"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="roleName">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter role name" 
                                value={newRoleName} 
                                onChange={(e) => setNewRoleName(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveRole}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminRoles;
