import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button, Table, Pagination } from 'react-bootstrap'; // Import Bootstrap components

function AdminPayments() {
    const [payments, setPayments] = useState([]); // State to store payments
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(5); // Number of items per page

    useEffect(() => {
        // Fetch payments from the API
        axios.get('/api/Admin/payments')
            .then(response => {
                setPayments(response.data.$values); // Store payments in state
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Error fetching payments'); // Handle error
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(payments.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewDetails = (paymentID) => {
        // Logic to view payment details
        console.log("View details for payment ID:", paymentID);
    };

    return (
        <div>
            <h1>Payments</h1>

            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Auction Title</th>
                        <th>Payment Amount</th>
                        <th>Payment Date</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((payment, index) => (
                            <tr key={payment.paymentID}>
                                <td>{index + 1 + indexOfFirstItem}</td>
                                <td>{payment.userName}</td>
                                <td>{payment.auctionTitle || "N/A"}</td>
                                <td>${payment.paymentAmount}</td>
                                <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                                <td>
                {payment.paymentStatus === 0 && "Pending"}
                {payment.paymentStatus === 1 && "Completed"}
                {payment.paymentStatus === 2 && "Failed"}
                {payment.paymentStatus === 3 && "Refunded"}
                {payment.paymentStatus === 4 && "Cancelled"}
            </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No payments found.</td>
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

export default AdminPayments;
