import React, { useEffect, useState } from 'react';
import './user-payment.css';
import axios from '../../../utils/axios';

function UserPayment() {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch payments from the API when the component mounts
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/api/Payment/user/payments');
                const paymentsData = response.data.$values; // Accessing the $values array
                setPayments(paymentsData);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    // Sort payments to show the latest first
    const sortedPayments = payments.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
    const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedPayments.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the number of pending payments
    const pendingPaymentsCount = payments.filter(payment => payment.paymentStatus === 0).length;

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePayClick = async (paymentId) => {
        // Get the selected payment object
        const payment = payments.find(p => p.paymentID === paymentId);

        if (payment) {
            try {
                // Send request to create payment session with userID
                const response = await axios.post('/api/Payment/create', {
                    paymentAmount: payment.paymentAmount,
                    auctionID: payment.auctionID,
                    userID: payment.userID, // Adding userID from the payment object
                });

                // Check if a valid URL is received
                if (response.data.url) {
                    // Redirect to the payment session
                    window.location.href = response.data.url;
                } else {
                    console.error('Payment session URL not found');
                }
            } catch (error) {
                console.error('Error initiating payment:', error);
            }
        } else {
            console.error('Payment not found');
        }
    };

    return (
        <div className="user-payment-container mt-4">
            <h2 className="user-payment-title">User Payments</h2>

            {/* Display the number of pending payments */}
            <p className="warning">
                You have <strong> {pendingPaymentsCount} </strong> pending payment(s).
            </p>

            <table className="user-payment-table table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Payment ID</th>
                        <th>Auction ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((payment) => (
                        <tr key={payment.paymentID}>
                            <td>{payment.paymentID}</td>
                            <td>{payment.auctionID}</td>
                            <td>${payment.paymentAmount.toFixed(2)}</td>
                            <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                            <td>
                                <span className={`user-payment-status ${
                                    payment.paymentStatus === 0 ? 'pending' :
                                    payment.paymentStatus === 1 ? 'completed' :
                                    payment.paymentStatus === 2 ? 'failed' :
                                    payment.paymentStatus === 3 ? 'refunded' :
                                    'cancelled'}`}>
                                    {payment.paymentStatus === 0 ? 'Pending' :
                                     payment.paymentStatus === 1 ? 'Completed' :
                                     payment.paymentStatus === 2 ? 'Failed' :
                                     payment.paymentStatus === 3 ? 'Refunded' :
                                     'Cancelled'}
                                </span>
                            </td>
                            <td>
                                {payment.paymentStatus === 0 ? ( // If Pending
                                    <button 
                                        className="user-payment-btn btn btn-primary" 
                                        onClick={() => handlePayClick(payment.paymentID)}
                                    >
                                        Pay
                                    </button>
                                ) : (
                                    <span></span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, payments.length)} of {payments.length} entries
                </div>
                <div className='prev-next-container'>
                    <button className='previous-button' variant="secondary" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span className="current-page mx-3">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button className='next-button' variant="secondary" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserPayment;
