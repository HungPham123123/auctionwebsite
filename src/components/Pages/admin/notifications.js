import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button, Table, Pagination } from 'react-bootstrap'; // Import Bootstrap components

function AdminNotifications() {
    const [notifications, setNotifications] = useState([]); // State to store notifications
    const [error, setError] = useState(null); // State to handle errors
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(10); // Number of items per page

    useEffect(() => {
        // Fetch notifications from the API
        axios.get('/api/Admin/notifications')
            .then(response => {
                console.log(response.data);
                setNotifications(response.data.$values); // Store notifications in state
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Error fetching notifications'); // Handle error
            });
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = notifications.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(notifications.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCreateNotification = () => {
        // Logic to create a notification
        console.log("Create Notification clicked");
    };

    const handleEditNotification = (notificationID) => {
        // Logic to edit a notification
        console.log("Edit Notification clicked for ID:", notificationID);
    };

    const handleDeleteNotification = (notificationID) => {
        // Logic to delete a notification
        console.log("Delete Notification clicked for ID:", notificationID);
    };

    return (
        <div>
            <h1>Notifications</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Message</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((notification, index) => (
                            <tr key={notification.notificationID}>
                                <td>{index + 1 + indexOfFirstItem}</td>
                                <td>{notification.userName}</td>
                                <td>{notification.message}</td>
                                <td>{new Date(notification.createdAt).toLocaleString()}</td>
                                <td>{notification.isRead ? 'Read' : 'Unread'}</td>
                                <td>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No notifications found.</td>
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
        </div>
    );
}

export default AdminNotifications;
