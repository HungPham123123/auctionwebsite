import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap'; // Import Bootstrap components

function AdminCategory() {
    const [categories, setCategories] = useState([]); // State to store categories
    const [error, setError] = useState(null); // State to handle errors
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(5); // Number of items per page
    const [showAddModal, setShowAddModal] = useState(false); // Modal state for adding category
    const [showEditModal, setShowEditModal] = useState(false); // Modal state for editing category
    const [currentCategory, setCurrentCategory] = useState(null); // State to handle current category for editing

    useEffect(() => {
        // Fetch categories from the API
        axios.get('/api/Admin/categories')
            .then(response => {
                setCategories(response.data.$values); // Store categories in state
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Error fetching categories'); // Handle error
            });
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const handleShowEditModal = (category) => {
        setCurrentCategory(category);
        setShowEditModal(true);
    };
    const handleCloseEditModal = () => {
        setCurrentCategory(null);
        setShowEditModal(false);
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        const newCategory = {
            name: e.target.name.value,
            description: e.target.description.value
        };

        try {
            await axios.post('/api/Admin/categories', newCategory);
            setCategories([...categories, newCategory]); // Update state
            handleCloseAddModal(); // Close modal
        } catch (error) {
            setError(error.response ? error.response.data : 'Error creating category');
        }
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        const updatedCategory = {
            categoryID: currentCategory.categoryID,
            name: e.target.name.value,
            description: e.target.description.value
        };

        try {
            await axios.put(`/api/Admin/categories/${currentCategory.categoryID}`, updatedCategory);
            setCategories(categories.map(cat => cat.categoryID === currentCategory.categoryID ? updatedCategory : cat));
            handleCloseEditModal(); // Close modal
        } catch (error) {
            setError(error.response ? error.response.data : 'Error updating category');
        }
    };

    const handleDeleteCategory = async (categoryID) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await axios.delete(`/api/Admin/categories/${categoryID}`);
                setCategories(categories.filter(cat => cat.categoryID !== categoryID)); // Update state
            } catch (error) {
                setError(error.response ? error.response.data : 'Error deleting category');
            }
        }
    };

    return (
        <div>
            <h1>Categories</h1>
            <Button variant="primary" onClick={handleShowAddModal} className="mb-3">
                Create Category
            </Button>

            {error && <div className="alert alert-danger">{error}</div>}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((category, index) => (
                            <tr key={category.categoryID}>
                                <td>{index + 1 + indexOfFirstItem}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleShowEditModal(category)} className="me-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteCategory(category.categoryID)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No categories found.</td>
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

            {/* Add Category Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateCategory}>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter category name" name="name" required />
                        </Form.Group>
                        <Form.Group controlId="formCategoryDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Category
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Category Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentCategory && (
                        <Form onSubmit={handleEditCategory}>
                            <Form.Group controlId="formCategoryName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter category name" 
                                    name="name" 
                                    defaultValue={currentCategory.name} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategoryDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Enter description" 
                                    name="description" 
                                    defaultValue={currentCategory.description} 
                                    required 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update Category
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminCategory;
